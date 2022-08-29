import { color } from "d3";

export const dThreeFunction2 = (data, countries) => {
  d3.select(".svg2").selectAll("*").remove();

  //set canvas margins
  let leftMargin = 150;
  let topMargin = 30;
  //format the year
  // let parseTime = d3.timeParse("%Y");

  // data.forEach(function (d) {
  //   d.year = parseTime(d.year);
  // });

  data = data.filter((obj) => countries.includes(obj.country));

  function squareNum(x) {
    return x * 2;
  }
  //scale xAxis
  let xExtent = d3.extent(data, (d) => d.year);

  console.log(xExtent);

  let years = [1950, 2022];

  var xScale = d3.scaleLinear().domain(years).range([leftMargin, 1500]);

  //scale yAxis
  let yExtent = [10000, 1500000000];
  if (data.length) {
    yExtent = d3.extent(data, (d) => +d.population);
  }
  d3.extent(data, (d) => +d.population);

  const yMax = d3.max(data, (d) => d.population);
  const yScale = d3.scaleLog().domain(yExtent).range([800, 0]);

  //we will draw xAxis and yAxis next

  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .tickFormat((d) => d);
  // console.log(d3.groups(data, (d) => d.country));
  d3.select(".svg2")

    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0,820)")
    .call(xAxis)
    .append("text")
    .attr("x", "700") //middle of the xAxis
    .attr("y", "100") // a little bit below xAxis -- Year
    .text("Year")
    .style("font-size", "34px");
  // .attr("font-size", "100px");
  //yAxis and yAxis label

  const yAxis = d3.axisLeft().scale(yScale).ticks(10);

  // .tickFormat((d) => {
  //   if (d > 1000000000) {
  //     d = `${d / 100000000}B`;
  //     return d;
  //   } else {
  //     return d;
  //   }
  // });

  const byCountry = d3.groups(data, (d) => d.country);
  d3.select(".svg2")
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${leftMargin},20)`) //use constiable in translate
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", "-250")
    .attr("y", "-115")
    // .attr("text-anchor", "end")
    .text("POPULATION")
    .style("font-size", "34px");
  let data1;
  if (data[0]) {
    data1 = data[0].population;
  } else {
    data1 = [];
  }

  const color = d3.scaleOrdinal().domain(data1).range(colorbrewer.Set2[6]);

  //select path - three types: curveBasis,curveStep, curveCardinal
  d3.select(".svg2")
    .selectAll(".line")
    .data(byCountry)
    .enter()
    .append("g")
    .attr("class", "line")
    .append("path")
    .datum((data) => data[1])
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x((d) => xScale(+d.year))
        .y((d) => yScale(+d.population))
    )
    .append("tspan")
    .attr("transform", "translate(" + (100 + 3) + "," + 100 + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .style("fill", "red")
    .text("Country");
  // .append("text")
  // .attr("text-anchor", "middle")
  // .text((d) => {
  //   console.log(byCountry);
  //   console.log(d.country);
  //   return `${d.country}`;
  // })
  // .style("font-size", 24)

  // BLACK COLOR AREA CLICK
  // .attr("fill", "none")
  // .attr("stroke", (d) => color(d.year))
  // .attr("stroke-width", 2) //length of line
  // .on("click", function (event, d) {
  //   // is the element currently visible ?
  //   currentOpacity = d3.selectAll("." + d.country).style("opacity");
  //   // Change the opacity: from 0 to 1 or from 1 to 0
  //   d3.selectAll("." + d.country)
  //     .transition()
  //     .style("opacity", currentOpacity == 1 ? 0 : 1);
  // });

  // .on("mouseover", function (d) {
  //   d3.select(this).attr("fill", "rgb(0," + d + ",0)");
  // })
  // .on("mouseout", function (d) {
  //   d3.select(this).attr("fill", "black");
  // });

  //append circle
  d3.select(".svg2")
    .selectAll("circle")
    .append("g")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 3) // circle size
    .attr("cx", (d) => xScale(d.year))
    .attr("cy", (d) => yScale(d.population))
    .style("fill", (d) => color(d.country))
    .on("mouseover", function (d, i) {
      d3.select(this).transition().duration("100").attr("r", 9);
      div.transition().duration(100).style("opacity", 1);
      div
        .html(i.population + "<br/>" + i.country)
        .style("left", d.pageX + 10 + "px")
        .style("top", d.pageY - 15 + "px");
    })
    .on("mouseout", function (d, i) {
      d3.select(this).transition().duration("200").attr("r", 3);
      div.transition().duration("200").style("opacity", 0);
    });

  let div = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  /////////////////////////////////////////////////////////////////////////////////////
  //
  //
  //

  // // export const dThreeFunction = (data) => {
  //   const xScale = d3
  //     .scaleBand()
  //     .domain(data.map((obj) => obj.year))
  //     .rangeRound([0, 250])
  //     .padding(0.5);

  //   const yScale = d3.scaleLinear().domain([0, 50000]).range([200, 0]);

  //   const container = d3.select(".svg1");

  //   const bars = container
  //     .selectAll(".bar")
  //     .data(data)
  //     .enter()
  //     .append("rect")
  //     .classed("bar", true)
  //     .attr("width", xScale.bandwidth())
  //     .attr("height", (data) => 200 - yScale(data.population))
  //     .attr("x", (data) => xScale(data.year))
  //     .attr("y", (data) => yScale(data.population))
  //     .style("fill", "blue")
  //     .style("position", "static");

  //   // .style("width", "100px")
  //   // .attr("height", "100px");
  // };

  // data.on("mouseover", function (d) {
  //   d3.select(this).attr("fill", "rgb(0," + d + ",0)");
  // });

  // data.on("mouseout", function (d) {
  //   d3.select(this).attr("fill", "black");
  // });
};

// const margin = {top: 10, right: 100, bottom: 30, left: 30},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// const svg = d3.select(".svg2")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",`translate(${margin.left},${margin.top})`);

// //Read the data
// d3.csv("https://raw.githubusercontent.com/open-numbers/ddf--gapminder--population/master/ddf--datapoints--population--by--country--year.csv").then(function(data) {

//     // List of groups (here I have one group per column)
//     const allGroup = ["valueA", "valueB", "valueC"]

//     // Reformat the data: we need an array of arrays of {x, y} tuples
//     const dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
//       return {
//         name: grpName,
//         values: data.map(function(d) {
//           return {time: d.time, value: +d[grpName]};
//         })
//       };
//     });
//     // I strongly advise to have a look to dataReady with
//     // console.log(dataReady)

//     // A color scale: one color for each group
//     const myColor = d3.scaleOrdinal()
//       .domain(allGroup)
//       .range(d3.schemeSet2);

//     // Add X axis --> it is a date format
//     const x = d3.scaleLinear()
//       .domain([0,10])
//       .range([ 0, width ]);
//     svg.append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(d3.axisBottom(x));

//     // Add Y axis
//     const y = d3.scaleLinear()
//       .domain( [0,20])
//       .range([ height, 0 ]);
//     svg.append("g")
//       .call(d3.axisLeft(y));

//     // Add the lines
//     const line = d3.line()
//       .x(d => x(+d.time))
//       .y(d => y(+d.value))
//     svg.selectAll("myLines")
//       .data(dataReady)
//       .join("path")
//         .attr("class", d => d.name)
//         .attr("d", d => line(d.values))
//         .attr("stroke", d => myColor(d.name))
//         .style("stroke-width", 4)
//         .style("fill", "none")

//     // Add the points
//     svg
//       // First we need to enter in a group
//       .selectAll("myDots")
//       .data(dataReady)
//       .join('g')
//         .style("fill", d => myColor(d.name))
//         .attr("class", d => d.name)
//       // Second we need to enter in the 'values' part of this group
//       .selectAll("myPoints")
//       .data(d => d.values)
//       .join("circle")
//         .attr("cx", d => x(d.time))
//         .attr("cy", d => y(d.value))
//         .attr("r", 5)
//         .attr("stroke", "white")

//     // Add a label at the end of each line
//     svg
//       .selectAll("myLabels")
//       .data(dataReady)
//       .join('g')
//         .append("text")
//           .attr("class", d => d.name)
//           .datum(d => { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
//           .attr("transform", d => `translate(${x(d.value.time)},${y(d.value.value)})`) // Put the text at the position of the last point
//           .attr("x", 12) // shift the text a bit more right
//           .text(d => d.name)
//           .style("fill", d => myColor(d.name))
//           .style("font-size", 15)

//     // Add a legend (interactive)
//     svg
//       .selectAll("myLegend")
//       .data(dataReady)
//       .join('g')
//         .append("text")
//           .attr('x', (d,i) => 30 + i*60)
//           .attr('y', 30)
//           .text(d => d.name)
//           .style("fill", d => myColor(d.name))
//           .style("font-size", 15)
//         .on("click", function(event,d){
//           // is the element currently visible ?
//           currentOpacity = d3.selectAll("." + d.name).style("opacity")
//           // Change the opacity: from 0 to 1 or from 1 to 0
//           d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0:1)

//         })
// })
