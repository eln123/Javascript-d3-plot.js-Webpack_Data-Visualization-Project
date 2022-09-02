import * as Plot from "@observablehq/plot";

export const plotFuncArrow = (state) => {
  const width = 1200;
  const minYear = state.years[0];
  const maxYear = state.years[1];
  console.log("minYear", minYear);
  console.log("state.data", state.data);
  const dataOne = state.data.filter((obj, index) => index % 2);
  const dataTwo = state.data.filter((obj, index) => !(index % 2));

  let data = [];
  for (let i = 0; i < dataOne.length; i++) {
    let obj = dataOne[i];
    let newObj = {};
    newObj.name = obj.name;
    newObj[`${obj.time}LE`] = obj.lifeExpectancy;
    newObj[`${obj.time}Pop`] = obj.population;
    newObj[`${obj.time}IPP`] = obj.incomePerPerson;
    data.push(newObj);
  }
  for (let i = 0; i < dataTwo.length; i++) {
    let obj = dataTwo[i];
    for (let j = 0; j < data.length; j++) {
      let currentInside = data[j];
      if (currentInside.name === obj.name) {
        currentInside[`${obj.time}LE`] = obj.lifeExpectancy;
        currentInside[`${obj.time}Pop`] = obj.population;
        currentInside[`${obj.time}IPP`] = obj.incomePerPerson;
      }
    }
  }

  return {
    width,
    height: Math.min(800, width),
    grid: true,
    inset: 10,
    x: {
      type: "log",
      label: "Population →",
    },
    y: {
      label: "↑ Life Expectancy",

      type: "log",
    },
    color: {
      type: "diverging",
      scheme: "burd",
      label: `Change in Life Expectancy from ${minYear} to ${maxYear}`,
      legend: true,
      ticks: 6,
      tickFormat: "+f",
    },
    marks: [
      Plot.arrow(data, {
        x1: `${minYear}Pop`,
        y1: `${minYear}LE`,
        x2: `${maxYear}Pop`,
        y2: `${maxYear}LE`,
        bend: true,
        stroke: (d) => d[`${maxYear}LE`] - d[`${minYear}LE`],
      }),
      Plot.text(data, {
        x: `${maxYear}Pop`,
        y: `${maxYear}LE`,
        // filter: "highlight",
        text: "name",
        fill: "currentColor",
        stroke: "white",
        dy: -6,
      }),
    ],
  };
};
