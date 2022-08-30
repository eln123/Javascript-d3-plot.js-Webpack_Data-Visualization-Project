import * as Plot from "@observablehq/plot";

export const plotFunc = (state) => {
  const filteredData = state.data.filter((obj, index) =>
    state.countries.includes(obj.country)
  );
  return {
    marginRight: 40,
    y: {
      grid: true,
      type: "log",
    },
    x: {
      type: "linear",
      tickFormat: (d) => d,
    },
    marks: [
      Plot.line(filteredData, {
        x: "year",
        y: "population",
        stroke: "country",
      }),
      Plot.text(
        filteredData,
        Plot.selectLast({
          x: "year",
          y: "population",
          z: "country",
          text: "country",
          textAnchor: "start",
          dx: 3,
        })
      ),
    ],
  };
};
