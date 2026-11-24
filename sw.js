/* Cerchio Chiuso: il gioco resta giocabile anche senza rete. Prima prova la rete (per avere sempre l'ultima versione), poi la copia salvata. */
const C="cerchiochiuso-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","index.html","manifest.webmanifest","icon.svg","icon-192.png","icon-512.png"]).catch(()=>{})));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
  e.respondWith(fetch(r).then(res=>{if(res.ok&&(new URL(r.url)).origin===location.origin){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));});
