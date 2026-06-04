var active=false;

self.addEventListener("install",function(e){
  e.waitUntil(
    caches.open("prank-v1").then(function(cache){
      return cache.addAll(["index.html","video.mp4"]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate",function(e){
  e.waitUntil(self.clients.claim());
});

self.addEventListener("message",function(e){
  if(e.data==="start")active=true;
  if(e.data==="stop")active=false;
});

self.addEventListener("fetch",function(e){
  // 激活时：导航请求一律返回主页（防止离开）
  if(active&&e.request.mode==="navigate"){
    e.respondWith(caches.match("index.html"));
    return;
  }
  // 其他请求：缓存优先
  e.respondWith(
    caches.match(e.request).then(function(cached){
      return cached||fetch(e.request);
    })
  );
});
