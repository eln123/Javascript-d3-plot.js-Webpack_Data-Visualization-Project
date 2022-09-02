import * as Plot from "@observablehq/plot";

export const plotFuncDensity = (data) => {
  console.log(data);
  return {
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
    },

    color: { legend: true },
    marks: [
      ["asia", "americas", "africa", "europe", "oceania"].map((region) =>
        Plot.density(data, {
          weight: (d) => (d.region === region ? 1 : -1),
          x: "time",
          y: "lifeExpectancy",
          z: null,
          fill: (d) => d.region,
          fillOpacity: 0.2,
          thresholds: [0.05],
          clip: true,
        })
      ),
      Plot.dot(data, {
        x: "time",
        y: "lifeExpectancy",
        fill: "region",
        strokeWidth: 0.5,
        stroke: "white",
      }),
      Plot.frame(),
    ],
  };
};
