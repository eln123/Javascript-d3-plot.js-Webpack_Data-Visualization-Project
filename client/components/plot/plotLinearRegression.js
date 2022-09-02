import * as Plot from "@observablehq/plot";

export const plotFuncLinearRegression = (state) => {
  let minYear = state.years[0];
  let maxYear = state.years[1];
  // const filteredData = state.data.filter((obj, index) =>
  //   state.countries.includes(obj.name)
  // );

  const filteredDataBelow = state.data.filter((obj, index) => {
    state.countries.includes(obj.name) &&
      +obj.time >= +minYear &&
      +obj.time <= +state.half;
  });

  const filteredDataAbove = state.data.filter(
    (obj, index) =>
      state.countries.includes(obj.name) &&
      +obj.time >= +state.half &&
      +obj.time <= +maxYear
  );

  // .map((obj) => {
  //   obj.lifeExpectancy = +obj.lifeExpectancy;
  //   return obj;
  // });

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
      //   x: "time",
      //   y: "lifeExpectancy",
      //   fill: "name",
      // }),
      Plot.dot(filteredDataBelow, {
        x: "time",
        y: "lifeExpectancy",
        fill: "name",
      }),
      Plot.dot(filteredDataAbove, {
        x: "time",
        y: "lifeExpectancy",
        fill: "name",
      }),
      // Plot.linearRegressionY(filteredData, {
      //   x: "year",
      //   y: "lifeExpectancy",
      //   stroke: "name",
      // }),
      // Plot.linearRegressionY(filteredData, {
      //   x: "year",
      //   y: "lifeExpectancy",
      // }),
      Plot.linearRegressionY(filteredDataBelow, {
        x: "time",
        y: "lifeExpectancy",
        stroke: "name",
      }),
      Plot.linearRegressionY(filteredDataBelow, {
        x: "time",
        y: "lifeExpectancy",
      }),
      Plot.linearRegressionY(filteredDataAbove, {
        x: "time",
        y: "lifeExpectancy",
        stroke: "name",
      }),
      Plot.linearRegressionY(filteredDataAbove, {
        x: "time",
        y: "lifeExpectancy",
      }),
    ],
  };
};
