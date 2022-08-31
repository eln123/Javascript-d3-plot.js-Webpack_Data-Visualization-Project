import * as Plot from "@observablehq/plot";

export const plotFuncArrow = (state) => {
  const width = 1000;
  // return {
  //   width,
  //   height: Math.min(600, width),
  //   grid: true,
  //   inset: 10,
  //   x: {
  //     type: "log",
  //     label: "Population",
  //   },
  //   y: {
  //     label: "LifeExpectancy",
  //     ticks: 4,
  //   },
  //   color: {
  //     type: "diverging",
  //     scheme: "burd",
  //     label: "Change in Life Expectancy from ..... ",
  //     legend: true,
  //     ticks: 6,
  //     tickFormat: "+f",
  //   },
  //   marks: [
  //     Plot.arrow(filteredData, {
  //       x1: "2100",
  //       y1: "2100",
  //       x2: "1800",
  //       y2: "1800",
  //       bend: true,
  //       stroke: (d) => d[time] - d[time],
  //     }),
  //     Plot.text(filteredData, {
  //       x: "POP_2015",
  //       y: "R90_10_2015",
  //       filter: "highlight",
  //       text: "nyt_display",
  //       fill: "currentColor",
  //       stroke: "white",
  //       dy: -6,
  //     }),
  //   ],
  // };
};
