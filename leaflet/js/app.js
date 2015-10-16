/*
    script file for index.html
    dependencies: leaflet, jquery

    Open Street Maps tile layer URL template:
    http://{s}.tile.osm.org/{z}/{x}/{y}.png

    attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
*/
$(function() {

    function createMap(loc, zoom) {
        'use strict';

        // set view is a latittude number and longitude number and zoom level
        var map = L.map('map').setView(loc, zoom);

        // every layer should have a .addTo(map);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.circleMarker(loc, zoom).addTo(map).bindPopup('Hello');

    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            createMap([pos.coords.latitude, pos.coords.longitude], 15);
        });
    } else {
        createMap([47.6097, -122.3331], 12);
    }
});