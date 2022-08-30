import * as Plot from "@observablehq/plot";

export const plotFuncLinearRegression = (state) => {
  const filteredData = state.data.filter(
    (obj, index) =>
      state.countries.includes(obj.country) &&
      obj.year > 1800 &&
      obj.year <= 2100
  );
  //
  const filteredDataBelow = state.data.filter(
    (obj, index) =>
      state.countries.includes(obj.country) &&
      obj.year >= 1980 &&
      obj.year <= 2020
  );
  const filteredDataAbove = state.data.filter(
    (obj, index) =>
      state.countries.includes(obj.country) &&
      obj.year >= 2000 &&
      obj.year <= 2020
  );

  return {
    height: 500,
    width: 1000,
    y: {
      grid: true,
      type: "log",
    },
    x: {
      type: "log",
      tickFormat: (d) => d,
    },
    grid: true,
    color: { legend: true },
    marks: [
      // Plot.dot(filteredData, {
      //   x: "year",
      //   y: "lifeExpectancy",
      //   fill: "country",
      // }),
      Plot.dot(filteredDataBelow, {
        x: "year",
        y: "lifeExpectancy",
        fill: "country",
      }),
      Plot.dot(filteredDataAbove, {
        x: "year",
        y: "lifeExpectancy",
        fill: "country",
      }),
      // Plot.linearRegressionY(filteredData, {
      //   x: "year",
      //   y: "lifeExpectancy",
      //   stroke: "country",
      // }),
      // Plot.linearRegressionY(filteredData, {
      //   x: "year",
      //   y: "lifeExpectancy",
      // }),
      Plot.linearRegressionY(filteredDataBelow, {
        x: "year",
        y: "lifeExpectancy",
        stroke: "country",
      }),
      Plot.linearRegressionY(filteredDataBelow, {
        x: "year",
        y: "lifeExpectancy",
      }),
      Plot.linearRegressionY(filteredDataAbove, {
        x: "year",
        y: "lifeExpectancy",
        stroke: "country",
      }),
      Plot.linearRegressionY(filteredDataAbove, {
        x: "year",
        y: "lifeExpectancy",
      }),
    ],
  };
};
