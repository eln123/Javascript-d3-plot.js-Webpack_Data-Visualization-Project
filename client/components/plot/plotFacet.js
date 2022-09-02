import * as Plot from "@observablehq/plot";

export const plotFuncFacet = (data) => {
  return {
    y: {
      grid: true,
      type: "log",
    },
    x: {
      tickFormat: (d) => d,
      type: "linear",
    },
    height: 900,
    width: 1500,
    grid: true,
    facet: {
      data: data.filter((d) => d),
      x: "region",

      marginRight: 80,
    },
    marks: [
      Plot.frame(),
      Plot.dot(data, {
        x: "time",
        y: "lifeExpectancy",
        r: 1,
        facet: "exclude",
        fill: "black",
      }),
    ],
  };
};
