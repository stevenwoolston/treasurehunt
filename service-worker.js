var cacheName = 'easter-egg-hunt';
var filesToCache = [
    '/',
    '/favicon.ico',
    '/index.html',
    '/manifest.json',
    '/css/bootstrap.min.css',
    '/css/bootstrap.min.css.map',
    '/css/easter.css',
    '/fonts/glyphicons-halflings-regular.eot',
    '/fonts/glyphicons-halflings-regular.svg',
    '/fonts/glyphicons-halflings-regular.ttf',
    '/fonts/glyphicons-halflings-regular.woff',
    '/fonts/glyphicons-halflings-regular.woff2',
    '/img/egg-bg.png',
    '/img/favicon/android-icon-144x144.png',
    '/img/favicon/android-icon-192x192.png',
    '/img/favicon/android-icon-36x36.png',
    '/img/favicon/android-icon-48x48.png',
    '/img/favicon/android-icon-72x72.png',
    '/img/favicon/android-icon-96x96.png',
    '/img/favicon/apple-icon-114x114.png',
    '/img/favicon/apple-icon-120x120.png',
    '/img/favicon/apple-icon-144x144.png',
    '/img/favicon/apple-icon-152x152.png',
    '/img/favicon/apple-icon-180x180.png',
    '/img/favicon/apple-icon-57x57.png',
    '/img/favicon/apple-icon-60x60.png',
    '/img/favicon/apple-icon-72x72.png',
    '/img/favicon/apple-icon-76x76.png',
    '/img/favicon/apple-icon-precomposed.png',
    '/img/favicon/apple-icon.png',
    '/img/favicon/browserconfig.xml',
    '/img/favicon/favicon-16x16.png',
    '/img/favicon/favicon-32x32.png',
    '/img/favicon/favicon-96x96.png',
    '/img/favicon/ms-icon-144x144.png',
    '/img/favicon/ms-icon-150x150.png',
    '/img/favicon/ms-icon-310x310.png',
    '/img/favicon/ms-icon-70x70.png',
    '/js/app.js',
    '/js/bootstrap.min.js',
    '/js/jquery-3.3.1.min.js',
    '/js/stopwatch.js'    
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
  });

  self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });