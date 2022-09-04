import { color, style } from "d3";

export const bubbleFunc = (bubbleObj) => {
  // set the dimensions and margins of the graph
  // var margin = { top: 40, right: 150, bottom: 60, left: 30 },
  //   width = 500 - margin.left - margin.right,
  //   height = 420 - margin.top - margin.bottom;
  let data = bubbleObj.data;
  let display = bubbleObj.display;
  d3.select(".bubble").selectAll("*").remove();
  var margin = { top: 100, right: 300, bottom: 60, left: 100 };
  const width = 1400 - margin.left - margin.right;
  const height = 880 - margin.top - margin.bottom;
  data = data.filter((obj) => obj.population > 0);
  // append the svg object to the body of the page
  var svg = d3
    .select(".bubble")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // ---------------------------//
  //       AXIS  AND SCALE      //
  // ---------------------------//

  // Add X axis
  var x = d3.scaleLinear().domain([0, 75000]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(
      d3
        .axisBottom(x)
        .ticks(3)
        .tickFormat((d) => `$${d}`)
    )
    .style("font-size", "20px");

  // Add X axis label:
  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 50)
    .text("Income per person")
    .style("font-size", "21px");

  // Add Y axis
  var y = d3.scaleLinear().domain([35, 90]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y)).style("font-size", "20px");

  // Add Y axis label:
  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", 0)
    .attr("y", -20)
    .text("Life expectancy at birth (years)")
    .attr("text-anchor", "start")
    .style("font-size", "21px");

  // Add a scale for bubble size
  var z = d3.scaleSqrt().domain([200000, 1310000000]).range([2, 30]);

  // Add a scale for bubble color
  var myColor = d3
    .scaleOrdinal()
    .domain(["asia", "europe", "americas", "africa"])
    .range(d3.schemeSet1);

  // ---------------------------//
  //      TOOLTIP               //
  // ---------------------------//

  // -1- Create a tooltip div that is hidden by default:
  var tooltip = d3
    .select(".bubble")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white")
    .style("font-size", "20px");

  // -2- Create 3 functions to show / update (when mouse move but stay oTypeError: d3.mouse is not a functionn same circle) / hide the tooltip
  var showTooltip = function (evt) {
    tooltip.transition().duration(200);
    tooltip
      .style("opacity", 1)
      .html(
        "Country: " +
          evt.target.__data__.name +
          "<br> Life Expectancy: " +
          evt.target.__data__.lifeExpectancy +
          "<br> Year: " +
          evt.target.__data__.time +
          "<br> Population: " +
          evt.target.__data__.population
      )
      .style("left", d3.pointer(evt)[0] + 30 + "px")
      .style("top", d3.pointer(evt)[1] + 30 + "px");
  };
  var moveTooltip = function (evt) {
    tooltip
      .style("left", d3.pointer(evt)[0] + 30 + "px")
      .style("top", d3.pointer(evt)[1] + 30 + "px");
  };
  var hideTooltip = function (evt) {
    tooltip.transition().duration(200).style("opacity", 0);
  };

  // ---------------------------//
  //       HIGHLIGHT GROUP      //
  // ---------------------------//

  // What to do when one group is hovered
  var highlight = function (d) {
    // reduce opacity of all groups
    d3.selectAll(".bubbles").style("opacity", 0.05);
    // expect the one that is hovered
    d3.selectAll("." + d).style("opacity", 1);
  };

  // And when it is not hovered anymore
  var noHighlight = function (d) {
    d3.selectAll(".bubbles").style("opacity", 1);
  };

  // ---------------------------//
  //       CIRCLES              //
  // ---------------------------//

  // Add dots
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", function (d) {
      return "bubbles " + d.region;
    })
    .attr("cx", function (d) {
      return x(d.incomePerPerson);
    })
    .attr("cy", function (d) {
      return y(d.lifeExpectancy);
    })
    .attr("r", function (d) {
      return z(d.population);
    })
    .style("fill", function (d) {
      return myColor(d.region);
    })
    // -3- Trigger the functions for hover
    .on("mouseover", showTooltip)
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip);

  // ---------------------------//
  //       LEGEND              //
  // ---------------------------//

  var size = 20;

  var allgroups = ["Asia", "Europe", "Americas", "Africa"].map((name) =>
    name.toLowerCase()
  );

  svg
    .append("text")
    .attr("x", width * 1.2)
    .attr("y", height * 0.32)
    .text("Region")
    .style("font-size", 25);

  svg
    .selectAll("regionLabels")
    .data(allgroups)
    .enter()
    .append("text")
    .attr("x", width * 1.2)
    .attr("y", function (d, i) {
      return i * (size + 5) + size / 2 + height * 0.34;
    }) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function (d) {
      return myColor(d);
    })
    .text(function (d) {
      return d;
    })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .style("font-size", "20px");
};
