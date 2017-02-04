
const CACHE_NAME = "zalate-v1"
const CACHE_URLS = ["/offline/view.html", "/offline/style.css", "/offline/map.png"]

self.addEventListener("install", function(evt){
	caches.open(CACHE_NAME).then(function(cache){
		return cache.addAll(CACHE_URLS)
	})
})

self.addEventListener("fetch", function(evt){
	evt.respondWith(caches.match(evt.request).then(function(response){
		if (response) {
			return response
		}
		return fetch(evt.request)
	}).catch(function(error){
		if (evt.request.mode == "navigate") {
			return caches.match("/offline/view.html")
		}
	}))
})


self.addEventListener("active",function(evt){
	evt.waitUntil(caches.keys().then(function(cache_names){
		return Promise.all(cache_names.map(function(cache_names){
			if (CACHE_NAME !== cache_name) {
				return caches.delete(cache_name)
			}
		}))
	}))
})
