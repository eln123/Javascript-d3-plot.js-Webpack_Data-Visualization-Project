import * as Plot from "@observablehq/plot";

export const plotFuncArrow = (state) => {
  const width = 1200;
  const minYear = state.years[0];
  const maxYear = state.years[1];
  const display = state.display;
  const dataOne = state.data.filter((obj, index) => obj.time === minYear);
  const dataTwo = state.data.filter((obj, index) => obj.time === maxYear);

  let data = [];
  for (let i = 0; i < dataOne.length; i++) {
    let obj = dataOne[i];
    let newObj = {};
    newObj.name = obj.name;
    newObj[`${obj.time}${display}`] = obj[`${display}`];
    newObj[`${obj.time}Pop`] = obj.population;
    newObj[`${obj.time}IPP`] = obj.incomePerPerson;
    data.push(newObj);
  }

  for (let i = 0; i < dataTwo.length; i++) {
    let obj = dataTwo[i];
    for (let j = 0; j < data.length; j++) {
      let currentInside = data[j];
      if (currentInside.name === obj.name) {
        currentInside[`${obj.time}${display}`] = obj[`${display}`];
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

    style: { fontSize: 20 },
    x: {
      type: "log",
      label: "Population →",
    },
    y: {
      label: `${display}`,

      type: "log",
    },
    color: {
      type: "diverging",
      scheme: "burd",
      label: `Change in ${display} from ${minYear} to ${maxYear}`,
      legend: true,
      ticks: 6,
      tickFormat: "+f",
    },
    marks: [
      Plot.arrow(data, {
        x1: `${minYear}Pop`,
        y1: `${minYear}${display}`,
        x2: `${maxYear}Pop`,
        y2: `${maxYear}${display}`,
        bend: true,
        stroke: (d) => d[`${maxYear}${display}`] - d[`${minYear}${display}`],
      }),
      Plot.text(data, {
        x: `${maxYear}Pop`,
        y: `${maxYear}${display}`,
        text: "name",
        fill: "currentColor",
        stroke: "white",
        dy: -6,
      }),
    ],
  };
};
