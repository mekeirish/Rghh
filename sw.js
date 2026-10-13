const cacheName='Rghh-v2';
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(cacheName).then(c=>c.addAll(['./index.html','./manifest.json','./icon.png'])));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(key=>{if(key!==cacheName)return caches.delete(key);}))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('manifest.json')){
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});