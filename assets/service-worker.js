self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('holiday-cluedo-cache').then(cache => {
        return cache.addAll([
          './',
          './index.html',
          './mission.html',
          './game.html',
          './update.html',
          './style.css',
          './setup.js',
          './mission.js',
          './game.js',
          './update.js',
          './manifest.json',
          './static/logo.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  