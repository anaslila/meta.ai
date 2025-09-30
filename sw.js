// Meta.ai Bank Service Worker
const CACHE_NAME = 'metaai-bank-v1.0.0';
const STATIC_CACHE = 'metaai-bank-static-v1.0.0';
const DYNAMIC_CACHE = 'metaai-bank-dynamic-v1.0.0';
const IMAGE_CACHE = 'metaai-bank-images-v1.0.0';

// URLs to cache on install
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/profile.js',
    '/alert.js',
    '/manifest.json',
    // Google Fonts
    'https://fonts.googleapis.com/css2?family=TT+Commons+Pro:wght@300;400;500;600;700;800;900&display=swap',
    'https://fonts.gstatic.com/s/ttcommonspro/v1/QldKNThLqRwH-OJ1UHjlKGlX5qhExfHwNBgDXA.woff2',
    // Font Awesome
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-regular-400.woff2',
    // App Icons
    'https://i.postimg.cc/Vsgq0JnJ/Meta-ai-Bank.png',
    'https://i.postimg.cc/fThYPxZ4/Meta-ai-Bank-1.png'
];

// Bank logos and external images to cache
const imagesToCache = [
    'https://via.placeholder.com/40',
    'https://via.placeholder.com/80',
    'https://via.placeholder.com/150',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face'
];

// Offline fallback pages
const offlineFallbacks = {
    '/': '/index.html',
    'document': '/index.html'
};

// Install event - cache resources
self.addEventListener('install', function(event) {
    console.log('Service Worker: Installing Meta.ai Bank SW v1.0.0...');
    
    event.waitUntil(
        Promise.all([
            // Cache static resources
            caches.open(STATIC_CACHE).then(function(cache) {
                console.log('Service Worker: Caching static files');
                return cache.addAll(urlsToCache);
            }),
            // Cache images
            caches.open(IMAGE_CACHE).then(function(cache) {
                console.log('Service Worker: Caching images');
                return cache.addAll(imagesToCache);
            })
        ]).then(function() {
            console.log('Service Worker: Installation complete');
            return self.skipWaiting();
        }).catch(function(error) {
            console.log('Service Worker: Installation failed', error);
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    // Delete old versions of caches
                    if (cacheName !== STATIC_CACHE && 
                        cacheName !== DYNAMIC_CACHE && 
                        cacheName !== IMAGE_CACHE &&
                        (cacheName.startsWith('metaai-bank-') || cacheName === CACHE_NAME)) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            console.log('Service Worker: Activation complete');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', function(event) {
    const requestUrl = new URL(event.request.url);
    
    // Skip cross-origin requests that we don't want to cache
    if (!shouldCacheRequest(event.request)) {
        return;
    }

    // Handle different types of requests
    if (event.request.destination === 'document') {
        event.respondWith(handleDocumentRequest(event.request));
    } else if (event.request.destination === 'image') {
        event.respondWith(handleImageRequest(event.request));
    } else if (isStaticAsset(event.request)) {
        event.respondWith(handleStaticAssetRequest(event.request));
    } else {
        event.respondWith(handleDynamicRequest(event.request));
    }
});

// Handle document requests (HTML pages)
async function handleDocumentRequest(request) {
    try {
        // Try network first for documents
        const networkResponse = await fetch(request);
        
        if (networkResponse && networkResponse.status === 200) {
            // Update cache with fresh content
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
    } catch (error) {
        console.log('Service Worker: Network failed for document, trying cache');
    }
    
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // Final fallback to offline page
    return caches.match('/index.html');
}

// Handle image requests
async function handleImageRequest(request) {
    // Try cache first for images
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        // Fetch from network
        const networkResponse = await fetch(request);
        
        if (networkResponse && networkResponse.status === 200) {
            // Cache the image
            const cache = await caches.open(IMAGE_CACHE);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
    } catch (error) {
        console.log('Service Worker: Image fetch failed:', request.url);
    }
    
    // Return placeholder image if available
    return caches.match('https://via.placeholder.com/150x150/580eeb/ffffff?text=Meta.ai');
}

// Handle static assets (CSS, JS, fonts)
async function handleStaticAssetRequest(request) {
    // Cache first strategy for static assets
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
    } catch (error) {
        console.log('Service Worker: Static asset fetch failed:', request.url);
    }
    
    return new Response('Asset not available offline', { status: 404 });
}

// Handle dynamic requests (API calls, etc.)
async function handleDynamicRequest(request) {
    try {
        // Network first for dynamic content
        const networkResponse = await fetch(request);
        
        if (networkResponse && networkResponse.status === 200) {
            // Cache successful responses
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
    } catch (error) {
        console.log('Service Worker: Dynamic request failed:', request.url);
    }
    
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    return new Response('Content not available offline', { status: 404 });
}

// Helper function to determine if request should be cached
function shouldCacheRequest(request) {
    const url = new URL(request.url);
    
    // Cache same-origin requests
    if (url.origin === self.location.origin) {
        return true;
    }
    
    // Cache specific external resources
    const allowedOrigins = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://cdnjs.cloudflare.com',
        'https://i.postimg.cc',
        'https://via.placeholder.com',
        'https://images.unsplash.com'
    ];
    
    return allowedOrigins.some(origin => url.href.startsWith(origin));
}

// Helper function to identify static assets
function isStaticAsset(request) {
    const url = new URL(request.url);
    const staticExtensions = ['.css', '.js', '.woff', '.woff2', '.ttf', '.eot'];
    
    return staticExtensions.some(ext => url.pathname.endsWith(ext)) ||
           url.href.includes('fonts.googleapis.com') ||
           url.href.includes('fonts.gstatic.com') ||
           url.href.includes('cdnjs.cloudflare.com');
}

// Background sync for offline transactions
self.addEventListener('sync', function(event) {
    console.log('Service Worker: Background sync triggered for:', event.tag);
    
    if (event.tag === 'background-sync-transactions') {
        event.waitUntil(syncPendingTransactions());
    } else if (event.tag === 'background-sync-profile') {
        event.waitUntil(syncProfileUpdates());
    } else if (event.tag === 'background-sync-notifications') {
        event.waitUntil(syncNotifications());
    }
});

// Push notification handling
self.addEventListener('push', function(event) {
    console.log('Service Worker: Push notification received');
    
    let notificationData = {
        title: 'Meta.ai Bank',
        body: 'You have a new banking notification',
        icon: 'https://i.postimg.cc/fThYPxZ4/Meta-ai-Bank-1.png',
        badge: 'https://i.postimg.cc/fThYPxZ4/Meta-ai-Bank-1.png',
        tag: 'banking-notification',
        requireInteraction: true,
        data: {
            url: '/',
            timestamp: Date.now()
        }
    };
    
    // Parse push data if available
    if (event.data) {
        try {
            const pushData = event.data.json();
            notificationData = { ...notificationData, ...pushData };
        } catch (error) {
            notificationData.body = event.data.text();
        }
    }
    
    // Add action buttons based on notification type
    if (notificationData.type === 'transaction') {
        notificationData.actions = [
            {
                action: 'view-transaction',
                title: 'View Details',
                icon: 'https://i.postimg.cc/fThYPxZ4/Meta-ai-Bank-1.png'
            },
            {
                action: 'dismiss',
                title: 'Dismiss',
                icon: 'https://i.postimg.cc/fThYPxZ4/Meta-ai-Bank-1.png'
            }
        ];
    } else if (notificationData.type === 'security') {
        notificationData.actions = [
            {
                action: 'secure-account',
                title: 'Secure Account',
                icon: 'https://i.postimg.cc/fThYPxZ4/Meta-ai-Bank-1.png'
            },
            {
                action: 'contact-support',
                title: 'Contact Support',
                icon: 'https://i.postimg.cc/fThYPxZ4/Meta-ai-Bank-1.png'
            }
        ];
    } else {
        notificationData.actions = [
            {
                action: 'open-app',
                title: 'Open App',
                icon: 'https://i.postimg.cc/fThYPxZ4/Meta-ai-Bank-1.png'
            }
        ];
    }
    
    event.waitUntil(
        self.registration.showNotification(notificationData.title, notificationData)
    );
});

// Notification click handling
self.addEventListener('notificationclick', function(event) {
    console.log('Service Worker: Notification clicked:', event.action);
    
    event.notification.close();
    
    let urlToOpen = '/';
    
    // Handle different notification actions
    switch (event.action) {
        case 'view-transaction':
            urlToOpen = '/?page=transactions';
            break;
        case 'secure-account':
            urlToOpen = '/?page=profile&action=security';
            break;
        case 'contact-support':
            urlToOpen = '/?page=support';
            break;
        case 'open-app':
        default:
            urlToOpen = '/';
            break;
    }
    
    // Open or focus the app
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            // Check if app is already open
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    client.navigate(urlToOpen);
                    return client.focus();
                }
            }
            
            // Open new window if app is not open
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});

// Background sync helper functions
async function syncPendingTransactions() {
    try {
        console.log('Service Worker: Syncing pending transactions');
        
        // Get pending transactions from IndexedDB or localStorage
        const pendingTransactions = await getPendingTransactions();
        
        for (const transaction of pendingTransactions) {
            try {
                // Simulate API call to sync transaction
                const response = await fetch('/api/transactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(transaction)
                });
                
                if (response.ok) {
                    // Remove from pending list if successful
                    await removePendingTransaction(transaction.id);
                    console.log('Service Worker: Transaction synced:', transaction.id);
                    
                    // Show success notification
                    self.registration.showNotification('Transaction Synced', {
                        body: `Transaction of ₹${transaction.amount} has been processed`,
                        icon: 'https://i.postimg.cc/fThYPxZ4/Meta-ai-Bank-1.png',
                        tag: 'transaction-sync'
                    });
                }
            } catch (error) {
                console.log('Service Worker: Failed to sync transaction:', transaction.id, error);
            }
        }
    } catch (error) {
        console.log('Service Worker: Background sync failed:', error);
    }
}

async function syncProfileUpdates() {
    try {
        console.log('Service Worker: Syncing profile updates');
        
        const pendingUpdates = await getPendingProfileUpdates();
        
        for (const update of pendingUpdates) {
            try {
                const response = await fetch('/api/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(update)
                });
                
                if (response.ok) {
                    await removePendingProfileUpdate(update.id);
                    console.log('Service Worker: Profile update synced:', update.id);
                }
            } catch (error) {
                console.log('Service Worker: Failed to sync profile update:', update.id, error);
            }
        }
    } catch (error) {
        console.log('Service Worker: Profile sync failed:', error);
    }
}

async function syncNotifications() {
    try {
        console.log('Service Worker: Syncing notifications');
        
        const response = await fetch('/api/notifications');
        if (response.ok) {
            const notifications = await response.json();
            
            // Store notifications for offline access
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put('/api/notifications', new Response(JSON.stringify(notifications)));
        }
    } catch (error) {
        console.log('Service Worker: Notification sync failed:', error);
    }
}

// IndexedDB/localStorage helper functions
function getPendingTransactions() {
    return new Promise((resolve) => {
        try {
            const pending = JSON.parse(localStorage.getItem('pendingTransactions') || '[]');
            resolve(pending);
        } catch (error) {
            console.log('Service Worker: Error getting pending transactions:', error);
            resolve([]);
        }
    });
}

function removePendingTransaction(transactionId) {
    return new Promise((resolve) => {
        try {
            const pending = JSON.parse(localStorage.getItem('pendingTransactions') || '[]');
            const updated = pending.filter(t => t.id !== transactionId);
            localStorage.setItem('pendingTransactions', JSON.stringify(updated));
            resolve();
        } catch (error) {
            console.log('Service Worker: Error removing pending transaction:', error);
            resolve();
        }
    });
}

function getPendingProfileUpdates() {
    return new Promise((resolve) => {
        try {
            const pending = JSON.parse(localStorage.getItem('pendingProfileUpdates') || '[]');
            resolve(pending);
        } catch (error) {
            console.log('Service Worker: Error getting pending profile updates:', error);
            resolve([]);
        }
    });
}

function removePendingProfileUpdate(updateId) {
    return new Promise((resolve) => {
        try {
            const pending = JSON.parse(localStorage.getItem('pendingProfileUpdates') || '[]');
            const updated = pending.filter(u => u.id !== updateId);
            localStorage.setItem('pendingProfileUpdates', JSON.stringify(updated));
            resolve();
        } catch (error) {
            console.log('Service Worker: Error removing pending profile update:', error);
            resolve();
        }
    });
}

// Handle periodic background sync
self.addEventListener('periodicsync', function(event) {
    console.log('Service Worker: Periodic sync triggered:', event.tag);
    
    if (event.tag === 'balance-update') {
        event.waitUntil(updateAccountBalance());
    } else if (event.tag === 'transaction-history') {
        event.waitUntil(updateTransactionHistory());
    }
});

async function updateAccountBalance() {
    try {
        const response = await fetch('/api/balance');
        if (response.ok) {
            const balanceData = await response.json();
            
            // Cache the updated balance
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put('/api/balance', new Response(JSON.stringify(balanceData)));
            
            console.log('Service Worker: Balance updated');
        }
    } catch (error) {
        console.log('Service Worker: Balance update failed:', error);
    }
}

async function updateTransactionHistory() {
    try {
        const response = await fetch('/api/transactions');
        if (response.ok) {
            const transactions = await response.json();
            
            // Cache the updated transaction history
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put('/api/transactions', new Response(JSON.stringify(transactions)));
            
            console.log('Service Worker: Transaction history updated');
        }
    } catch (error) {
        console.log('Service Worker: Transaction history update failed:', error);
    }
}

// Handle messages from main thread
self.addEventListener('message', function(event) {
    console.log('Service Worker: Message received:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    } else if (event.data && event.data.type === 'CACHE_TRANSACTION') {
        // Cache transaction for offline sync
        cacheTransactionForSync(event.data.transaction);
    } else if (event.data && event.data.type === 'CACHE_PROFILE_UPDATE') {
        // Cache profile update for offline sync
        cacheProfileUpdateForSync(event.data.update);
    } else if (event.data && event.data.type === 'CLEAR_CACHE') {
        // Clear specific cache
        clearSpecificCache(event.data.cacheName);
    }
});

function cacheTransactionForSync(transaction) {
    try {
        const pending = JSON.parse(localStorage.getItem('pendingTransactions') || '[]');
        pending.push({
            ...transaction,
            timestamp: Date.now(),
            synced: false
        });
        localStorage.setItem('pendingTransactions', JSON.stringify(pending));
        
        // Register background sync
        self.registration.sync.register('background-sync-transactions');
    } catch (error) {
        console.log('Service Worker: Error caching transaction for sync:', error);
    }
}

function cacheProfileUpdateForSync(update) {
    try {
        const pending = JSON.parse(localStorage.getItem('pendingProfileUpdates') || '[]');
        pending.push({
            ...update,
            timestamp: Date.now(),
            synced: false
        });
        localStorage.setItem('pendingProfileUpdates', JSON.stringify(pending));
        
        // Register background sync
        self.registration.sync.register('background-sync-profile');
    } catch (error) {
        console.log('Service Worker: Error caching profile update for sync:', error);
    }
}

async function clearSpecificCache(cacheName) {
    try {
        const deleted = await caches.delete(cacheName);
        console.log(`Service Worker: Cache ${cacheName} cleared:`, deleted);
    } catch (error) {
        console.log('Service Worker: Error clearing cache:', error);
    }
}

// Error handling
self.addEventListener('error', function(event) {
    console.error('Service Worker: Error occurred:', event.error);
});

self.addEventListener('unhandledrejection', function(event) {
    console.error('Service Worker: Unhandled promise rejection:', event.reason);
});

// Update notification
self.addEventListener('controllerchange', function(event) {
    console.log('Service Worker: Controller changed - new SW is now controlling the page');
});

console.log('Meta.ai Bank Service Worker v1.0.0 loaded successfully');
