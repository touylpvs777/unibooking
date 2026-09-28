self.addEventListener('install', () => {
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Delete all caches to ensure users get the latest version
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => {
      // Claim clients so the unregister takes effect immediately
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Bypass cache completely and fetch from network
  event.respondWith(fetch(event.request));
});
