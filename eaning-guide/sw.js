const CACHE_NAME = 'eaning-guide-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './tai-lieu-dao-tao.html',
  './thu-tuc-dang-ky-khai-sinh.html',
  './css/style.css',
  './js/main.js',
  './assets/hero_banner.png',
  './assets/birth_registration.png',
  './assets/icon_pwa.png'
];

// Add slides to cache dynamically
for (let i = 1; i <= 29; i++) {
  urlsToCache.push(`./assets/slides/Tailieu_Daotao_DVC_DakLakSo_${i}.png`);
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache v2');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});
