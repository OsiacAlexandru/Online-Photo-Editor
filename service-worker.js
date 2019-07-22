var dataCacheName = 'photo_editor';
var cacheName = 'photo_editor';

var filesToCache = [
  '1_1079_OSIAC_ALEXANDRU_CRISTIAN.html',
  'lib/manifest.json',
  '1_1079_OSIAC_ALEXANDRU_CRISTIAN.js',
  '1_1079_OSIAC_ALEXANDRU_CRISTIAN.css',
  'lib/FileSave.js',
  'lib/image-editor.js',
  'lib/bootstrap.min.js',
  'lib/bootstrap.min.css',
  'media/click.mp3',
  'media/click2.wav',
  'media/download.jpg',
  'media/paint.png',

  "lib/jquery-1.12.4.js",
  "lib/jquery-ui.js",
  "lib/bootstrap.min.css",
  "lib/jquery-3.3.1.slim.min.js",
  "lib/popper.min.js",
  "lib/bootstrap.min.js"

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
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
