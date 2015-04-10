L.mapbox.accessToken = 'pk.eyJ1IjoiYm9iYnlzdWQiLCJhIjoiTi16MElIUSJ9.Clrqck--7WmHeqqvtFdYig';
var map = L.mapbox.map('map').setView([38.8922, -77.0348], 14);

L.control.layers({
    'Base Map': L.mapbox.tileLayer('bobbysud.lff26a2e').addTo(map),
    'Satellite Map': L.mapbox.tileLayer('bobbysud.lejdhfmk')
}).addTo(map);

var userLocationMarker = L.marker();
var mtRushmoreMarker = L.marker([43.879102, -103.459067], {
    draggable: true
}).addTo(map);
var route = L.layerGroup().addTo(map);

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({
    setView: true,
    maxZoom: 16
});

mtRushmoreMarker.on('dragend', function(e) {
    var from = [userLocationMarker.getLatLng().lat, userLocationMarker.getLatLng().lng];
    var to = [mtRushmoreMarker.getLatLng().lat, mtRushmoreMarker.getLatLng().lng];
    getDirections(from, to);
});

function getDirections(from, to) {
    $.ajax({
        url: 'https://api.tiles.mapbox.com/v4/directions/mapbox.driving/' + from[1] + ',' + from[0] + ';' + to[1] + ',' + to[0] + '.json?instructions=html&geometry=polyline&access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q&geometry=geojson',
        type: 'GET',
        success: function(data) {

            route.clearLayers();
            var geojson = L.geoJson(data.routes[0].geometry, {
                style: function(feature) {
                    return {
                        color: 'orange'
                    };
                }
            }).addTo(route);
            map.fitBounds(geojson.getBounds());

            mtRushmoreMarker
                .bindPopup('Drag the marker to get directions to a new place!')
                .openPopup();

        },
        error: function(e) {
            console.log(e);
        }
    });
}

function onLocationFound(e) {
    userLocationMarker.setLatLng(e.latlng).addTo(map)
        .bindPopup('<button id="get-directions">Get Directions to Mt. Rushmore.</button>')
        .openPopup();

    $('#get-directions').click(function() {
        var from = [userLocationMarker.getLatLng().lat, userLocationMarker.getLatLng().lng];
        var to = [mtRushmoreMarker.getLatLng().lat, mtRushmoreMarker.getLatLng().lng];
        getDirections(from, to);
    });
}

function onLocationError() {
    alert('Error finding your location');

    userLocationMarker.setLatLng([38.8922, -77.0348]).addTo(map)
        .bindPopup('<button id="get-directions">Get Directions to Mt. Rushmore.</button>')
        .openPopup();

    $('#get-directions').click(function() {
        var from = [38.8922, -77.0348];
        var to = [mtRushmoreMarker.getLatLng().lat, mtRushmoreMarker.getLatLng().lng];
        getDirections(from, to);
    });
}