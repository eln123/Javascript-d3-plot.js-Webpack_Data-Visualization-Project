import { color } from "d3";

export const dThreeFunction2 = (data, countries) => {
  d3.select(".svg2").selectAll("*").remove();

  let leftMargin = 150;
  let topMargin = 30;

  data = data.filter((obj) => countries.includes(obj.country));

  function squareNum(x) {
    return x * 2;
  }
  //scale xAxis
  let xExtent = d3.extent(data, (d) => d.year);

  console.log(xExtent);

  let years = [1950, 2022];

  var xScale = d3.scaleLinear().domain(years).range([leftMargin, 1400]);

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

  //yAxis and yAxis label

  const yAxis = d3.axisLeft().scale(yScale).ticks(10);

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
    .style("font-size", "20px")
    .on("mouseover", function (d, i) {
      d3.select(this).transition().duration("100").attr("r", 13);
      div.transition().duration(100).style("opacity", 1);
      div
        .html(
          "Country: " +
            i.country +
            "<br/>" +
            "Population: " +
            i.population +
            "<br/>" +
            "Year: " +
            i.year
        )
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
};
