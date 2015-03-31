### Goal

Create a rich mapping application with many different functions and events.

### Prerequisites
* A text editor. I prefer Sublime Text.
* A way to serve up files locally, [read more here](https://github.com/bsudekum/tutorials#serving-files-locally).

### [Demo of final product](http://bsudekum.github.io/tutorials/hard/)

### Intro

In this tutorial, I’m going to go through a variety of function and events to give you a reference for future reusable code. Think of this as a ‘kitchen sink’ tutorial. 

For this tutorial, I've broken the project up into 3 different files: `index.html`, `site.css` and `site.js`. I did this to make it more manageable - having one HTML file with all the HTML, CSS and Javascript can get cumbersome. 

Let's start by creating the `index.html` file.

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset=utf-8 />
  <title>Kitchen Sink Example</title>
  <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
  <script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.6/mapbox.js'></script>
  <link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.6/mapbox.css' rel='stylesheet' />
  <link rel='stylesheet' href='site.css'>
</head>

<body>
  <div id='map'></div>
  <script src='https://code.jquery.com/jquery-2.1.3.min.js'></script>
  <script src='site.js'></script>
</body>

</html>
```

Notice how it references the external libraries and also local/relative files. The first local file that is referenced is `site.css`, let's create that. It contains:

```css
body {
  margin: 0;
  padding: 0;
}

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
```

Nothing fancy, just setup the map by giving it a position and size. Next, we can begin with the Javascript.

```javascript
L.mapbox.accessToken = 'pk.eyJ1IjoiYm9iYnlzdWQiLCJhIjoiTi16MElIUSJ9.Clrqck--7WmHeqqvtFdYig';
var map = L.mapbox.map('map').setView([38.8922, -77.0348], 14);
```

Create the map by first setting the access token. When starting the map on the next line, I am not passing in a map. This is because the mapid is added when adding the layer toggle. 

```javascript
L.control.layers({
    'Base Map': L.mapbox.tileLayer('bobbysud.lff26a2e').addTo(map),
    'Satellite Map': L.mapbox.tileLayer('bobbysud.lejdhfmk')
}).addTo(map);
```

This adds a layer toggle to the map. Since we did not pass in a map idea with `L.mapbox.map('map')`, I added it to the map here. `L.control.layers` takes two arguments where the first argument are baselayers and the second argument is overlays.

```javascript
var userLocationMarker = L.marker();
var mtRushmoreMarker = L.marker([43.879102, -103.459067], {
    draggable: true
}).addTo(map);
```

Next, the markers are added to map. `userLocationMarker` is added to the map without any coordinates because we do not yet know the coordinates of the user. It will be set once the users location is found. Notice the second argument on the `mtRushmoreMarker` variable, this is where options can be set. You can make a marker draggable by setting `draggable: true`.

```javascript
var route = L.layerGroup().addTo(map);
```

The route layerGroup will be used to store the route from the users location to Mt. Rushmore. I chose to store it as a layerGroup so I can easily clear the layer each time a new route is calculated.

```javascript
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({
    setView: true,
    maxZoom: 16
});

function onLocationFound(e) {
    userLocationMarker.setLatLng(e.latlng).addTo(map)
        .bindPopup('<button id="get-directions">Get Directions to Mt. Rushmore.</button>').openPopup();

    $('#get-directions').click(function() {
        var from = [userLocationMarker.getLatLng().lat, userLocationMarker.getLatLng().lng];
        var to = [mtRushmoreMarker.getLatLng().lat, mtRushmoreMarker.getLatLng().lng];
        getDirections(from, to);
    });
}

function onLocationError(e) {
    alert(e.message);
}
```

Getting the users location is easy with Mapbox.js. `map.locate()` starts the process. `map.on('locationfound', onLocationFound);` and `map.on('locationerror', onLocationError);` handle success and error events. An error event can occur when the user denies access or there was an issue in finding the location. Once the user is found, a marker with a popup is added, prompting the user to click a button. 

```javascript
$('#get-directions').click(function() {
    var from = [userLocationMarker.getLatLng().lat, userLocationMarker.getLatLng().lng];
    var to = [mtRushmoreMarker.getLatLng().lat, mtRushmoreMarker.getLatLng().lng];
    getDirections(from, to);
});
```

The `.click` function allows us to listen for click events on the button. If the user clicks the button, the `userLocationMarker` and the `mtRushmoreMarker`’s location is retreived by the `getLatLng()` function. Then the custom `getDirections()` function  is called with these two locations. 

```javascript
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
```

`getDirections()` take two arguemtns both of with are arrays. The first is the from location, and the second is the to location. Within the function, an ajax request is made. An ajax request allows you to get data from an external location, in this case a directions api request is made. If the request is successful, everything in the success area runs:

```javascript
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
```

First the route layer is cleared. This needs to happen so we don’t keep adding new routes to the map. Next, Mapbox direction api returns geojson. This allows us to directly add a geojson layer via the L.geoJson function. Instead of adding the layer to the map directly, I add it to the route layer, which is already added to the map. Once it’s been added, We can zoom comfortable to the area using the fitBounds function. Finally, I set the popup of text and open it with `openPopup()`.
