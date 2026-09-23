// Cvyon service worker (v2).
//
// Caching strategy:
// - Page navigations / HTML: NETWORK-FIRST so visitors always get the latest
//   deployment. Falls back to the cache only when offline.
// - Immutable versioned assets (/_next/static/*, images, fonts): CACHE-FIRST,
//   safe because their URLs are content-hashed.
// - Everything else (API calls, etc.): network-only, never cached.
//
// NOTE: the cache name MUST be bumped on every strategy change so old,
// potentially stale caches are purged on activate.
const CACHE_NAME = 'cvyon-v2';
// Offline fallbacks, refreshed from the network on every successful fetch.
const OFFLINE_SHELL = ['/', '/build', '/favicon.png', '/manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((c) => c.addAll(OFFLINE_SHELL))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

function isImmutableAsset(url) {
  return (
    url.pathname.startsWith('/_next/static/') ||
    /\.(png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|eot)$/i.test(url.pathname)
  );
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Only handle same-origin requests; let the browser deal with the rest.
  if (url.origin !== self.location.origin) return;
  // Never intercept the service worker script itself.
  if (url.pathname === '/sw.js') return;

  const acceptsHtml = (req.headers.get('accept') || '').includes('text/html');
  if (req.mode === 'navigate' || acceptsHtml) {
    // NETWORK-FIRST for pages.
    e.respondWith(
      fetch(req).then(
        (res) => {
          const copy = res.clone();
          caches
            .open(CACHE_NAME)
            .then((c) => c.put(req, copy))
            .catch(() => {});
          return res;
        },
        () => caches.match(req).then((r) => r || caches.match('/build')).then((r) => r || caches.match('/'))
      )
    );
    return;
  }

  if (isImmutableAsset(url)) {
    // CACHE-FIRST for content-hashed static assets.
    e.respondWith(
      caches.match(req).then(
        (r) =>
          r ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches
              .open(CACHE_NAME)
              .then((c) => c.put(req, copy))
              .catch(() => {});
            return res;
          })
      )
    );
    return;
  }

  // API calls and everything else: network-only (never served stale, never cached).
});
