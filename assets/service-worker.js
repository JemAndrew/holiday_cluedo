self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('holiday-cluedo-cache').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './mission.html',
        './game.html',
        './update.html',
        './assets/style.css',         
        './scripts/setup.js',     
        './scripts/mission.js',        
        './scripts/game.js',    
        './scripts/update.js',         
        './assets/manifest.json',       
        './assets/logo.png'             
      ]);
    })
  );
});

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
  