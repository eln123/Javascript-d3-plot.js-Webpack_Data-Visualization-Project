import * as Plot from "@observablehq/plot";

export const plotFuncLinearRegression = (state) => {
  const filteredData = state.data.filter(
    (obj, index) =>
      state.countries.includes(obj.name) &&
      +obj.time >= 1800 &&
      +obj.time <= 2100
  );
  console.log(filteredData);
  //
  const filteredDataBelow = state.data.filter((obj, index) => {
    return (
      state.countries.includes(obj.name) &&
      +obj.time >= 1980 &&
      +obj.time <= 2020
    );
  });
  // .map((obj) => {
  //   obj.lifeExpectancy = +obj.lifeExpectancy;
  //   return obj;
  // });
  const filteredDataAbove = state.data.filter(
    (obj, index) =>
      state.countries.includes(obj.name) &&
      +obj.time >= 2000 &&
      +obj.time <= 2020
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
