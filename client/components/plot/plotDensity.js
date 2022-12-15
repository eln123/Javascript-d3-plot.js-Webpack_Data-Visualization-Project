import * as Plot from "@observablehq/plot";

export const plotFuncDensity = (dataObj) => {
  let data = dataObj.data;
  let display = dataObj.display;
  let chart = {
    width: 1400,
    height: 800,
    nice: true,

    y: {
      grid: true,
      type: "log",
    },
    x: {
      tickFormat: (d) => d,
      type: "linear",
      ticks: 2,
    },

    color: { legend: true },
    marks: [
      ["asia", "americas", "africa", "europe"].map((region) =>
        Plot.density(data, {
          weight: (d) => (d.region === region ? 1 : -1),
          x: "time",
          y: `${display}`,
          z: null,
          fill: (d) => d.region,
          fillOpacity: 0.2,
          thresholds: [0.05],
          clip: true,
        })
      ),
      Plot.dot(data, {
        x: "time",
        y: `${display}`,
        fill: "region",
        strokeWidth: 0.5,
        stroke: "white",
      }),
      Plot.frame(),
    ],
  };

  return chart;
};
