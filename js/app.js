import {baseline,priceSystem,ecoregions,waterStack,rdStack,institutions,programs,playbooks,seedProjects,sources,SNAPSHOT_DATE,schemaVersion} from '../data/texas-data.js';
import {connectivityEvidence,connectivityRequirements,advancedGuides,CONNECTIVITY_SNAPSHOT_DATE} from '../data/connectivity-data.js';
import {getKV,setKV,exportAll,importAll} from './db.js';
import {CollaborationManager} from './collaboration.js';
import {aiCapabilities,askAI,unloadAI,deterministicPlan} from './ai.js';

const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const fmtDate=t=>new Intl.DateTimeFormat(undefined,{dateStyle:'medium',timeStyle:'short'}).format(new Date(t));
const uid=()=>crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`;
const download=(name,text,type='application/json')=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000)};

const ROUTES=[
  {id:'overview',icon:'◈',label:'Mission dashboard',group:'Plan',desc:'System baseline, priorities and fast-start pathway.'},
  {id:'texas',icon:'⌖',label:'Texas ecology',group:'Plan',desc:'Ecoregion-specific food strategies and constraints.'},
  {id:'prices',icon:'▤',label:'Price mechanics',group:'Plan',desc:'Delivered-food cost stack and intervention levers.'},
  {id:'water',icon:'≈',label:'Water architecture',group:'Plan',desc:'Water-productivity hierarchy and drought resilience.'},
  {id:'rd',icon:'⚙',label:'R&D portfolio',group:'Plan',desc:'Technology readiness, benefits and failure modes.'},
  {id:'network',icon:'⇄',label:'Food network',group:'Build',desc:'Regional production, processing, logistics and demand architecture.'},
  {id:'projects',icon:'▦',label:'Shared projects',group:'Build',desc:'A synchronized cross-domain project portfolio.'},
  {id:'collaborate',icon:'◉',label:'Multiplayer room',group:'Collaborate',desc:'Trystero peer rooms, chat, proposals, resources, files and calls.'},
  {id:'governance',icon:'⚖',label:'Institution matrix',group:'Collaborate',desc:'Neutral role map for government, institutions, business and families.'},
  {id:'infrastructure',icon:'⌁',label:'Connectivity & atlas',group:'Collaborate',desc:'Texas broadband evidence, cross-domain infrastructure and the preserved 111-section requirements atlas.'},
  {id:'ai',icon:'✦',label:'Local AI lab',group:'Tools',desc:'Optional WebLLM planning assistant running in-browser with WebGPU.'},
  {id:'guides',icon:'?',label:'Advanced guides',group:'Tools',desc:'Simplified field guides for projects, procurement, water and resilience.'},
  {id:'sources',icon:'§',label:'Evidence & integrity',group:'Tools',desc:'Source ledger, limitations, data sovereignty and licenses.'},
  {id:'settings',icon:'⚙',label:'Settings & backups',group:'Tools',desc:'Portable data, display settings and system diagnostics.'}
];

const collab=new CollaborationManager();
let workspace={projects:[],tasks:[],comments:[],proposals:[],resources:[],chat:[],decisions:[]};
let profile={};
let prefs={theme:'dark',density:'comfortable',reducedFx:false,focus:false,lastRoom:'texas-commons',strategy:'nostr'};
let participantId='';
let installPrompt=null;
let remoteVideos=new Map();

function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),3200)}
function setStatus(text,mode=''){const el=$('#collabState'); if(!el)return; el.textContent=text; const dot=$('#collabDot');dot.className=`status-dot ${mode}`;}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}

function buildNav(){
  const groups={}; for(const r of ROUTES)(groups[r.group]??=[]).push(r);
  const nav=$('#navTree');nav.innerHTML='';
  for(const [group,items] of Object.entries(groups)){
    const h=document.createElement('div');h.className='side-title';h.textContent=group;nav.append(h);
    for(const r of items){const a=document.createElement('a');a.href=`#/${r.id}`;a.dataset.route=r.id;a.innerHTML=`<span>${r.icon}</span><span>${esc(r.label)}</span>`;nav.append(a)}
  }
}

function setRoute(id){
  const route=ROUTES.find(r=>r.id===id)||ROUTES[0];
  $$('.route').forEach(el=>el.classList.toggle('active',el.id===`route-${route.id}`));
  $$('#navTree a').forEach(a=>a.classList.toggle('active',a.dataset.route===route.id));
  $('#crumbCurrent').textContent=route.label; document.title=`${route.label} — Texas Food Sovereignty Commons`;
  if(location.hash!==`#/${route.id}`) history.replaceState(null,'',`#/${route.id}`);
  $('#sidebar').classList.remove('open');$('#menuBtn').setAttribute('aria-expanded','false');
  window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  if(route.id==='network') requestAnimationFrame(drawNetwork);
}
function routeFromHash(){return (location.hash.match(/^#\/([\w-]+)/)||[])[1]||'overview'}

function sourceLink(url,label='source'){return `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`}

function renderOverview(){
  $('#baselineGrid').innerHTML=baseline.map(x=>`<article class="card searchable" data-search="${esc(x.label+' '+x.detail)}"><div class="meta">${esc(x.label)}</div><div class="metric">${esc(x.value)}</div><p>${esc(x.detail)}</p><div class="meta">${esc(x.sub)} · ${sourceLink(x.source)}</div></article>`).join('');
  $('#fastTrack').innerHTML=[
    ['0–30 days','Measure the regional basket, map capacity, create buyer/supplier demand signals and identify the dominant delivered-cost bottleneck.'],
    ['30–180 days','Pool loads, expand Farm Fresh/local procurement pilots, use existing kitchens/cold rooms more fully, and run measured water/energy trials.'],
    ['6–24 months','Build only demand-backed missing infrastructure: pack, cold, cross-dock, processing, backup energy, digital interoperability.'],
    ['2–10 years','Shift regional production toward water-resilient, high-value and ecologically appropriate systems while preserving open trade and redundant supply.']
  ].map(([t,d],i)=>`<div class="guide-step searchable" data-search="${esc(t+' '+d)}"><div class="step-num">${i+1}</div><div><strong>${esc(t)}</strong><p>${esc(d)}</p></div></div>`).join('');
}

function renderTexas(filter=''){const q=filter.toLowerCase().trim();$('#ecoregionGrid').innerHTML=ecoregions.filter(r=>!q||JSON.stringify(r).toLowerCase().includes(q)).map(r=>`<article class="card searchable" data-search="${esc(JSON.stringify(r))}"><div class="project-top"><h3>${esc(r.name)}</h3><span class="pill info">${esc(r.rainfall)}</span></div><p><strong>Water:</strong> ${esc(r.water)}</p><div class="g2"><div><div class="meta">Assets</div><ul class="clean">${r.assets.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div><div class="meta">Priority strategy</div><ul class="clean">${r.strategy.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></div><div class="callout warn" style="margin-top:10px"><strong>Constraint:</strong> ${esc(r.caution)}</div><div class="meta" style="margin-top:8px">${sourceLink(r.source,'regional source')}</div></article>`).join('')||'<div class="card">No region matched the filter.</div>'}

function renderPrices(){
  $('#priceTableBody').innerHTML=priceSystem.map(x=>`<tr><td><strong>${esc(x.stage)}</strong></td><td>${esc(x.pressure)}</td><td>${esc(x.near)}</td><td>${esc(x.structural)}</td><td>${esc(x.metric)}</td></tr>`).join('');
  calcPrice();
}
function calcPrice(){
  const ids=['farmgate','aggregation','processing','cold','transport','retail','loss'];
  const vals=Object.fromEntries(ids.map(id=>[id,Math.max(0,Number($(`#cost-${id}`)?.value||0))]));
  const direct=vals.farmgate+vals.aggregation+vals.processing+vals.cold+vals.transport+vals.retail;
  const loss=direct*(vals.loss/100); const delivered=direct+loss;
  $('#costOutput').innerHTML=`<div class="metric">$${delivered.toFixed(2)} <small>/ unit</small></div><p>Direct stack: $${direct.toFixed(2)} · modeled shrink/loss burden: $${loss.toFixed(2)}.</p><div class="meta">This is a transparent planning calculator, not a market-price forecast. Enter your own verified local costs.</div>`;
}

function renderWater(){ $('#waterTableBody').innerHTML=waterStack.map(x=>`<tr><td><strong>${esc(x.layer)}</strong></td><td>${esc(x.now)}</td><td>${esc(x.why)}</td><td><span class="pill ${x.maturity.includes('proven')?'ok':'warn'}">${esc(x.maturity)}</span></td></tr>`).join('') }
function renderRD(){ $('#rdTableBody').innerHTML=rdStack.map(x=>`<tr><td><strong>${esc(x.tech)}</strong></td><td><span class="pill ${x.readiness.toLowerCase().includes('deploy')?'ok':x.readiness.toLowerCase().includes('pilot')?'warn':'info'}">${esc(x.readiness)}</span></td><td>${esc(x.role)}</td><td>${esc(x.benefit)}</td><td>${esc(x.limit)}</td><td>${esc(x.evidence)}</td></tr>`).join('') }

function renderNetwork(){
  const flow=[['Produce','ecoregion-matched farms, ranches, fisheries and protected systems'],['Aggregate','shared pack standards + food hubs + digital availability'],['Process','slaughter, milling, freezing, canning, kitchens and co-pack'],['Store','cold, freezer and dry storage with backup energy'],['Move','pooled loads, cross-docks, backhauls and route planning'],['Buy','schools, hospitals, grocers, restaurants, food banks and households'],['Cycle','surplus rescue, compost/nutrient loops, by-product markets and learning data']];
  $('#flowGrid').innerHTML=flow.map((x,i)=>`<div class="card searchable" data-search="${esc(x.join(' '))}"><div class="step-num">${i+1}</div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></div>`).join('');drawNetwork();
}

function projectHTML(p){return `<article class="card project-card searchable" data-search="${esc(JSON.stringify(p))}"><div class="project-top"><div><h3>${esc(p.title)}</h3><div class="meta">${esc(p.region||'Statewide')} · ${esc(p.domain||'cross-domain')} · Lead: ${esc(p.lead||'unassigned')}</div></div><span class="pill ${p.status==='active'?'ok':p.status==='blocked'?'danger':'warn'}">${esc(p.status||'concept')}</span></div><p>${esc(p.impact||'')}</p>${p.needs?`<div class="callout"><strong>Needs:</strong> ${esc(p.needs)}</div>`:''}<footer><button class="btn small" data-edit-project="${esc(p.id)}">Edit</button><span class="meta">updated ${p.updatedAt?fmtDate(p.updatedAt):'seed'}</span></footer></article>`}
function renderProjects(){
  $('#projectGrid').innerHTML=(workspace.projects||[]).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0)).map(projectHTML).join('')||'<div class="card">No projects yet.</div>';
  $$('#projectGrid [data-edit-project]').forEach(b=>b.onclick=()=>openProjectModal(workspace.projects.find(p=>p.id===b.dataset.editProject)));
  drawNetwork();
}

function renderGovernance(){
  $('#institutionTableBody').innerHTML=institutions.map(x=>`<tr><td><strong>${esc(x.sector)}</strong></td><td>${esc(x.entities)}</td><td>${esc(x.capabilities)}</td><td>${esc(x.collaboration)}</td><td>${sourceLink(x.source)}</td></tr>`).join('');
  $('#programGrid').innerHTML=programs.map(x=>`<article class="card searchable" data-search="${esc(JSON.stringify(x))}"><h3>${esc(x.name)}</h3><span class="pill info">${esc(x.status)}</span><p>${esc(x.use)}</p><div class="meta">${sourceLink(x.source,'official page')}</div></article>`).join('');
  $('#playbookList').innerHTML=playbooks.map((p,i)=>`<details class="searchable" data-search="${esc(JSON.stringify(p))}" ${i===0?'open':''}><summary>${esc(p.role)} <span class="pill">${esc(p.horizon)}</span></summary><div class="details-body"><ol>${p.actions.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><div class="callout"><strong>Measure:</strong> ${esc(p.metric)}</div></div></details>`).join('');
}

function renderInfrastructure(){
  $('#connectivitySnapshot').textContent=CONNECTIVITY_SNAPSHOT_DATE;
  $('#connectivityEvidenceGrid').innerHTML=connectivityEvidence.map(x=>`<article class="card searchable" data-search="${esc(JSON.stringify(x))}"><div class="project-top"><h3>${esc(x.layer)}</h3><span class="pill info">${esc(x.grade)}</span></div><div class="meta">${esc(x.status)}</div><p>${esc(x.fact)}</p><div class="callout"><strong>Food-system link:</strong> ${esc(x.foodLink)}</div><div class="meta" style="margin-top:8px">${sourceLink(x.source,'official / primary source')}</div></article>`).join('');
  renderAtlas();
}
function renderAtlas(){
  const q=($('#atlasFilter')?.value||'').trim().toLowerCase();
  const group=$('#atlasGroup')?.value||'';
  const rows=connectivityRequirements.filter(x=>(!group||x.group===group)&&(!q||`${x.number} ${x.title} ${x.group} ${x.relevance}`.toLowerCase().includes(q)));
  $('#atlasCount').textContent=`${rows.length} / ${connectivityRequirements.length} requirements`;
  $('#requirementsAtlas').innerHTML=rows.map(x=>`<article class="atlas-item searchable" data-search="${esc(JSON.stringify(x))}"><div class="atlas-number">${x.number}</div><div><strong>${esc(x.title)}</strong><div class="meta">${esc(x.group)}</div><p>${esc(x.relevance)}</p></div></article>`).join('')||'<div class="meta">No requirement matched this filter.</div>';
}

function renderGuides(){
  $('#guideList').innerHTML=advancedGuides.map((g,idx)=>`<article class="guide-card searchable" data-search="${esc(JSON.stringify(g))}"><div class="guide-title"><div><div class="eyebrow">${esc(g.domain||'cross-domain')}</div><h2>${esc(g.title)}</h2></div><span class="pill">4 depths</span></div><div class="guide-level one-minute"><div class="guide-level-head"><span>1</span><strong>One-minute explanation</strong></div><p>${esc(g.minute)}</p></div><details ${idx===0?'open':''}><summary><span class="depth-badge">2</span> Actionable steps</summary><div class="details-body">${g.steps.map((step,i)=>`<div class="guide-step"><div class="step-num">${i+1}</div><div>${esc(step)}</div></div>`).join('')}</div></details><details><summary><span class="depth-badge">3</span> Advanced explanation</summary><div class="details-body"><p>${esc(g.advanced)}</p></div></details><details><summary><span class="depth-badge">4</span> Expert / implementation detail</summary><div class="details-body"><p>${esc(g.expert)}</p><div class="callout"><strong>Expected outcome:</strong> ${esc(g.outcome)}</div></div></details></article>`).join('')
}
function renderSources(){ $('#sourceList').innerHTML=sources.map(s=>`<article class="source-item searchable" data-search="${esc(JSON.stringify(s))}"><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a><div>${esc(s.org)}</div><div class="meta">Used for: ${esc(s.use)}</div></article>`).join('') }

function renderPresence(peers=collab.peerList()){
  $('#peerList').innerHTML=peers.map(p=>`<div class="peer ${p.self?'self':''}" tabindex="0" data-tip="Ephemeral peer ID: ${esc(p.peerId)}. This identifier and the displayed profile are not verified identity credentials."><strong>${esc(p.name||'Peer')}</strong><br><span class="meta">${esc(p.role||'')} ${p.org?'· '+esc(p.org):''}</span><br><code>${esc(p.peerId.slice(0,12))}…</code></div>`).join('');
  $('#peerCount').textContent=String(Math.max(1,peers.length));
}

function renderChat(){
  const log=$('#chatLog'); if(!log)return;
  log.innerHTML=(workspace.chat||[]).map(m=>`<div class="chat-line"><div><strong>${esc(m.name||'Peer')}</strong> <span class="pill">${esc(m.role||'')}</span> <time>${fmtDate(m.updatedAt)}</time></div><p>${esc(m.text)}</p></div>`).join('')||'<div class="meta">No messages in this local room history.</div>';
  log.scrollTop=log.scrollHeight;
}

function tally(proposal){const v=Object.values(proposal.votes||{});return {yes:v.filter(x=>x==='yes').length,no:v.filter(x=>x==='no').length,abstain:v.filter(x=>x==='abstain').length}}
function renderProposals(){
  $('#proposalList').innerHTML=(workspace.proposals||[]).sort((a,b)=>b.updatedAt-a.updatedAt).map(p=>{const t=tally(p);const mine=p.votes?.[participantId];return `<article class="card proposal searchable" data-search="${esc(JSON.stringify(p))}"><div class="project-top"><h3>${esc(p.title)}</h3><span class="pill ${p.state==='accepted'?'ok':p.state==='rejected'?'danger':'warn'}">${esc(p.state||'open')}</span></div><p>${esc(p.text||'')}</p><div class="meta">Proposed by ${esc(p.author||'participant')} · decision rule: ${esc(p.rule||'advisory vote')}</div><div class="vote-strip"><button class="btn small ${mine==='yes'?'primary':''}" data-vote="yes" data-id="${esc(p.id)}">✓ yes ${t.yes}</button><button class="btn small ${mine==='no'?'danger':''}" data-vote="no" data-id="${esc(p.id)}">× no ${t.no}</button><button class="btn small" data-vote="abstain" data-id="${esc(p.id)}">– abstain ${t.abstain}</button></div></article>`}).join('')||'<div class="meta">No room proposals yet.</div>';
  $$('#proposalList [data-vote]').forEach(b=>b.onclick=()=>voteProposal(b.dataset.id,b.dataset.vote));
}
async function voteProposal(id,vote){const p=workspace.proposals.find(x=>x.id===id);if(!p)return;const votes={...(p.votes||{}),[participantId]:vote};await collab.upsert('proposals',{...p,votes});toast(`Vote recorded: ${vote}`)}

function renderResources(){ $('#resourceList').innerHTML=(workspace.resources||[]).sort((a,b)=>b.updatedAt-a.updatedAt).map(r=>`<div class="resource-row searchable" data-search="${esc(JSON.stringify(r))}"><div class="project-top"><strong>${esc(r.kind==='offer'?'Offer':'Need')}: ${esc(r.item)}</strong><span class="pill ${r.kind==='offer'?'ok':'warn'}">${esc(r.category||'resource')}</span></div><div>${esc(r.quantity||'')} ${r.location?'· '+esc(r.location):''}</div><div class="meta">${esc(r.owner||'participant')} · ${fmtDate(r.updatedAt)}</div></div>`).join('')||'<div class="meta">No shared needs/offers yet.</div>' }
function projectName(id){return workspace.projects.find(p=>p.id===id)?.title||'General / unassigned'}
function refreshProjectSelects(){for(const id of ['taskProject','commentProject','decisionProject']){const el=$(`#${id}`);if(!el)continue;const current=el.value;el.innerHTML=`<option value="">General / unassigned</option>`+(workspace.projects||[]).map(p=>`<option value="${esc(p.id)}">${esc(p.title)}</option>`).join('');if([...el.options].some(o=>o.value===current))el.value=current}}
function renderTasks(){const el=$('#taskList');if(!el)return;el.innerHTML=(workspace.tasks||[]).sort((a,b)=>b.updatedAt-a.updatedAt).map(t=>`<div class="resource-row searchable" data-search="${esc(JSON.stringify(t))}"><div class="project-top"><strong>${esc(t.title)}</strong><span class="pill ${t.status==='complete'?'ok':t.status==='blocked'?'danger':'warn'}">${esc(t.status||'open')}</span></div><div class="meta">${esc(projectName(t.projectId))} · owner: ${esc(t.owner||'unassigned')} · ${fmtDate(t.updatedAt)}</div></div>`).join('')||'<div class="meta">No shared tasks yet.</div>'}
function renderComments(){const el=$('#commentList');if(!el)return;el.innerHTML=(workspace.comments||[]).sort((a,b)=>b.updatedAt-a.updatedAt).slice(0,30).map(c=>`<div class="resource-row searchable" data-search="${esc(JSON.stringify(c))}"><strong>${esc(projectName(c.projectId))}</strong><p>${esc(c.text)}</p><div class="meta">${esc(c.author||'participant')} · ${fmtDate(c.updatedAt)}</div></div>`).join('')||'<div class="meta">No project comments yet.</div>'}
function renderDecisions(){const el=$('#decisionList');if(!el)return;el.innerHTML=(workspace.decisions||[]).sort((a,b)=>b.updatedAt-a.updatedAt).slice(0,30).map(d=>`<div class="resource-row searchable" data-search="${esc(JSON.stringify(d))}"><strong>${esc(projectName(d.projectId))}</strong><p>${esc(d.text)}</p>${d.basis?`<div class="callout"><strong>Basis:</strong> ${esc(d.basis)}</div>`:''}<div class="meta">logged by ${esc(d.author||'participant')} · advisory workspace record only · ${fmtDate(d.updatedAt)}</div></div>`).join('')||'<div class="meta">No decisions logged yet.</div>'}
function renderWorkspace(){workspace={projects:[],tasks:[],comments:[],proposals:[],resources:[],chat:[],decisions:[],...workspace};renderProjects();renderChat();renderProposals();renderResources();refreshProjectSelects();renderTasks();renderComments();renderDecisions();$('#workspaceUpdated').textContent=`${workspace.projects.length} projects · ${workspace.tasks.length} tasks · ${workspace.comments.length} comments · ${workspace.proposals.length} proposals · ${workspace.decisions.length} decisions`}

function openProjectModal(p=null){
  $('#projectModalTitle').textContent=p?'Edit shared project':'Add shared project';
  $('#projectId').value=p?.id||'';$('#projectTitle').value=p?.title||'';$('#projectDomain').value=p?.domain||'cross-domain';$('#projectRegion').value=p?.region||'Statewide';$('#projectLead').value=p?.lead||profile.org||'';$('#projectStatus').value=p?.status||'concept';$('#projectImpact').value=p?.impact||'';$('#projectNeeds').value=p?.needs||'';openModal('projectModal');
}
function openModal(id){$(`#${id}`).classList.add('open');$(`#${id} [autofocus]`)?.focus()}
function closeModal(id){$(`#${id}`).classList.remove('open')}

function buildAIContext(){
  const compact={snapshotDate:SNAPSHOT_DATE,baseline,ecoregions:ecoregions.map(({name,rainfall,water,strategy,caution})=>({name,rainfall,water,strategy,caution})),priceSystem,waterStack,rdStack,institutions,connectivityEvidence:connectivityEvidence.map(({layer,status,grade,fact,foodLink})=>({layer,status,grade,fact,foodLink})),workspace:{projects:workspace.projects,tasks:workspace.tasks,comments:workspace.comments,proposals:workspace.proposals,resources:workspace.resources,decisions:workspace.decisions}};
  return JSON.stringify(compact);
}

async function runAI(){
  const prompt=$('#aiPrompt').value.trim(); if(!prompt)return toast('Enter a planning question first.');
  const btn=$('#aiRun');btn.disabled=true;$('#aiOutput').textContent='Preparing local model…';$('#aiProgress').value=0;
  try{
    const chunks=await askAI(prompt,buildAIContext(),{model:$('#aiModel').value,onProgress:p=>{const n=Math.max(0,Math.min(1,Number(p.progress??0)));$('#aiProgress').value=n;$('#aiStateText').textContent=p.text||`Loading ${(n*100).toFixed(0)}%`;}});
    let text='';$('#aiOutput').textContent='';
    for await(const chunk of chunks){text+=chunk.choices?.[0]?.delta?.content||'';$('#aiOutput').textContent=text;}
    $('#aiStateText').textContent='Model ready locally';$('#aiProgress').value=1;
  }catch(e){$('#aiOutput').textContent=deterministicPlan(prompt,buildAIContext(),e.message);$('#aiStateText').textContent='Deterministic local fallback';$('#aiProgress').value=0;}
  finally{btn.disabled=false}
}

function renderSettings(){
  $('#themeSelect').value=prefs.theme;$('#densitySelect').value=prefs.density;$('#fxToggle').checked=!prefs.reducedFx;
  const c=aiCapabilities();$('#diagGrid').innerHTML=[['Secure context',window.isSecureContext?'yes':'no'],['Service worker','serviceWorker' in navigator?'supported':'unsupported'],['IndexedDB','indexedDB' in window?'supported':'unsupported'],['BroadcastChannel','BroadcastChannel' in window?'supported':'unsupported'],['WebRTC','RTCPeerConnection' in window?'supported':'unsupported'],['WebGPU',c.webgpu?'available':'not detected']].map(([a,b])=>`<div class="card"><div class="meta">${a}</div><strong>${b}</strong></div>`).join('');
}

async function savePrefs(){await setKV('prefs',prefs)}
function applyPrefs(){document.documentElement.dataset.theme=prefs.theme;document.body.classList.toggle('density-compact',prefs.density==='compact');document.body.classList.toggle('focus-mode',!!prefs.focus);$('#themeBtn').textContent=prefs.theme==='dark'?'☀':'◐';}

function setupSearch(){
  const input=$('#globalSearch');
  const run=()=>{const q=input.value.trim().toLowerCase();const els=$$('.searchable');let hits=0;for(const el of els){const ok=!q||(el.dataset.search||el.textContent).toLowerCase().includes(q);el.classList.toggle('search-hidden',!ok);if(ok&&q)hits++;}$('#searchCount').textContent=q?`${hits} matches`:''};
  input.addEventListener('input',run);document.addEventListener('keydown',e=>{if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement.tagName)){e.preventDefault();input.focus()}if(e.key==='Escape'){input.value='';run();closeAllModals();dismissSplash();}});
}

function setupTooltips(){
  const tip=$('#tooltip');
  $$('[data-tip]').forEach(el=>{if(!el.matches('a,button,input,select,textarea,summary,[tabindex]'))el.tabIndex=0;el.setAttribute('aria-describedby','tooltip')});
  const show=e=>{const t=e.target.closest?.('[data-tip]');if(!t)return;tip.textContent=t.dataset.tip;tip.classList.add('show');tip.dataset.owner=t.id||'';const r=t.getBoundingClientRect();const w=Math.min(340,innerWidth-24);tip.style.width=`${w}px`;const tr=tip.getBoundingClientRect();let left=Math.max(12,Math.min(innerWidth-tr.width-12,r.left));let top=r.bottom+8;if(top+tr.height>innerHeight-10)top=r.top-tr.height-8;tip.style.left=`${left}px`;tip.style.top=`${Math.max(10,top)}px`};
  const hide=e=>{if(e.type==='focusout'||!e.relatedTarget?.closest?.('[data-tip]'))tip.classList.remove('show')};
  document.addEventListener('mouseover',show);document.addEventListener('focusin',show);document.addEventListener('mouseout',hide);document.addEventListener('focusout',hide);document.addEventListener('keydown',e=>{if(e.key==='Escape')tip.classList.remove('show')});
}

function setupCollaborationEvents(){
  collab.addEventListener('workspace',e=>{workspace=e.detail;renderWorkspace()});
  collab.addEventListener('presence',e=>renderPresence(e.detail));
  collab.addEventListener('status',e=>{const m=e.detail.mode;setStatus(e.detail.message,m==='trystero'?'online':m==='local'?'local':'');$('#roomTechnicalState').textContent=e.detail.message});
  collab.addEventListener('stream',e=>addRemoteVideo(e.detail.stream,e.detail.peerId));
  collab.addEventListener('file',e=>receivePeerFile(e.detail));
  collab.addEventListener('sync',e=>{const d=e.detail;$('#roomTechnicalState').textContent=`Synchronized ${d.type}${d.collection?' · '+d.collection:''} with peer ${String(d.peerId||'').slice(0,10)}…`;});
  collab.addEventListener('conflict',e=>{const d=e.detail;$('#roomTechnicalState').textContent=`Concurrent edit detected in ${d.collection}; ${d.resolution}. Review the record and export a milestone snapshot if consequential.`;toast(`Concurrent edit detected: ${d.collection}`)});
}
function addRemoteVideo(stream,peerId){let card=remoteVideos.get(peerId);if(!card){card=document.createElement('div');card.className='video-card';card.innerHTML=`<video autoplay playsinline></video><span>${esc(peerId.slice(0,10))}</span>`;$('#videoGrid').append(card);remoteVideos.set(peerId,card)}$('video',card).srcObject=stream}
function receivePeerFile({data,peerId,metadata}){const blob=new Blob([data],{type:metadata?.type||'application/octet-stream'});const url=URL.createObjectURL(blob);const row=document.createElement('div');row.className='resource-row';const safeName=metadata?.name||'peer-file';row.innerHTML=`<strong>Peer file:</strong> ${esc(safeName)} <span class="meta">from ${esc(peerId.slice(0,10))}</span> <a href="${url}" download="${esc(safeName)}">Save locally</a>`;$('#fileInbox').prepend(row);toast(`Received file: ${safeName}`)}

async function connectRoom(){
  const roomId=$('#roomId').value.trim().replace(/[^a-zA-Z0-9_.-]/g,'-').slice(0,80)||'texas-commons';const password=$('#roomPassword').value;const strategy=$('#roomStrategy').value;
  profile={name:$('#profileName').value.trim()||'Steward',org:$('#profileOrg').value.trim()||'Independent',role:$('#profileRole').value,region:$('#profileRegion').value,participantId};
  await setKV('profile',profile);prefs.lastRoom=roomId;prefs.strategy=strategy;await savePrefs();
  $('#connectBtn').disabled=true;setStatus('Connecting…','local');
  const turnConfig=[];
  const turnUrl=$('#turnUrl').value.trim();if(turnUrl){turnConfig.push({urls:[turnUrl],username:$('#turnUser').value.trim(),credential:$('#turnCredential').value})}
  try{await collab.connect({roomId,password,strategy,profile,turnConfig});workspace=collab.workspace;renderWorkspace();renderPresence();$('#disconnectBtn').disabled=false}
  catch(e){toast(`Connection error: ${e.message}`)}finally{$('#connectBtn').disabled=false}
}

async function disconnectRoom(){await collab.disconnect();setStatus('Disconnected','');$('#disconnectBtn').disabled=true;remoteVideos.forEach(el=>el.remove());remoteVideos.clear()}

function setupForms(){
  $('#ecoFilter').oninput=e=>renderTexas(e.target.value);
  $('#atlasFilter').oninput=renderAtlas;$('#atlasGroup').onchange=renderAtlas;
  $$('#priceCalc input').forEach(i=>i.addEventListener('input',calcPrice));
  $('#newProjectBtn').onclick=()=>openProjectModal();$('#projectModalClose').onclick=()=>closeModal('projectModal');
  $('#projectForm').onsubmit=async e=>{e.preventDefault();const id=$('#projectId').value||uid();const prev=workspace.projects.find(x=>x.id===id)||{};await collab.upsert('projects',{...prev,id,title:$('#projectTitle').value.trim(),domain:$('#projectDomain').value.trim(),region:$('#projectRegion').value.trim(),lead:$('#projectLead').value.trim(),status:$('#projectStatus').value,impact:$('#projectImpact').value.trim(),needs:$('#projectNeeds').value.trim()});closeModal('projectModal');toast('Shared project saved')};
  $('#proposalForm').onsubmit=async e=>{e.preventDefault();await collab.upsert('proposals',{id:uid(),title:$('#proposalTitle').value.trim(),text:$('#proposalText').value.trim(),author:profile.name,rule:$('#proposalRule').value,state:'open',votes:{}});e.target.reset();toast('Proposal shared')};
  $('#resourceForm').onsubmit=async e=>{e.preventDefault();await collab.upsert('resources',{id:uid(),kind:$('#resourceKind').value,item:$('#resourceItem').value.trim(),category:$('#resourceCategory').value.trim(),quantity:$('#resourceQuantity').value.trim(),location:$('#resourceLocation').value.trim(),owner:profile.name});e.target.reset();toast('Resource post shared')};
  $('#taskForm').onsubmit=async e=>{e.preventDefault();await collab.upsert('tasks',{id:uid(),projectId:$('#taskProject').value,title:$('#taskTitle').value.trim(),owner:$('#taskOwner').value.trim()||profile.name,status:$('#taskStatus').value,author:profile.name});e.target.reset();refreshProjectSelects();toast('Task shared')};
  $('#commentForm').onsubmit=async e=>{e.preventDefault();await collab.upsert('comments',{id:uid(),projectId:$('#commentProject').value,text:$('#commentText').value.trim(),author:profile.name});e.target.reset();refreshProjectSelects();toast('Project comment shared')};
  $('#decisionForm').onsubmit=async e=>{e.preventDefault();await collab.upsert('decisions',{id:uid(),projectId:$('#decisionProject').value,text:$('#decisionText').value.trim(),basis:$('#decisionBasis').value.trim(),author:profile.name});e.target.reset();refreshProjectSelects();toast('Decision logged and shared')};
  $('#chatForm').onsubmit=async e=>{e.preventDefault();const text=$('#chatInput').value.trim();if(text){await collab.sendChat(text);$('#chatInput').value=''}};
  $('#connectBtn').onclick=connectRoom;$('#disconnectBtn').onclick=disconnectRoom;
  $('#mediaStart').onclick=async()=>{try{const s=await collab.startMedia({audio:true,video:$('#mediaVideo').checked});const card=document.createElement('div');card.className='video-card';card.id='selfVideoCard';card.innerHTML='<video autoplay muted playsinline></video><span>You</span>';$('#videoGrid').prepend(card);$('video',card).srcObject=s;toast('Media shared directly with room peers')}catch(e){toast(e.message)}};
  $('#mediaStop').onclick=()=>{collab.stopMedia();$('#selfVideoCard')?.remove()};
  $('#peerFile').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{await collab.sendFile(f);toast(`Sent ${f.name}`)}catch(err){toast(err.message)}e.target.value=''};
  $('#aiRun').onclick=runAI;$('#aiUnload').onclick=async()=>{await unloadAI();$('#aiStateText').textContent='Unloaded';toast('Local model unloaded')};
}

function validateWorkspaceShape(w){
  if(!w||typeof w!=='object'||Array.isArray(w))throw new Error('Workspace must be an object');
  for(const key of ['projects','tasks','comments','proposals','resources','chat','decisions']){
    if(w[key]!==undefined&&!Array.isArray(w[key]))throw new Error(`Workspace collection ${key} must be an array`);
    for(const record of w[key]||[]){if(!record||typeof record!=='object'||Array.isArray(record)||typeof record.id!=='string'||!record.id.trim())throw new Error(`Invalid record in ${key}`)}
  }
  return true;
}
function validateBackupPayload(parsed){
  if(!parsed||parsed.format!=='TexasFoodSovereigntyOSBackup'||!parsed.data||typeof parsed.data!=='object'||Array.isArray(parsed.data))throw new Error('Not a recognized backup');
  if(Number(parsed.schemaVersion)>schemaVersion)throw new Error('Backup was created by a newer schema version');
  for(const [key,value] of Object.entries(parsed.data))if(key.startsWith('workspace:'))validateWorkspaceShape(value);
  return true;
}
async function setupBackups(){
  $('#exportData').onclick=async()=>{const data={format:'TexasFoodSovereigntyOSBackup',schemaVersion,exportedAt:new Date().toISOString(),data:await exportAll()};download(`texas-food-sovereignty-backup-${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(data,null,2));toast('Backup exported')};
  $('#importData').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const parsed=JSON.parse(await f.text());validateBackupPayload(parsed);await importAll(parsed.data);toast('Validated backup imported. Reloading…');setTimeout(()=>location.reload(),700)}catch(err){toast(`Import failed: ${err.message}`)}e.target.value=''};
  $('#exportWorkspace').onclick=()=>download(`workspace-${collab.roomId||prefs.lastRoom}.json`,JSON.stringify({format:'TXFSWorkspace',schemaVersion,roomId:collab.roomId||prefs.lastRoom,exportedAt:new Date().toISOString(),workspace},null,2));
}

function setupSettings(){
  $('#themeBtn').onclick=async()=>{prefs.theme=prefs.theme==='dark'?'light':'dark';applyPrefs();renderSettings();await savePrefs()};
  $('#focusBtn').onclick=async()=>{prefs.focus=!prefs.focus;applyPrefs();await savePrefs()};
  $('#themeSelect').onchange=async e=>{prefs.theme=e.target.value;applyPrefs();await savePrefs()};
  $('#densitySelect').onchange=async e=>{prefs.density=e.target.value;applyPrefs();await savePrefs()};
  $('#fxToggle').onchange=async e=>{prefs.reducedFx=!e.target.checked;await savePrefs();if(prefs.reducedFx)$('#starfield').style.display='none';else{$('#starfield').style.display='';startStars()}};
  $('#menuBtn').onclick=()=>{const s=$('#sidebar');const open=s.classList.toggle('open');$('#menuBtn').setAttribute('aria-expanded',String(open))};
}

function setupPWA(){
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('#installBtn').classList.remove('hidden')});
  $('#installBtn').onclick=async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$('#installBtn').classList.add('hidden')};
  if('serviceWorker' in navigator && location.protocol!=='file:') navigator.serviceWorker.register('./sw.js',{scope:'./'}).then(reg=>{reg.addEventListener('updatefound',()=>toast('App update found; it will activate after refresh.'))}).catch(e=>console.warn('SW registration failed',e));
  const updateNet=()=>{$('#netState').textContent=navigator.onLine?'online':'offline';$('#netDot').className=`status-dot ${navigator.onLine?'online':'local'}`};window.addEventListener('online',updateNet);window.addEventListener('offline',updateNet);updateNet();
}

function closeAllModals(){$$('.modal-backdrop.open').forEach(m=>m.classList.remove('open'))}
function dismissSplash(){
  const s = $('#splash');
  if (!s) return;

  s.classList.add('dismissed');
  s.setAttribute('aria-hidden','true');

  try {
    sessionStorage.setItem('txfs:splash','seen');
  } catch (err) {
    console.warn('Splash state could not be saved:', err);
  }

  setTimeout(() => {
    s.hidden = true;
  }, 500);
}

function setupSplash(){
  const enterBtn = $('#enterBtn');
  const guideBtn = $('#guideEntryBtn');

  // Wire escape controls FIRST.
  enterBtn?.addEventListener('click', dismissSplash);

  guideBtn?.addEventListener('click', () => {
    dismissSplash();
    setRoute('guides');
  });

  // Already viewed this session.
  try {
    if (sessionStorage.getItem('txfs:splash') === 'seen') {
      dismissSplash();
      return;
    }
  } catch {}

  const reduced =
    prefs.reducedFx ||
    matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stages = [
    ['connectivity','Local workspace and capability checks ready',34],
    ['evidence','Texas evidence and provenance layers indexed',67],
    ['collaboration','Peer collaboration architecture ready',100]
  ];

  const activate = (name,status,pct) => {
    $$('[data-splash-stage]').forEach(el => {
      const i = stages.findIndex(x => x[0] === el.dataset.splashStage);
      const cur = stages.findIndex(x => x[0] === name);

      el.classList.toggle('active',i === cur);
      el.classList.toggle(
        'done',
        i < cur || (pct === 100 && i === cur)
      );
    });

    $('#splashStatus').textContent = status;
    $('#splashTrackFill').style.width = `${pct}%`;
  };

  if (reduced) {
    activate(
      'collaboration',
      'Workspace ready. Motion reduced by preference.',
      100
    );

    // Automatically leave splash.
    setTimeout(dismissSplash, 350);
    return;
  }

  stages.forEach((stage,i) => {
    setTimeout(() => activate(...stage), 260 + i * 520);
  });

  // THIS WAS MISSING:
  // close shortly after the third stage reaches 100%.
  setTimeout(dismissSplash, 2100);
}

function startStars(){
  if(prefs.reducedFx||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const c=$('#starfield'),x=c.getContext('2d');let stars=[];const resize=()=>{c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;c.style.width=innerWidth+'px';c.style.height=innerHeight+'px';x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);stars=Array.from({length:Math.min(150,Math.floor(innerWidth*innerHeight/9000))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.2+.2,a:Math.random()*.5+.15}))};resize();window.addEventListener('resize',resize,{passive:true});let last=0;const draw=t=>{if(t-last>45){last=t;x.clearRect(0,0,innerWidth,innerHeight);for(const s of stars){s.y+=.025;if(s.y>innerHeight)s.y=0;x.globalAlpha=s.a;x.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--accent');x.beginPath();x.arc(s.x,s.y,s.r,0,Math.PI*2);x.fill()}}requestAnimationFrame(draw)};requestAnimationFrame(draw)
}

function drawNetwork(){
  const c=$('#networkCanvas');if(!c||!c.offsetParent)return;const dpr=devicePixelRatio||1,w=c.clientWidth||800,h=320;c.width=w*dpr;c.height=h*dpr;const ctx=c.getContext('2d');ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);
  const style=getComputedStyle(document.documentElement),line=style.getPropertyValue('--line'),accent=style.getPropertyValue('--accent'),accent2=style.getPropertyValue('--accent2'),text=style.getPropertyValue('--text');
  const domains=[...new Set((workspace.projects||[]).map(p=>p.domain||'cross-domain'))].slice(0,12);const nodes=[{name:'Texas Food Commons',x:w/2,y:h/2,core:true},...domains.map((d,i)=>({name:d,x:w/2+Math.cos(i/domains.length*Math.PI*2)*Math.min(w*.34,260),y:h/2+Math.sin(i/domains.length*Math.PI*2)*110}))];
  ctx.strokeStyle=line;ctx.lineWidth=1.2;for(let i=1;i<nodes.length;i++){ctx.beginPath();ctx.moveTo(nodes[0].x,nodes[0].y);ctx.lineTo(nodes[i].x,nodes[i].y);ctx.stroke()}
  for(const n of nodes){ctx.fillStyle=n.core?accent:accent2;ctx.beginPath();ctx.arc(n.x,n.y,n.core?10:6,0,Math.PI*2);ctx.fill();ctx.fillStyle=text;ctx.globalAlpha=.9;ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillText(n.name,n.x,n.y+(n.core?28:20));ctx.globalAlpha=1}
}

function updateProfileFields(){
  $('#profileName').value=profile.name||'';$('#profileOrg').value=profile.org||'';$('#profileRole').value=profile.role||'Community';$('#profileRegion').value=profile.region||'Statewide';$('#roomId').value=prefs.lastRoom||'texas-commons';$('#roomStrategy').value=prefs.strategy||'nostr';
}

async function init(){
  buildNav();
  prefs={...prefs,...await getKV('prefs',{})};participantId=await getKV('participantId','');if(!participantId){participantId=uid();await setKV('participantId',participantId)}
  profile={name:'Steward',org:'Independent',role:'Community',region:'Statewide',participantId,...await getKV('profile',{})};profile.participantId=participantId;
  applyPrefs();setupSplash();setupSearch();setupTooltips();setupSettings();setupPWA();setupForms();setupBackups();setupCollaborationEvents();updateProfileFields();
  await collab.init(profile);workspace=await collab.loadWorkspace(prefs.lastRoom||'texas-commons',seedProjects);renderPresence();
  renderOverview();renderTexas();renderPrices();renderWater();renderRD();renderNetwork();renderGovernance();renderInfrastructure();renderGuides();renderSources();renderSettings();renderWorkspace();
  window.addEventListener('hashchange',()=>setRoute(routeFromHash()));setRoute(routeFromHash());
  $$('.modal-backdrop').forEach(m=>m.addEventListener('mousedown',e=>{if(e.target===m)m.classList.remove('open')}));
  $('#snapshotDate').textContent=SNAPSHOT_DATE;$('#schemaVersion').textContent=String(schemaVersion);$('#webgpuBadge').textContent=aiCapabilities().webgpu?'WebGPU detected':'WebGPU optional';
  $('#oldVersionLink').href='./legacy-singlefile.html'; startStars();
  if(!window.isSecureContext)toast('Some features require HTTPS or localhost. GitHub Pages provides HTTPS.');
}

init().catch(e=>{console.error(e);document.body.insertAdjacentHTML('afterbegin',`<div class="noscript">Initialization error: ${esc(e.message)}. Core source files are still available in this bundle.</div>`)});
