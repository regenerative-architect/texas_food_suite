const CACHE='tx-food-commons-v4-20260928';
const CORE=[
  './','./index.html','./offline.html','./manifest.webmanifest','./css/styles.css',
  './js/app.js','./js/db.js','./js/collaboration.js','./js/ai.js','./js/webllm-worker.js',
  './data/texas-data.js','./data/connectivity-data.js','./data/workspace-schema.json','./icons/icon.svg','./icons/icon-192.png','./icons/icon-512.png','./legacy-singlefile.html'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tx-food-commons-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return res}).catch(async()=>await caches.match('./index.html')||await caches.match('./offline.html')));
    return;
  }
  if(url.origin===self.location.origin){
    event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return res}).catch(()=>caches.match('./offline.html'))));
    return;
  }
  // Cache only small runtime JavaScript dependencies. WebLLM model artifacts maintain their own cache backend.
  if(['esm.run','esm.sh','cdn.jsdelivr.net','esm.unpkg.com'].includes(url.hostname)){
    event.respondWith(fetch(req).then(res=>{if(res.ok && res.type!=='opaque'){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return res}).catch(()=>caches.match(req)));
  }
});
