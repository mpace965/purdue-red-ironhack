# purdue-red-ironhack

## v0.1 Release Notes

v0.1 of the app, submitted for judging on 10/8/2015 is mostly a proof of concept, and the result of actually applying the learning I did with the Angular and d3.js frameworks. The concept behind the home page is that the app asks the user when the latest they'd like to leave is. When the app is finished, it will scan through all of the days in the range the user specifies, and choose the best day for them to go, taking into account different weights from the data sets.

However, what happens now is the proof of concept. The trip page that the user is taken to displays the weather data and crime data of the days surrounding the selected day. The graph code is adapted from the tutorial found [here](http://bost.ocks.org/mike/bar/). I am not sure whether or not I will use these graphs in the final product, but this tutorial was definitely a worthwhile learning experience.

### Running the App

Running the app should be as simple as cloning this repository and opening index.html.

## Objective

The goal of this app is to take its users from West Lafayette to Chicago with a happy face!

It takes into account many different factors to choose the best time within the next year for your trip to Chicago.

### Data

To accomplish this task, many different data sets were used. [csvkit](http://csvkit.readthedocs.org/en/0.9.1/index.html) was used to manipulate the data sets.

#### [Climate Data Online](http://www.ncdc.noaa.gov/cdo-web/orderstatus?id=614767&email=Matthew.dp.96@gmail.com) Daily Forecast from 2010-2015

Daily weather data from January 1st, 2010 to October 4th, 2015 was requested from the site. csvkit was used to manipulate the data including replacing the "-9999" value for representing uncollected data with empty values, representing null. csvkit was also used to take the average precipitation, snowfall, snow depth, and temperature observed. The provided units (metric) were then converted to imperial units, to match the end user's demographic. csvkit was then used to produce the resulting file, weather.min.json.

The data is structured in the following format.

```
{
  "mmdd" {
    "DATE": "mmdd",
    "SNWD": "1.601146176",
    "SNOW": "0.4772511217",
    "TOBS": "19.7073170732",
    "AWND": "13.3222204445"
  }
}
```

* `mm`: zero padded month
* `dd`: zero padded days
* `SNWD`: snow depth in inches
* `SNOW`: snowfall in inches
* `TOBS`: Temperature observed in degrees Fahrenheit
* `AWND`: Average wind speed in miles per hour.

Currently missing from the data set is precipitation. I accidentally forgot to export this column from the original data set, but I'll do some more work with csvkit to get it included. There is a bit of redundancy involving the date field, but it allowed for easy lookup.

The official documentation for this data set can be found [here](http://www1.ncdc.noaa.gov/pub/data/cdo/documentation/GHCND_documentation.pdf).

#### [City of Chicago Crime Rates](https://data.cityofchicago.org/Public-Safety/Crimes-2010-2014/82c5-g7da) from 2014

csvkit was used to create a histogram that represented how many crimes were committed each day. The resulting file is crime-2014.min.json. The general trend of this data was a yearly low in February, and a yearly high in June or July, with a general downwards trend over the years. The year 2014 was chosen as a representative year, and will be used as a weight when determining the best time to travel to Chicago.

The data is structured in the following format.

```
{
  "2014-mm-dd" {
    "date": "2014-mm-dd",
    "count": 256
  }
}
```

Where `mm` is the zero padded month, `dd` is the zero padded day, and `count` is the number of crimes reported that day. Again, there's a bit of redundancy in the date field.

## Web Technologies

* Development
  * Node
  * Bower
* Frameworks
  * Angular
  * Angular Material
  * d3.js
