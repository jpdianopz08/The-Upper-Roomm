/* The Upper Room tracker — offline support.
   Bump VERSION whenever you upload a new index.html so tablets pick it up. */
const VERSION = "upper-room-v1";
const CORE = [
  "./", "./index.html", "./manifest.webmanifest",
  "./assets/favicon.ico", "./assets/favicon.svg", "./assets/favicon-32.png",
  "./assets/apple-touch-icon.png", "./assets/icon-192.png", "./assets/icon-512.png",
  "./assets/icon-maskable-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // The app page: try the network first so updates arrive, fall back to the saved copy offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone(); caches.open(VERSION).then(c => c.put("./index.html", copy)); return res;
      }).catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Icons, manifest and Google Fonts: use the saved copy, refresh it in the background.
  const sameOrigin = url.origin === self.location.origin;
  const fonts = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (sameOrigin || fonts) {
    e.respondWith(
      caches.match(req).then(hit => {
        const net = fetch(req).then(res => {
          if (res && (res.ok || res.type === "opaque")) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
          return res;
        }).catch(() => hit);
        return hit || net;
      })
    );
  }
});
