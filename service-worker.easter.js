var cacheName = "easter-egg-hunt";
var filesToCache = [
    "/easter/",
    "/easter/favicon.ico",
    "/easter/index.html",
    "/easter/manifest.json",
    "/easter/css/bootstrap.min.css",
    "/easter/css/bootstrap.min.css.map",
    "/easter/css/easter.css",
    "/easter/fonts/glyphicons-halflings-regular.eot",
    "/easter/fonts/glyphicons-halflings-regular.svg",
    "/easter/fonts/glyphicons-halflings-regular.ttf",
    "/easter/fonts/glyphicons-halflings-regular.woff",
    "/easter/fonts/glyphicons-halflings-regular.woff2",
    "/easter/img/egg-bg.png",
    "/easter/img/favicon/android-icon-144x144.png",
    "/easter/img/favicon/android-icon-192x192.png",
    "/easter/img/favicon/android-icon-36x36.png",
    "/easter/img/favicon/android-icon-48x48.png",
    "/easter/img/favicon/android-icon-72x72.png",
    "/easter/img/favicon/android-icon-96x96.png",
    "/easter/img/favicon/apple-icon-114x114.png",
    "/easter/img/favicon/apple-icon-120x120.png",
    "/easter/img/favicon/apple-icon-144x144.png",
    "/easter/img/favicon/apple-icon-152x152.png",
    "/easter/img/favicon/apple-icon-180x180.png",
    "/easter/img/favicon/apple-icon-57x57.png",
    "/easter/img/favicon/apple-icon-60x60.png",
    "/easter/img/favicon/apple-icon-72x72.png",
    "/easter/img/favicon/apple-icon-76x76.png",
    "/easter/img/favicon/apple-icon-precomposed.png",
    "/easter/img/favicon/apple-icon.png",
    "/easter/img/favicon/browserconfig.xml",
    "/easter/img/favicon/favicon-16x16.png",
    "/easter/img/favicon/favicon-32x32.png",
    "/easter/img/favicon/favicon-96x96.png",
    "/easter/img/favicon/ms-icon-144x144.png",
    "/easter/img/favicon/ms-icon-150x150.png",
    "/easter/img/favicon/ms-icon-310x310.png",
    "/easter/img/favicon/ms-icon-70x70.png",
    "/easter/js/app.js",
    "/easter/js/bootstrap.min.js",
    "/easter/js/jquery-3.3.1.min.js",
    "/easter/js/stopwatch.js"
];

self.addEventListener("install", function (e) {
    console.log("[ServiceWorker] Install");
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[ServiceWorker] Caching app shell");
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("activate", function (e) {
    console.log("[ServiceWorker] Activate");
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(
                keyList.map(function (key) {
                    if (key !== cacheName) {
                        console.log("[ServiceWorker] Removing old cache", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener("fetch", function (e) {
    console.log("[ServiceWorker] Fetch", e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});
