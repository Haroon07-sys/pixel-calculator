// Offline cache for the Pixel Calculator web app. Bump CACHE when files change.
const CACHE='pixel-calc-app-2026-10-28-1';
const FILES=['./','index.html','manifest.webmanifest','../favicon.ico','../fonts/figtree-latin-400-normal.woff2','../fonts/figtree-latin-500-normal.woff2','../fonts/figtree-latin-600-normal.woff2','../icons/icon-192.png','../icons/icon-512.png','../icons/maskable-512.png','../icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{
    if(r&&r.status===200&&new URL(e.request.url).origin===location.origin){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}
    return r;
  }).catch(()=>caches.match('index.html'))));
});
