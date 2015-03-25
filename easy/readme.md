### Goal
Create a simple stylized map that is sharable on the internet.


### Prerequisites
* Download and install [TileMill](https://www.mapbox.com/tilemill/)
* [NYC Stop and Frisk data from 2011](https://cloudup.com/files/inqb2scFJ6H/download)

### Steps
1. Open TileMill. The initial screen is the project pane where all your map project will live.
2. Create a new project by pressing “New Project” in the upper right hand corner.
3. Name the project “Stop_and_Frisk”. Accept the default settings.
4. ![](https://cldup.com/aiSVP6cDYK.png)
5. This will create an empty project. Click on the map project to open it.
6. ![](https://cldup.com/aiSVP6cDYK.png)

The TileMill UI may seem confusiing now, but it is actually quite simple. On the right is the editor. The editor is used to style the map on the left. To save changes made in editor, simple press command + s on a mac or control + s on a pc.
Maps are styled via a sudo-language called CartoCSS. If you have ever styled a webpage with HMTL and CSS, this should be familiar. Let’s break it down how the styling works:

```css
#countries {
    polygon-fill: red;
}
```

Here, `#countries` is the selector. Using this notation, we’re able to grab the ‘countries’ layer and styled it. Notice how the layer ‘countries’ is both the name of layer in the layer pane, and also referenced in the editor panel.

The curly braces comes next. The curly braces simple mean, given the layer, do all the style between the open and closing braces.

Inside of curly braces is the style. Here, we’re simply applling the style ‘polygon-fill: red;’ to the layer ‘#countries’. For more information on styling with CartoCSS, view the documentation here:mapbox.com/tilemill/docs/manual/carto
