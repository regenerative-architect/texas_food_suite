import http from 'node:http';
import {WebSocketServer, WebSocket} from 'ws';

const port = Number(process.env.PORT || 8787);
const server = http.createServer((req,res)=>{
  if(req.url === '/health'){
    res.writeHead(200,{'content-type':'application/json','cache-control':'no-store'});
    res.end(JSON.stringify({ok:true,adapter:'legacy-websocket',authoritative:false}));
    return;
  }
  res.writeHead(404,{'content-type':'text/plain'});res.end('Legacy WebSocket adapter only.');
});
const wss = new WebSocketServer({server,maxPayload:2*1024*1024});
const rooms = new Map();

function leave(ws){
  if(!ws.room)return;
  const peers=rooms.get(ws.room);peers?.delete(ws);
  if(peers && peers.size===0)rooms.delete(ws.room);
}
function send(ws,obj){if(ws.readyState===WebSocket.OPEN)ws.send(JSON.stringify(obj))}
function broadcast(room,obj,except){for(const peer of rooms.get(room)||[])if(peer!==except)send(peer,obj)}

wss.on('connection',ws=>{
  ws.id=crypto.randomUUID();
  ws.on('message',raw=>{
    let msg;try{msg=JSON.parse(String(raw))}catch{return send(ws,{type:'error',message:'invalid JSON'})}
    if(msg.type==='join'){
      leave(ws);const room=String(msg.room||'').replace(/[^a-zA-Z0-9_.-]/g,'-').slice(0,80);
      if(!room)return send(ws,{type:'error',message:'room required'});
      ws.room=room;const peers=rooms.get(room)||new Set();peers.add(ws);rooms.set(room,peers);
      send(ws,{type:'joined',peerId:ws.id,room});broadcast(room,{type:'presence',event:'join',peerId:ws.id},ws);return;
    }
    if(!ws.room)return send(ws,{type:'error',message:'join a room first'});
    // Opaque relay only. This adapter provides no authentication, persistence, conflict resolution or authoritative audit log.
    broadcast(ws.room,{type:'relay',peerId:ws.id,payload:msg.payload??msg},ws);
  });
  ws.on('close',()=>{if(ws.room)broadcast(ws.room,{type:'presence',event:'leave',peerId:ws.id},ws);leave(ws)});
});
server.listen(port,()=>console.log(`Legacy WebSocket adapter listening on :${port}`));
