// Portfolio PWA Service Worker
// Version 1.0 - Phase 1 Implementation

const CACHE_NAME = 'portfolio-pwa-v1.0';
const DATA_CACHE_NAME = 'portfolio-data-v1.0';

// Core app shell files to cache
const CORE_FILES = [
  '/',
  '/index.css',
  // '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// API endpoints to cache
const API_CACHE_URLS = [
  'https://www.alphavantage.co/query'
];

// Install event - cache core app shell
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install event');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(CORE_FILES);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[ServiceWorker] Cache failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate event');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Claim all clients immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle API requests (network first, then cache)
  if (url.hostname === 'www.alphavantage.co') {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(request)
          .then((response) => {
            // If network request succeeds, update cache
            if (response.status === 200) {
              cache.put(request.url, response.clone());
            }
            return response;
          })
          .catch(() => {
            // Network failed, try cache
            console.log('[ServiceWorker] Network failed, serving from cache');
            return cache.match(request);
          });
      })
    );
    return;
  }
  
  // Handle app shell requests (cache first, then network)
  if (request.mode === 'navigate' || 
      request.destination === 'style' || 
      request.destination === 'script' ||
      request.destination === 'document') {
    
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            // Serve from cache
            console.log('[ServiceWorker] Serving from cache:', request.url);
            return cachedResponse;
          }
          
          // Not in cache, fetch from network
          return fetch(request).then((response) => {
            // Cache successful responses
            if (response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          }).catch(() => {
            // Network failed, serve offline page for navigation requests
            if (request.mode === 'navigate') {
              return cache.match('/index.html');
            }
          });
        });
      })
    );
    return;
  }
  
  // Handle other requests with default strategy
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// Background sync for portfolio data updates
self.addEventListener('sync', (event) => {
  console.log('[ServiceWorker] Background sync:', event.tag);
  
  if (event.tag === 'portfolio-sync') {
    event.waitUntil(
      // In a real implementation, this would sync pending portfolio updates
      syncPortfolioData()
    );
  }
});

// Portfolio data sync function
async function syncPortfolioData() {
  try {
    console.log('[ServiceWorker] Syncing portfolio data...');
    
    // Get pending updates from IndexedDB (if any)
    // This is where you'd implement offline-first data sync
    
    // For now, just log that sync is available
    console.log('[ServiceWorker] Portfolio sync completed');
    
    // Notify clients that sync is complete
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        payload: { success: true }
      });
    });
    
  } catch (error) {
    console.error('[ServiceWorker] Portfolio sync failed:', error);
  }
}

// Handle messages from main app
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_VERSION':
      event.ports[0].postMessage({
        version: CACHE_NAME,
        dataVersion: DATA_CACHE_NAME
      });
      break;
      
    case 'CACHE_PORTFOLIO_DATA':
      // Cache portfolio data for offline access
      caches.open(DATA_CACHE_NAME).then((cache) => {
        const dataBlob = new Response(JSON.stringify(payload));
        cache.put('/portfolio-data', dataBlob);
      });
      break;
      
    default:
      console.log('[ServiceWorker] Unknown message type:', type);
  }
});

// Push notification handling (for future phases)
self.addEventListener('push', (event) => {
  console.log('[ServiceWorker] Push received');
  
  const options = {
    body: 'Portfolio update available',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'portfolio-update',
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'View Portfolio'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Portfolio PWA', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('[ServiceWorker] Service Worker loaded - Portfolio PWA v1.0');