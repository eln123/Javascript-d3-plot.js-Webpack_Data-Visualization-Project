export const dThreeFunction = (data) => {
  const xScale = d3
    .scaleBand()
    .domain(data.map((obj) => obj.year))
    .rangeRound([0, 250])
    .padding(0.5);

  const yScale = d3.scaleLinear().domain([0, 50000]).range([200, 0]);

  const container = d3.select(".svg1");

  const bars = container
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", xScale.bandwidth())
    .attr("height", (data) => 200 - yScale(data.population))
    .attr("x", (data) => xScale(data.year))
    .attr("y", (data) => yScale(data.population))
    .style("fill", "blue")
    .style("position", "static");

  // .style("width", "100px")
  // .attr("height", "100px");
};

// const DUMMY_DATA = [
//   { id: "d1", value: 10, region: "USA" },
//   { id: "d2", value: 11, region: "India" },
//   { id: "d3", value: 12, region: "China" },
//   { id: "d4", value: 6, region: "Germany" },
// ];

// export const dThreeFunction = (data) => {
//   const xScale = d3
//     .scaleBand()
//     .domain(data.map((obj) => obj.region))
//     .rangeRound([0, 250]);
//   const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]);

//   const container = d3.select("svg").classed("container", true);

//   const bars = container
//     .selectAll(".bar")
//     .data(data)
//     .enter()
//     .append("rect")
//     .classed("bar", true)
//     .attr("width", xScale.bandwidth())
//     .attr("height", (data) => 200 - yScale(data.value))
//     .attr("x", (data) => xScale(data.region))
//     .attr("y", (data) => yScale(data.value));
//   // .style("width", "100px")
//   // .attr("height", "100px");
// };

export const dThreeFunction2 = (data) => {
  //set canvas margins
let leftMargin=70
let topMargin=30
//format the year 
let parseTime = d3.timeParse("%Y");

data.forEach(function (d) {
    d.year = parseTime(d.year);
});

//scale xAxis 
let xExtent = d3.extent(data, d => d.year);
var xScale = d3.scaleTime().domain(xExtent).range([leftMargin, 900])

//scale yAxis
var yMax=d3.max(data,d=>d.population)
var yScale = d3.scaleLinear().domain([0, 150000]).range([600, 0])

//we will draw xAxis and yAxis next
 
const xAxis = d3.axisBottom()
    .scale(xScale)

d3.select(".svg2")
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0,620)")
    .call(xAxis)
    .append("text")
    .attr("x", (900+70)/2) //middle of the xAxis
    .attr("y", "50") // a little bit below xAxis
    .text("Year")

//yAxis and yAxis label
const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10)

d3.select('.svg2')
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${leftMargin},20)`) //use variable in translate
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", "-150")
    // .attr("y", "-55")
    // .attr("text-anchor", "end")
    .text("POPULATION")


var color = d3.scaleOrdinal().domain(data[0].population).range(colorbrewer.Set2[6])

//select path - three types: curveBasis,curveStep, curveCardinal
d3.select(".svg2")
    .append("g")
    .attr("class", "line")
    .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(d=> xScale(d.year) )
        .y(d=>  yScale(d.population) )
        )

    .attr("fill", "none")
    .attr("stroke", d => color(d.year))
    .attr("stroke-width", 2)


//append circle 
d3.select(".svg2")
    .selectAll("circle")
    .append("g")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 6)
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.population))
    .style("fill", d => color(d.country))
}