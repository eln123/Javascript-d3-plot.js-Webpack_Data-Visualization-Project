import { converter } from "../../csvConverter";
export const drawChart = (data) => {
  const width = 400;
  const height = 400;
  //[ { year: emissions, year: emissions, .... country: "afghanistan"}, ... ]
  //
  // establish margins
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };

  data = data.map((obj) => {
    for (let key in obj)
      if (key !== "country") {
        let val = obj[key];
        key = d3.timeParse("%Y")(key);
        obj[key] = val;
      }
    return obj;
  });

  console.log(data);

  // create the chart area
  const svg = d3
    .select("#timeSeriesContainer")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // x axis ( has a date format through scaleTime() )
  const x = d3
    .scaleLinear()
    .domain(d3.extent(["1948", "2017"])) // (.domain([xMin, xMax]))
    .range([0, width]);

  svg
    .append("g")
    .attr("transform", "translate(0, " + height + ")")
    .call(d3.axisBottom(x).tickFormat((d) => d));
};
