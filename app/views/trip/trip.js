app.controller('TripController', ['$scope', '$routeParams', function($scope, $routeParams){
  $scope.leaveDate = new Date($routeParams.year, $routeParams.month, $routeParams.day);

  weatherChart($scope.leaveDate);
  crimeChart($scope.leaveDate);
}]);

function crimeChart(date) {
  var margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var chart = d3.select(".crime-chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json("/app/data/crime-2014.min.json", function(error, json) {
    var data = [];
    var loopDate = date;
    loopDate = loopDate.addDays(-3); //start from 3 days past and go forward

    for (i = 0; i < 7; i++) {
      loopDate = loopDate.addDays(1);
      console.log(loopDate);
      var key = getCrimeKey(loopDate);
      data.push({date: getPrettyDate(loopDate), count: json[key].count});
    }

    x.domain(data.map(function (d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.count; })]);

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Number of Crimes Reported");

    chart.selectAll(".crime-bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "crime-bar")
        .attr("x", function(d) { return x(d.date); })
        .attr("y", function(d) { return y(d.count); })
        .attr("height", function(d) { return height - y(d.count); })
        .attr("width", x.rangeBand());
  });
}

function weatherChart(date) {
  var margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var chart = d3.select(".weather-chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json("/app/data/weather.min.json", function(error, json) {
    var data = [];
    var loopDate = date;
    loopDate = loopDate.addDays(-3); //start from 3 days past and go forward

    for (i = 0; i < 7; i++) {
      loopDate = loopDate.addDays(1);
      console.log(loopDate);
      var key = getWeatherKey(loopDate);
      data.push({date: getPrettyDate(loopDate), temp: Math.round(json[key].TOBS)});
    }

    x.domain(data.map(function (d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.temp; })]);

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temperature (°F)");

    chart.selectAll(".weather-bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "weather-bar")
        .attr("x", function(d) { return x(d.date); })
        .attr("y", function(d) { return y(d.temp); })
        .attr("height", function(d) { return height - y(d.temp); })
        .attr("width", x.rangeBand());
  });
}

//setDate directly mutates the object, best to avoid that
//http://stackoverflow.com/questions/563406/add-days-to-datetime
Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getPrettyDate(date) {
  return "" + (date.getMonth() + 1) + "/" + date.getDate();
}

function getCrimeKey(date) {
  var month = "" + (date.getMonth() + 1);
  var day = "" + date.getDate();
  var pad = "00";
  var paddedMonth = pad.substring(0, pad.length - month.length) + month;
  var paddedDay = pad.substring(0, pad.length - day.length) + day;

  return "2014-" + paddedMonth + "-" + paddedDay;
}

function getWeatherKey(date) {
  var month = "" + (date.getMonth() + 1);
  var day = "" + date.getDate();
  var pad = "00";
  var paddedMonth = pad.substring(0, pad.length - month.length) + month;
  var paddedDay = pad.substring(0, pad.length - day.length) + day;

  return paddedMonth + paddedDay;
}
