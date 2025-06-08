const CACHE_NAME = 'holiday-cluedo-cache-v2'; // Increment this when you make changes

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
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
  self.skipWaiting(); // Force immediate activation
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete old caches that don't match current version
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of all pages immediately
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached version or fetch from network
      return response || fetch(event.request).catch(() => {
        // If both cache and network fail, return a basic response for HTML requests
        if (event.request.headers.get('accept').includes('text/html')) {
          return new Response('Holiday Cluedo is offline', {
            headers: { 'Content-Type': 'text/html' }
          });
        }
      });
    })
  );
});