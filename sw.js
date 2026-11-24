const CACHE='note-lab-shell-2f800b9ad3af';
const SHELL=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./assets/icon-192-B0bF3Umf.png","./assets/index-DK-mqzY_.css","./assets/index-R8dFSPqN.js","./assets/manifest-mGo0n6-I.webmanifest"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('note-lab-shell-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const r=event.request;
 if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
 if(r.mode==='navigate'){
  event.respondWith(fetch(r).catch(()=>caches.match('./index.html')));
  return;
 }
 event.respondWith(fetch(r).then(response=>{
  if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(r,copy)))}
  return response;
 }).catch(()=>caches.match(r).then(response=>response||Response.error())));
});
