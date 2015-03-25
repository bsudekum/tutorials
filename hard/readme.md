### Goal

Explore creating a rich and interactive mapping application with Mapbox.js

### Prerequisites: 
* A text editor. I prefer [Sublime Text](http://www.sublimetext.com/).
* A working knowledge of JavaScript and/or the tenacity to learn it. 

### Intro

Mapbox.js is JavaScript library that allows developers to create rich mapping applications. TileMill creates the pretty tiles, Mapbox.js adds the interactivity like geolocation, markers and layer switching. If you have ever used Leaflet, getting started with Mapbox.js will be used because Mapbox.js is built on top of Leaflet. Mapbox.js makes it easy to use the Mapbox ecosystem of tools.

As a refresher, let’s look at how a simple map is created with Mapbox.js 
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset=utf-8 />
  <title>A simple map</title>
  <script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.6/mapbox.js'></script>
  <link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.6/mapbox.css' rel='stylesheet' />
  <style>
  #body {
    margin: 0;
    padding: 0;
  }
  #map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  </style>
</head>
<body>
  <div id='map'></div>
  <script>
  // Set the access token
  L.mapbox.accessToken = 'pk.eyJ1IjoiYm9iYnlzdWQiLCJhIjoiTi16MElIUSJ9.Clrqck--7WmHeqqvtFdYig';

   // start the map and set the initial view
  var map = L.mapbox.map('map', 'examples.map-i86nkdio');
  map.setView([40, -74.50], 9);

  // Create a marker
  var myMarker = L.marker([40, -74.50]);
  myMarker.bindPopup('<p>Hello this is a marker with HTML inside of it!</p><img src="http://remycarreiro.com/wp-content/uploads/2015/01/murs-rem.jpg" alt="Bill Murray" width="250px"/>');
  myMarker.addTo(map);

  </script>
</body>
</html>
```


This will render a map that looks like this. HTML is made up of a series of open and closing tags like `<head>` (opening)  `</head>` (closing). Data goes between these tags. In the head, metadata data for a page is loaded. The title is set, and also Mapbox.js is loaded. Both a .js file and .css file are need for Mapbox.js to work properly.

```html
<script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.6/mapbox.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.6/mapbox.css' rel='stylesheet' /> 
```

Also, we set basic styling for the map in the head. Between the `<style>` the tags, css styling is applied to make the map fill up the entire screen. 

In between the `<body>` a map div is created to attach the map to. Notice, the id is 'map'. With Mapbox.js you attached the map object to an id and not a class.

The final action that occurs on this page is instantiating the map. 

```javascript
L.mapbox.accessToken = 'pk.eyJ1IjoiYm9iYnlzdWQiLCJhIjoiTi16MElIUSJ9.Clrqck--7WmHeqqvtFdYig';
```

Don’t worry too much about this line. Here, we’re setting the access token. This is used for counting the number of times I load a Mapbox map.

```javascript
var map = L.mapbox.map('map', 'examples.map-i86nkdio')
map.setView([40, -74.50], 9);
```

Here, we’re making a variable called map. L.mapbox.map takes two arguments.  The first is the id of the div to attach it to, map - <div id='map'></div>. The second is map id. Mapids can be created on mapbox.com and represent your custom map. Then we’re setting the view of the variable map with the setView function. It takes two arguments, an array of latitude longitude and a zoom level. A zoom level represents how far your map is zoomed in. 

```javascript
var myMarker = L.marker([40, -74.50]);
myMarker.bindPopup('<p>Hello this is a marker with HTML inside of it!</p><img src="http://remycarreiro.com/wp-content/uploads/2015/01/murs-rem.jpg" alt="Bill Murray" width="250px"/>');
myMarker.addTo(map);
```

Creating a simple marker is as easy as L.marker([lat, lng]);. Once created, I added text and and an image using the bindPopup function. This function takes one argument which is the text in the popup. As you can see, this text can be HTML which allows for very cool customization. Finally, I add the myMarker to the map using the addTo function which takes one argument, the name of the map object. 

### Test

Create a custom map and add a marker for every place you have visited around the world. Add a popup for each location with either text, an image or a video embed, at least 1 of each type. The map should load with all markers in view and should fill the entire page. 

### Notes

Mapbox.js allows for chaining. This means you can chain each function together using a period and ending with a semicolon:

```javascript
L.marker([40, -74.50])
    .bindPopup('<p>Hello world!</p>')
    .openPopup()
    .addTo(map);
```

If you never need to call that marker variable again, you do not need to set it. Each function can be ‘chained’ one after another making it more readable if you need to add many markers.
