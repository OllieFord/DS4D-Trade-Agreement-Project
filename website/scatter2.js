
var margin = { top: 50, right: 420, bottom: 50, left: 30 },
    outerWidth = 1200,
    outerHeight = 500,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]).nice();

var y = d3.scale.linear()
    .range([height, 0]).nice();

var xCat = "x",
    yCat = "y",
    rCat = 4,
    colorCat = "type",
    name = 'Countries',
    region = 'Region';
    

d3.csv("Chap_clust.csv", function(data) {
  data.forEach(function(d) {
    d.x = +d.x;
    d.y = +d.y;
    d.hue = +d.hue;
    d.year = +d.year;
    d.art_no = +d.art_no;
    
  });

  var xMax = d3.max(data, function(d) { return d[xCat]; }) * 1.3,
      xMin = d3.min(data, function(d) { return d[xCat]; }) * 1.3,
      xMin = xMin > 0 ? 0 : xMin,
      yMax = d3.max(data, function(d) { return d[yCat]; }) * 1.3,
      yMin = d3.min(data, function(d) { return d[yCat]; }) * 1.3,
      yMin = yMin > 0 ? 0 : yMin;

  x.domain([xMin, xMax]);
  y.domain([yMin, yMax]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");
//       .tickSize(-height);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
//       .tickSize(-width);

//   var color = d3.scale.category10();
    
  var color = d3.scale.ordinal()
      .range(["#cc5d43","#6493cc","#b2953e","#9b63c7","#60a75c","#c65c8a"]);

  var tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function(d) {
        return region + ": " + d.region + "<br>" + name + ": " + d.name + "<br>"+ "Year" +": " + d.year;
      });

  var zoomBeh = d3.behavior.zoom()
      .x(x)
      .y(y)
      .scaleExtent([0, 400])
      .on("zoom", zoom);

  var svg = d3.select("#scatter2")
    .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoomBeh);

  svg.call(tip);

  svg.append("rect")
      .attr("width", width)
      .attr("height", height);

  svg.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .classed("label", true)
      .attr("x", width)
      .attr("y", margin.bottom - 10)
      .style("text-anchor", "end")
      .text(xCat);

  svg.append("g")
      .classed("y axis", true)
      .call(yAxis)
    .append("text")
      .classed("label", true)
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(yCat);

  var objects = svg.append("svg")
      .classed("objects", true)
      .attr("width", width)
      .attr("height", height);

  objects.append("svg:line")
      .classed("axisLine hAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", width)
      .attr("y2", 0)
      .attr("transform", "translate(0," + height + ")");

  objects.append("svg:line")
      .classed("axisLine vAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height);

  objects.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .classed("dot", true)
      .attr("r", rCat)
      .attr("transform", transform)
      .style("fill", function(d) { return color(d[colorCat]); })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .classed("legend", true)
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("circle")
      .attr("r", 3.5)
      .attr("cx", width + 20)
      .attr("fill", color);

  legend.append("text")
      .attr("x", width + 26)
      .attr("dy", ".35em")
      .text(function(d) { return d; });

  d3.select("input").on("click", change);

//   function change() {
//     xCat = "Carbs";
//     xMax = d3.max(data, function(d) { return d[xCat]; });
//     xMin = d3.min(data, function(d) { return d[xCat]; });

//     zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));

//     var svg = d3.select("#scatter").transition();

//     svg.select(".x.axis").duration(750).call(xAxis).select(".label").text(xCat);

//     objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
//   }

  function zoom() {
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);

    svg.selectAll(".dot")
        .attr("transform", transform);
  }

  function transform(d) {
    return "translate(" + x(d[xCat]) + "," + y(d[yCat]) + ")";
  }
});