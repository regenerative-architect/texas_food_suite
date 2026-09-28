const DB_NAME = 'tx-food-sovereignty-os';
const DB_VERSION = 3;
const STORE = 'kv';

let dbPromise;
function openDB(){
  if (!('indexedDB' in globalThis)) return Promise.resolve(null);
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve,reject)=>{
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

export async function getKV(key, fallback=null){
  try{
    const db = await openDB();
    if (!db) {
      const raw = localStorage.getItem(`txfs:${key}`);
      return raw ? JSON.parse(raw) : fallback;
    }
    return await new Promise((resolve,reject)=>{
      const tx = db.transaction(STORE,'readonly');
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => resolve(req.result ?? fallback);
      req.onerror = () => reject(req.error);
    });
  }catch(err){ console.warn('getKV fallback',err); return fallback; }
}

export async function setKV(key,value){
  try{
    const db = await openDB();
    if (!db) { localStorage.setItem(`txfs:${key}`,JSON.stringify(value)); return; }
    await new Promise((resolve,reject)=>{
      const tx = db.transaction(STORE,'readwrite');
      tx.objectStore(STORE).put(value,key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }catch(err){
    try{ localStorage.setItem(`txfs:${key}`,JSON.stringify(value)); }
    catch(e){ console.error('setKV failed',err,e); throw err; }
  }
}

export async function delKV(key){
  const db = await openDB();
  if (!db){ localStorage.removeItem(`txfs:${key}`); return; }
  await new Promise((resolve,reject)=>{
    const tx = db.transaction(STORE,'readwrite');
    tx.objectStore(STORE).delete(key);
    tx.oncomplete=()=>resolve(); tx.onerror=()=>reject(tx.error);
  });
}

export async function exportAll(){
  const db = await openDB();
  const out = {};
  if (!db){
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i);
      if(key?.startsWith('txfs:')){
        try{ out[key.slice(5)] = JSON.parse(localStorage.getItem(key)); }catch{}
      }
    }
    return out;
  }
  return await new Promise((resolve,reject)=>{
    const tx = db.transaction(STORE,'readonly');
    const store = tx.objectStore(STORE);
    const req = store.openCursor();
    req.onsuccess = e => {
      const cur=e.target.result;
      if(cur){out[cur.key]=cur.value;cur.continue();} else resolve(out);
    };
    req.onerror=()=>reject(req.error);
  });
}

export async function importAll(obj){
  if(!obj || typeof obj !== 'object' || Array.isArray(obj)) throw new Error('Import must be an object');
  const db = await openDB();
  if (!db){
    for(const [k,v] of Object.entries(obj)) localStorage.setItem(`txfs:${k}`,JSON.stringify(v));
    return;
  }
  await new Promise((resolve,reject)=>{
    const tx=db.transaction(STORE,'readwrite');
    const store=tx.objectStore(STORE);
    for(const [k,v] of Object.entries(obj)) store.put(v,k);
    tx.oncomplete=()=>resolve(); tx.onerror=()=>reject(tx.error);
  });
}
