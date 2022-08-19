export const dThreeFunction = (data) => {
  const xScale = d3
    .scaleBand()
    .domain(data.map((obj) => obj.year))
    .rangeRound([0, 250])
    .padding(0.5);

  const yScale = d3.scaleLinear().domain([0, 50000]).range([200, 0]);

  const container = d3.select("svg");

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
