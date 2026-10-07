const CACHE_NAME = "mi-moto-v1";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./estilo.css",
    "./app.js",
    "./manifest.json"
];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(ARCHIVOS);
            })
    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(respuesta => {

                return respuesta || fetch(event.request);

            })

    );

});