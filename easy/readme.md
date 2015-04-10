### Goal
Create a simple stylized map that is sharable on the internet.


### Prerequisites
* Download and install [TileMill](https://www.mapbox.com/tilemill/)
* [NYC Stop and Frisk data from 2011](https://cloudup.com/files/inqb2scFJ6H/download)


### Intro
In this tutorial, we're going to be using TileMill to create a custom map. Think of TileMill as Photoshop for maps. It allows you to ingest geo data and export interactive maps. In this example we'll be visualizing NYPD Stop and Frisk data from 2011. Begin by downloading and opening TileMill.

The initial screen is the project pane where all your map project will live.Create a new project by clicking “New Project” in the upper right hand corner. Name the project “Stop_and_Frisk”. Accept the default settings.

![](https://cldup.com/aiSVP6cDYK.png)

This will create an empty project. Click on the map project to open it.

![](https://cldup.com/aiSVP6cDYK.png)

The TileMill UI may seem confusing now, but it is actually quite simple. On the right is the editor. The editor is used to style the map on the left. To save changes made in editor, simple press command + s on a mac or control + s on a pc.

Maps are styled via a sudo-language called CartoCSS. If you have ever styled a webpage with HMTL and CSS, this should be familiar. Let’s break it down how the styling works:

```css
#countries {
    polygon-fill: red;
}
```

Here, `#countries` is the selector. Using this notation, we’re able to grab the ‘countries’ layer and style it. Notice how the layer ‘countries’ is both the name of layer in the layer pane, and also referenced in the editor panel. 

The curly braces comes next. The curly braces simple mean, given the layer, do all the style between the open and closing braces.

Inside of curly braces is the style. Here, we’re simply applying the style ‘polygon-fill: red;’ to the layer ‘#countries’. For more information on styling with CartoCSS, [view the documentation here](mapbox.com/tilemill/docs/manual/carto). 

Here are a couple more snippets of code on how different features can be styled:

```css
#dataLayerWithPoints {
  marker-width: 10px;
  marker-fill: #e561ff;
  marker-opacity:.8;
  marker-line-opacity:0;
  marker-allow-overlap:true;
}
```

This would produce a purple dot:

![](https://cldup.com/hDqQCJR22R.png)

```css
#LineDataLayer {
    line-width: 4px;
    line-color: red;
}
```

This would style a red line line 4 pixels wide.

Now let's move onto styling data. Download the [NYPD Stop and Frisk dataset](https://cloudup.com/files/inqb2scFJ6H/download). Unzip the file and move it to a known location. In the Stop and Frisk project, click layers tab in the lower right corner and then click `+ Add layer`. This will bring up the import data modal. Click the browse button and browse to the `stop_frisk_2011_by_block` file. Give the file an `id` of `stopfrisk2011byblock`. Your screen should look like:

![](https://cldup.com/jRMcGvjyTj.png)

Click `save`. Let's apply an simple style so we can see the data. Apply the following style:
```css
Map {
  background-color: #c0e3e9;
}

#stopfrisk2011byblock {
  polygon-fill:green;
}
```

Your UI should look like: 

![](https://cldup.com/nZT50xPZo7.png)


TileMill allows you to style discrete portions of data. This will be useful in this example since we're creating a choropleth map. You can do so with the following pattern:

```css
#layer [fieldName < number] {
    polygon-fill: red;
}
```

You can view the field name by clicking `attribute` button in the `Layer` tab:

![](https://cldup.com/bdg0vqoWpQ.png)

Clicking this will bring up the attribute table for this dataset:

![](https://cldup.com/fsD0f-afpX.png)

We'll be styling the `PNTCNT` field all the way to the right. By doing so, we can show were more stop and frisks have occurred in a meaningful way. Copy the following style:

```css
#stopfrisk2011byblock[PNTCNT <= 34] {
  polygon-fill:#ffffb2;
}

#stopfrisk2011byblock[PNTCNT > 34][PNTCNT <= 130] {
  polygon-fill:#fecc5c;
}

#stopfrisk2011byblock[PNTCNT > 130][PNTCNT <= 366] {
  polygon-fill:#fd8d3c;
}

#stopfrisk2011byblock[PNTCNT > 366][PNTCNT <= 744] {
  polygon-fill:#f03b20;
}

#stopfrisk2011byblock[PNTCNT > 724][PNTCNT <= 1872] {
  polygon-fill:#bd0026;
}
```

Your scren should now look more like a meaningful map:
![](https://cldup.com/zEGk6KH1NH.png)

TileMill allows for interactivity via mouseover. We can add this by clicking the finger button in the lower left corner and then the `Teaser` tab. Choose the `stopfrisk2011byblock` at the bottom. Then paste the following code:

```
Stops on this block: {{{PNTCNT}}}
```

Again, we're working with a specific field within this data, `PNTCNT`. Any time a user hovers over the layer `stopfrisk2011byblock`, the value from the the field `PNTCNT` will be placed in the upper right corner of the map. Your screen should look like:

![](https://cldup.com/TVZdtpreic.png)

Next, we'll need to a legend. Again, click the finger icon in the lower right hand corner and then click the `Legend` tab. Legends can be made up HTML and CSS. Copy the following code:

```html
<div class='my-legend'>
  <div class='legend-title' style='text-align: left; margin-bottom: 8px; font-weight: bold; font-size: 90%;'>Number of stops per block</div>
  <div class='legend-scale'>
    <ul class='legend-labels'>
      <li style="display: block;float: left;width: 45px;margin-bottom: 6px;text-align: center;font-size: 80%;list-style: none;"><span style='background:#ffffb2;display: block;   float: left;   height: 15px;   width: 50px;'></span>
        < 34</li>
          <li style="display: block;float: left;width: 45px;margin-bottom: 6px;text-align: center;font-size: 80%;list-style: none;"><span style='background:#fecc5c;display: block;   float: left;   height: 15px;   width: 50px;'></span>34 - 130</li>
          <li style="display: block;float: left;width: 45px;margin-bottom: 6px;text-align: center;font-size: 80%;list-style: none;"><span style='background:#fd8d3c;display: block;   float: left;   height: 15px;   width: 50px;'></span>130 - 366</li>
          <li style="display: block;float: left;width: 45px;margin-bottom: 6px;text-align: center;font-size: 80%;list-style: none;"><span style='background:#f03b20;display: block;   float: left;   height: 15px;   width: 50px;'></span>366 - 744</li>
          <li style="display: block;float: left;width: 45px;margin-bottom: 6px;text-align: center;font-size: 80%;list-style: none;"><span style='background:#bd0026;display: block;   float: left;   height: 15px;   width: 50px;'></span>> 724</li>
    </ul>
  </div>
<br>
<br>
<br>
  <div class='legend-source' style='font-size: 10%;color: #999;clear: both;'>Source: John Keefe</div>
  <div class='legend-source' style='font-size: 10px;color: #999;clear: both;'>Dots mark stops where a gun was found.</div>
</div>

```

At this point, your UI should look like:

![](https://cldup.com/3a-3vhV1p0.png)

Import the `nypd_stopfrisk2011_gunstops.shp` file and give it the following style: 

```css
#nypdstopfrisk2011gun {
  marker-height:[STOPCNT] * 4;
  marker-fill: #e980ef;
  marker-line-width:0;
}
```

Notice here `marker-height:[STOPCNT] * 4;`. This allows us to dynamically style a layer. Here, able to vary the width of the marker by the field `STOPCNT`. 

Now it's time to export the map for the web. TileMill exports interactive maps as a filetype called `mbtiles`. Click the `Export` button in the upper right corner and then the `mbtiles` button. Give the map a name and description if you'd like. Set the zoom range from 0 - 14. This will keep the export time shorter. We'll also want to restrict the bounding box of the map. You can zoom to the NYC or paste this: `-74.2631,40.4934,-73.6932,40.9161`. Also change the default center to `-73.9828,40.7315,13`. Finally click export.

While it is exporting, create an account on mapbox.com if you have not done so already and head to [mapbox.com/uploads](https://www.mapbox.com/uploads/). Once the export is complete, save the mbtiles file somewhere. Click the `Select File` button from the mapbox.com/uploads UI. Select the mbtiles project. Your map should now be live!

You can embed the map on your site with a simple iframe, simple change the `src` to point at your map:

```html
<iframe width="100%" height="500px" frameBorder="0" src="https://a.tiles.mapbox.com/v4/bobbysud.16frms4i.html?access_token=pk.eyJ1IjoiYm9iYnlzdWQiLCJhIjoiTi16MElIUSJ9.Clrqck--7WmHeqqvtFdYig"></iframe>
```

### Test
Import and style 3 custom datasets. The map should contain point, line and polygon sources. A tooltip should be enabled on one source. Upload the final map to mapbox.com.


