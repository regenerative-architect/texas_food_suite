import {getKV,setKV} from './db.js';

const APP_ID = 'org.planetaryrestorationarchive.texas.food-sovereignty.v4';
const TRYSTERO_VERSION = '0.25.3';
const COLLECTIONS = ['projects','tasks','comments','proposals','resources','decisions'];
const STRATEGIES = {
  nostr:{label:'Nostr',url:`https://esm.run/@trystero-p2p/nostr@${TRYSTERO_VERSION}`},
  mqtt:{label:'MQTT',url:`https://esm.run/@trystero-p2p/mqtt@${TRYSTERO_VERSION}`},
  torrent:{label:'BitTorrent',url:`https://esm.run/@trystero-p2p/torrent@${TRYSTERO_VERSION}`},
  ipfs:{label:'IPFS',url:`https://esm.run/@trystero-p2p/ipfs@${TRYSTERO_VERSION}`}
};
const MAX_CHAT = 200;

const now = () => Date.now();
const uid = () => crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

function mergeCollection(local=[], incoming=[]){
  const map = new Map(local.map(x=>[x.id,x]));
  for(const item of incoming || []){
    const prev=map.get(item.id);
    if(!prev || Number(item.updatedAt||0) > Number(prev.updatedAt||0)) map.set(item.id,item);
  }
  return [...map.values()];
}

export class CollaborationManager extends EventTarget{
  constructor(){
    super();
    this.room=null; this.roomId=''; this.tabId=`tab-${uid().slice(0,8)}`; this.selfId=this.tabId; this.peers=new Map(); this.actions={}; this.seedProjects=[];
    this.profile={name:'Steward',org:'Independent',role:'Community',region:'Statewide'};
    this.workspace={projects:[],tasks:[],comments:[],proposals:[],resources:[],chat:[],decisions:[]};
    this.localChannel=null; this.remoteMode='offline'; this.mediaStream=null;
  }

  async init(profile){
    this.profile={...this.profile,...profile};
    this.dispatch('status',{mode:'offline',message:'Local workspace ready'});
  }

  async loadWorkspace(roomId, seedProjects=[]){
    this.roomId=roomId || 'texas-commons';
    if(seedProjects.length) this.seedProjects=seedProjects;
    const seeds=(seedProjects.length?seedProjects:this.seedProjects);
    const base={projects:[],tasks:[],comments:[],proposals:[],resources:[],chat:[],decisions:[]};
    const saved=await getKV(`workspace:${this.roomId}`,null);
    if(saved){ this.workspace={...base,...saved}; }
    else {
      this.workspace={...base,projects:seeds.map(p=>({...p,updatedAt:p.updatedAt||now(),updatedBy:'seed'}))};
      await this.persist();
    }
    this.dispatch('workspace',this.workspace);
    return this.workspace;
  }

  async persist(){ if(this.roomId) await setKV(`workspace:${this.roomId}`,this.workspace); }

  setProfile(profile){
    this.profile={...this.profile,...profile};
    if(this.actions.presence) this.actions.presence.send(this.publicProfile()).catch(()=>{});
    this.dispatch('presence',this.peerList());
  }

  publicProfile(){const {participantId,...safe}=this.profile||{};return safe;}

  peerList(){ return [{peerId:this.selfId,self:true,...this.publicProfile()},...this.peers.values()]; }

  dispatch(type,detail){ this.dispatchEvent(new CustomEvent(type,{detail})); }

  async connect({roomId,password='',strategy='nostr',profile,turnConfig=[]}){
    await this.disconnect();
    this.setProfile(profile||{});
    await this.loadWorkspace(roomId);
    this.setupLocalChannel(roomId);

    if(!navigator.onLine){
      this.remoteMode='local';
      this.dispatch('status',{mode:'local',message:'Offline: same-device BroadcastChannel collaboration only'});
      return {mode:'local'};
    }

    try{
      const selected=STRATEGIES[strategy] || STRATEGIES.nostr;
      const trystero = await import(selected.url);
      this.selfId = trystero.selfId || this.selfId;
      const config={appId:APP_ID};
      if(password) config.password=password;
      if(Array.isArray(turnConfig) && turnConfig.length) config.turnConfig=turnConfig;
      this.room = trystero.joinRoom(config,roomId,{
        onJoinError: details => {
          const message=details?.error?.message || String(details?.error || 'Peer connection failed');
          this.dispatch('status',{mode:'trystero',message:`Peer connection issue: ${message}`});
        }
      });
      this.remoteMode='trystero';
      this.bindRoomActions();
      this.dispatch('status',{mode:'trystero',message:`Connected via ${selected.label} discovery using Trystero ${TRYSTERO_VERSION}; application traffic uses direct WebRTC when peers can establish it`});
      this.dispatch('presence',this.peerList());
      return {mode:'trystero',selfId:this.selfId};
    }catch(error){
      console.warn('Trystero unavailable',error);
      this.remoteMode='local';
      this.dispatch('status',{mode:'local',message:'Remote P2P unavailable; local BroadcastChannel fallback is active',error:String(error)});
      return {mode:'local',error};
    }
  }

  setupLocalChannel(roomId){
    try{
      this.localChannel=new BroadcastChannel(`txfs:${roomId}`);
      this.localChannel.onmessage=e=>this.handleEnvelope(e.data,e.data?.peerId||'local-tab');
      this.localChannel.postMessage({kind:'hello',profile:this.publicProfile(),peerId:this.tabId});
    }catch(e){ console.warn('BroadcastChannel unavailable',e); }
  }

  bindRoomActions(){
    const room=this.room;
    const presence=room.makeAction('presence');
    const patch=room.makeAction('patch');
    const snapshot=room.makeAction('snapshot');
    const chat=room.makeAction('chat');
    const file=room.makeAction('file');
    this.actions={presence,patch,snapshot,chat,file};

    room.onPeerJoin = peerId => {
      this.peers.set(peerId,{peerId,name:'Peer',org:'',role:'',region:''});
      presence.send(this.publicProfile(),{target:peerId}).catch(()=>{});
      snapshot.send(this.workspace,{target:peerId}).catch(()=>{});
      if(this.mediaStream) room.addStream(this.mediaStream,{target:peerId});
      this.dispatch('presence',this.peerList());
    };
    room.onPeerLeave = peerId => { this.peers.delete(peerId); this.dispatch('presence',this.peerList()); };
    room.onPeerStream = (stream,peerId) => this.dispatch('stream',{stream,peerId});
    presence.onMessage = (data,{peerId}) => { this.peers.set(peerId,{peerId,...data}); this.dispatch('presence',this.peerList()); };
    patch.onMessage = (data,{peerId}) => this.applyPatch(data,peerId,false);
    snapshot.onMessage = (data,{peerId}) => this.mergeSnapshot(data,peerId);
    chat.onMessage = (data,{peerId}) => this.receiveChat(data,peerId,false);
    file.onMessage = (data,{peerId,metadata}) => this.dispatch('file',{data,peerId,metadata});
  }

  handleEnvelope(env,peerId){
    if(!env || typeof env!=='object' || env.peerId===this.tabId) return;
    if(env.to && env.to!==this.tabId) return;
    if(env.kind==='hello'){
      this.peers.set(peerId,{peerId,...(env.profile||{})});
      this.localChannel?.postMessage({kind:'hello-ack',to:peerId,peerId:this.tabId,profile:this.publicProfile(),data:this.workspace});
      this.dispatch('presence',this.peerList());
      return;
    }
    if(env.kind==='hello-ack'){
      this.peers.set(peerId,{peerId,...(env.profile||{})});
      this.mergeSnapshot(env.data,peerId);
      this.dispatch('presence',this.peerList());
      return;
    }
    if(env.kind==='patch') this.applyPatch(env.data,peerId,false);
    if(env.kind==='chat') this.receiveChat(env.data,peerId,false);
    if(env.kind==='snapshot') this.mergeSnapshot(env.data,peerId);
  }

  async mergeSnapshot(incoming,peerId){
    if(!incoming || typeof incoming!=='object') return;
    for(const key of COLLECTIONS){
      this.workspace[key]=mergeCollection(this.workspace[key],incoming[key]);
    }
    const chats=mergeCollection(this.workspace.chat,incoming.chat).sort((a,b)=>a.updatedAt-b.updatedAt);
    this.workspace.chat=chats.slice(-MAX_CHAT);
    await this.persist();
    this.dispatch('workspace',this.workspace);
    this.dispatch('sync',{peerId,type:'snapshot'});
  }

  async applyPatch(patch,peerId,broadcast=false){
    if(!patch || !COLLECTIONS.includes(patch.collection) || !patch.record?.id) return;
    const list=this.workspace[patch.collection] || [];
    const previous=list.find(x=>x.id===patch.record.id);
    if(previous && previous.updatedBy && patch.record.updatedBy && previous.updatedBy!==patch.record.updatedBy && Math.abs(Number(previous.updatedAt||0)-Number(patch.record.updatedAt||0))<15000){
      this.dispatch('conflict',{collection:patch.collection,id:patch.record.id,local:previous,incoming:patch.record,peerId,resolution:'last-write-wins timestamp'});
    }
    this.workspace[patch.collection]=mergeCollection(list,[patch.record]);
    await this.persist();
    this.dispatch('workspace',this.workspace);
    if(broadcast) await this.broadcastPatch(patch);
    this.dispatch('sync',{peerId,type:'patch',collection:patch.collection});
  }

  async upsert(collection,record){
    const normalized={...record,id:record.id||uid(),updatedAt:now(),updatedBy:this.selfId};
    await this.applyPatch({collection,record:normalized},this.selfId,true);
    return normalized;
  }

  async broadcastPatch(patch){
    if(this.actions.patch) this.actions.patch.send(patch).catch(()=>{});
    if(this.localChannel) this.localChannel.postMessage({kind:'patch',data:patch,peerId:this.tabId});
  }

  async sendChat(text){
    const message={id:uid(),text:String(text).slice(0,4000),name:this.profile.name,role:this.profile.role,updatedAt:now(),updatedBy:this.selfId};
    await this.receiveChat(message,this.selfId,true);
    return message;
  }

  async receiveChat(message,peerId,broadcast){
    this.workspace.chat=mergeCollection(this.workspace.chat,[message]).sort((a,b)=>a.updatedAt-b.updatedAt).slice(-MAX_CHAT);
    await this.persist();
    this.dispatch('chat',{message,peerId});
    this.dispatch('workspace',this.workspace);
    if(broadcast){
      if(this.actions.chat) this.actions.chat.send(message).catch(()=>{});
      if(this.localChannel) this.localChannel.postMessage({kind:'chat',data:message,peerId:this.tabId});
    }
  }

  async sendFile(file){
    if(!file) throw new Error('No file selected');
    if(file.size > 20*1024*1024) throw new Error('This UI limits peer files to 20 MB to avoid accidental large transfers.');
    const buf=await file.arrayBuffer();
    if(!this.actions.file) throw new Error('Remote Trystero room required for peer file transfer');
    await this.actions.file.send(buf,{metadata:{name:file.name,type:file.type||'application/octet-stream',size:file.size}});
  }

  async startMedia({audio=true,video=false}={}){
    if(!this.room) throw new Error('Join a remote Trystero room first');
    this.mediaStream=await navigator.mediaDevices.getUserMedia({audio,video});
    this.room.addStream(this.mediaStream);
    return this.mediaStream;
  }

  stopMedia(){
    this.mediaStream?.getTracks().forEach(t=>t.stop());
    this.mediaStream=null;
  }

  async disconnect(){
    this.stopMedia();
    try{this.room?.leave();}catch{}
    try{this.localChannel?.close();}catch{}
    this.room=null; this.localChannel=null; this.actions={}; this.peers.clear(); this.selfId=this.tabId; this.remoteMode='offline';
    this.dispatch('presence',this.peerList());
  }
}
