    var lng = 0;
    var lat = 0;

    var long = 0;
    var lati = 0;

    mapboxgl.accessToken = 'pk.eyJ1IjoiYmFzaG8xMzM3IiwiYSI6ImNqOG9nNWowaTAzNWczM3JzMmlkZTk3YjUifQ.N122SiHsRs9V1aLIsANoEA';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: "mapbox://styles/basho1337/cjd08y4tj1bik2sqqjfhh6ce4", // stylesheet location
        center: [lng, lat], // starting position [longitude, latitude]
        zoom: 1 // starting zoom
    });
    map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
    }));
    map.addControl(new mapboxgl.FullscreenControl());
    var slider = document.getElementById('slider');
    var sliderValue = document.getElementById('slider-value');

    map.on('click', function(e){
        long = e.lngLat.lng;
        lati = e.lngLat.lat;
        document.getElementById('info').innerHTML = "lng= " + long + "</br>" + "lat= " + lati
    });

    map.loadImage('/images/markericon.png', function(error, image){
        if (error) throw error;
        map.addImage('markerr', image);
    });





