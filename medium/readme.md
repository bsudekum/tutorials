### Goal

Explore creating a rich and interactive mapping application with Mapbox.js

### Prerequisites: 
* A text editor. I prefer Sublime Text.
* A way to serve up files locally, [read more here](https://github.com/bsudekum/tutorials#serving-files-locally).

### [Demo of final product](http://bsudekum.github.io/tutorials/medium/)

### Intro

Mapbox.js is JavaScript library that allows developers to create rich mapping applications. TileMill creates the pretty tiles, Mapbox.js adds the interactivity like geolocation, markers and layer switching. If you have ever used Leaflet, getting started with Mapbox.js will be used because Mapbox.js is built on top of Leaflet. 

To start, make a new file called `index.html` and paste the following code:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset=utf-8 />
  <title>A simple map</title>
</head>
<body>
  <p>Hello world!</p>
</body>
</html>
```

You should now see a page with the text `Hello world!`. Next we need to load Mapbox.js. Mapbox.js can be loaded remotely or locally. Remotely is a bit easier because you do not need to worry about downloading any files. Simply add to the head of your document:

```html
<head>
  <meta charset=utf-8 />
  <title>A simple map</title>
  <link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.6/mapbox.css' rel='stylesheet' />
<script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.6/mapbox.js'></script>
</head>
```

Nothing should have changed when reloading the page. By default, a map is positioned on the page. To position it, simply add `<style>` tags to the head:

```html
<head>
  <meta charset=utf-8 />
  <title>A simple map</title>
  <link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.6/mapbox.css' rel='stylesheet' />
  <script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.6/mapbox.js'></script>
  <style>
  #body {
    margin: 0;
    padding: 0;
  }
  #map {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  </style>
</head>
```

This will ensure the maps takes up the whole page.

We'll also want to attach the map to a div. This can be done by adding `<div id='map'></div>` between the `<body>` tags.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset=utf-8 />
  <title>A simple map</title>
  <link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.6/mapbox.css' rel='stylesheet' />
  <script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.6/mapbox.js'></script>
  <style>
  #body {
    margin: 0;
    padding: 0;
  }
  #map {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  </style>
</head>
<body>
  <div id='map'></div>
</body>
</html>
```

Finally, it's time to get to add the map to the page via Javascript. Javascript can be embedded directly into HTML via the `<script>` tags. Add `<script></script>` tags after the closing `</body>` tag.

Within the tags, we'll begin by setting the access token. The access token is a way to tie the map on this page to your account.


```javascript
L.mapbox.accessToken = 'pk.eyJ1IjoiYm9iYnlzdWQiLCJhIjoiTi16MElIUSJ9.Clrqck--7WmHeqqvtFdYig';
```

Next, we'll start the map and set the initial location and zoom level. 

```javascript
var map = L.mapbox.map('map', 'examples.map-i86nkdio')
map.setView([40, -74.50], 9);
```

Here, we’re making a variable called `map`. `L.mapbox.map()` takes two arguments.  The first is the id of the div to attach it to, map - `<div id='map'></div>`. The second is map id. Mapids can be created on mapbox.com and represent your custom map. Then we’re setting the view of the variable map with the setView function. It takes two arguments, an array of latitude longitude and a zoom level. A zoom level represents how far your map is zoomed in - 0 can fit the world world on the screen, 19 you would be able to see the top of a roof clearly. Next we'll add marker:

```javascript
var myMarker = L.marker([40, -74.50]);
myMarker.bindPopup('<p>Hello this is a marker with HTML inside of it!</p><img src="http://remycarreiro.com/wp-content/uploads/2015/01/murs-rem.jpg" alt="Bill Murray" width="250px"/>');
myMarker.addTo(map);
```

Creating a simple marker is as easy as `L.marker([latitude, longitude]);`. Here, I'm storing the marker in a variable `myMarker`. Once created, I added text and and an image to `myMarker` using the `bindPopup` function. This function takes one argument which is the text in the popup. As you can see, this text can be HTML which allows for very cool customization. Finally, I add the `myMarker` to the map using the `addTo()` function which takes one argument, the name of the map object. 

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
