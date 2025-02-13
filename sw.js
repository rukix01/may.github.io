const CACHE_NAME = 'valentine-music-cache-v1';
const urlsToCache = [
  '/',           // Adjust if needed (for example, if your file structure differs)
  '/index.html',
  '/cd.jpg',
  '/line.m4a',
  '/perfect.m4a',
  '/die.m4a',
  '/blue.mp3',
  '/may.jpg'
  // Add any other assets you want cached here.
];

// Installation - Cache files during the install phase
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation - Clean up old caches if necessary
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch - Intercept network requests and serve cached responses when available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached resource if available, else fetch from network.
        return response || fetch(event.request);
      })
  );
});
