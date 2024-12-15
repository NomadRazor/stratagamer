'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "51630a49ed0a4c6909053223a45dd13e",
"assets/AssetManifest.json": "e043a47c254913a2ec3961cec9c118e7",
"assets/assets/arrows/arrow_down.png": "5beff83fece1bb4d418b67fbfd4b1f32",
"assets/assets/arrows/arrow_left.png": "3e9906f6e7eb6f1bfe9889699f25a705",
"assets/assets/arrows/arrow_right.png": "7d3580e055ee5984178cb074e5017595",
"assets/assets/arrows/arrow_up.png": "326b02e394e36ac30675a733d71e5b66",
"assets/assets/hellpod.png": "c347c2c884b3b151288f293a23fa8941",
"assets/assets/logo.png": "108554fced7ca49ca1845d4bd15f0f17",
"assets/assets/logo_splash.png": "77b69e4e945a29b43c7da5c1de57bf2d",
"assets/assets/starship.png": "e6c7366cf216d82c56a621bd8cf9e64c",
"assets/FontManifest.json": "ff97c0316e760ad1dee1f2ba986f49e5",
"assets/fonts/FS-Sinclair-Medium.otf": "e666d5d4596a3451765735adca6adb30",
"assets/fonts/KodeMono-Bold.ttf": "2153d134061782c287fd24d34b0f1f6d",
"assets/fonts/KodeMono-Medium.ttf": "1efb1eb233778e57c2cab1456e5becf2",
"assets/fonts/KodeMono-Regular.ttf": "f8ad3cd837565a9f7d47b2ffb88beb1d",
"assets/fonts/KodeMono-SemiBold.ttf": "49a0edd2e1f24765f6803d88142a5b8d",
"assets/fonts/MaterialIcons-Regular.otf": "1b86c7608f5b4ca265f73a214ecff0b9",
"assets/NOTICES": "a0b648ea892e1767f1ae2296ce3cf342",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "5b853d77c5d96d238642c31125878012",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "1b0ccf8c39e4c4c831e3a9c578344008",
"icons/Icon-512.png": "01913237941adb2aea555d68fc2cd3b1",
"icons/Icon-maskable-192.png": "1b0ccf8c39e4c4c831e3a9c578344008",
"icons/Icon-maskable-512.png": "01913237941adb2aea555d68fc2cd3b1",
"index.html": "47abae9be18c45c369fc844e0b58dfdf",
"/": "47abae9be18c45c369fc844e0b58dfdf",
"main.dart.js": "8f9b940b61988dc986256db2b07a58b6",
"manifest.json": "4959a96b5416ab5aebb3e90a23d4fee9",
"splash/img/dark-1x.png": "807458d7c4d39b56a1baf97a16d95398",
"splash/img/dark-2x.png": "c8fd568e8ffe27725d49a14db565c530",
"splash/img/dark-3x.png": "d2aa21040237718adc847d8a6b829620",
"splash/img/dark-4x.png": "184abe9ca735844fb229c83e1f4c9fb1",
"splash/img/light-1x.png": "807458d7c4d39b56a1baf97a16d95398",
"splash/img/light-2x.png": "c8fd568e8ffe27725d49a14db565c530",
"splash/img/light-3x.png": "d2aa21040237718adc847d8a6b829620",
"splash/img/light-4x.png": "184abe9ca735844fb229c83e1f4c9fb1",
"version.json": "358ec41fbd3011d21d19d624463bd758"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
