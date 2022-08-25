import * as d3 from "d3";

export const dThreeFunction3 = (data, countries) => {
  // const data = generateData()
  data = data.filter(
    (obj, index) =>
      +obj.year < 1960 && obj.country !== "chn" && obj.country !== "ind"
  );

  let parseTime = d3.timeParse("%Y");

  // establish width and height
  let width = 1000;
  let height = 1000;

  // establish margins
  const margin = { top: 50, right: 50, bottom: 50, left: 200 };

  //establishes x and y max values
  const yMinValue = d3.min(data, (d) => +d.population);

  const yMaxValue = d3.max(data, (d) => +d.population);

  const xMinValue = d3.min(data, (d) => d.year);
  const xMaxValue = d3.max(data, (d) => d.year);

  // create chart area (grab container as you would with CSS (ids use #, classes use .))
  const svg = d3
    .select("#container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // g stands for "group"
  // at this point, you won't see anything because
  // you have not given it any color or drawn anything in your svg

  // create scale for the x axis (just the scale, not actual x axis that it will be on)
  const xScale = d3
    .scaleLinear()
    .domain([xMinValue, xMaxValue])
    .range([0, width]);
  // range maps domain to pixel size

  // create scale for y axis
  const yScale = d3.scaleLinear().domain([0, yMaxValue]).range([height, 0]);

  // create an x grid
  svg
    .append("g")
    .attr("class", "grid")
    .call(d3.axisBottom(xScale).tickSize(height).tickFormat(""));

  // create y grid
  svg
    .append("g")
    .attr("class", "grid")
    .attr("transform", `translate( ${width} , 0)`)
    .call(d3.axisLeft(yScale).tickSize(width))
    .style("font-size", 20);

  // create the x axis on the bottom
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .text("Year")
    .call(
      d3
        .axisBottom()
        .scale(xScale)
        .tickFormat((d) => d)
    )
    .style("font-size", 20);

  const byCountry = d3.groups(data, (d) => d.country);

  var color = d3
    .scaleOrdinal()
    .domain(data[0].population)
    .range(colorbrewer.Set2[6]);
  svg
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

    .attr("fill", "none")
    .attr("stroke", (d) => color(d.year))
    .attr("stroke-width", 4);
};

const DUMMY_DATA = [
  { id: "d1", value: 10, region: "USA" },
  { id: "d2", value: 11, region: "India" },
  { id: "d3", value: 12, region: "China" },
  { id: "d4", value: 6, region: "Germany" },
];

export const dThreeFunction = (data) => {
  const xScale = d3
    .scaleBand()
    .domain(data.map((obj) => obj.region))
    .rangeRound([0, 250]);
  const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]);

  const container = d3.select("svg").classed("container", true);

  const bars = container
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", xScale.bandwidth())
    .attr("height", (data) => 200 - yScale(data.value))
    .attr("x", (data) => xScale(data.region))
    .attr("y", (data) => yScale(data.value));
  // .style("width", "100px")
  // .attr("height", "100px");
};
