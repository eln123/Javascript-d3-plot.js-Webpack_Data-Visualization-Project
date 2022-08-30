//
// y = lifeExpectancy
// x = income
// circle size = population
// circle color = region

import React from "react";
import { converter } from "../../csvConverter";
import { plotFuncBubble } from "./d3/dThreeBubble";
import { PlotFigure } from "plot-react";

export default class Bubble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      lifeExpectancy: [],
      incomePerPerson: [],
      population: [],
    };
    this.selectCountry = this.selectCountry.bind(this);
  }

  async componentDidMount() {
    const urlLifeExpectancyByRegion =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/LifeExpectancy_ByRegion";
    const urlIncomePerPersonByRegion =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/IncomePerPerson_ByRegion";
    const urlPopulationByRegion =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/Population_ByRegion";

    ///////////////////
    await converter(urlLifeExpectancyByRegion, (results) => {
      this.setState({ ...this.state, lifeExpectancy: results.data });
    });

    ////////////////////
    await converter(urlIncomePerPersonByRegion, (results) => {
      this.setState({ ...this.state, incomePerPerson: results.data });
    });
    //////////////////////
    await converter(urlPopulationByRegion, (results) => {
      this.setState({ ...this.state, population: results.data });
    });

    await converter(urlPopulationByRegion, (results) => {
      this.setState({ ...this.state });
      const lifeExpectancyArr = this.state.lifeExpectancy;
      const incomeArr = this.state.incomePerPerson;
      const populationArr = this.state.population;
      let combinedDataArr = [];
      for (let i = 0; i < lifeExpectancyArr.length; i++) {
        let lifeExpectancyObj = lifeExpectancyArr[i];
        for (let j = 0; j < incomeArr.length; i++) {
          let incomeObj = incomeArr[j];
          if (
            incomeObj.name === lifeExpectancyObj.name &&
            incomeObj.time === lifeExpectancyObj.time
          ) {
            for (let k = 0; k < populationArr.length; i++) {
              let populationObj = populationArr[j];
              if (
                incomeObj.name === populationObj.name &&
                incomeObj.time === populationObj.time
              ) {
                let obj = {};
                obj.year = populationObj.time;
                obj.region = populationObj.name;
                obj.population = populationObj.Population;
                obj.incomePerPerson = incomeObj["Income per person"];
                obj.lifeExpectancy = lifeExpectancyObj["Life expectancy "];
                combinedDataArr.push(obj);
              }
            }
          }
        }
      }
      console.log("combinedDataArr");
    });
  }

  selectCountry(evt) {
    if (evt.target.checked === true) {
      this.setState({
        ...this.state,
        countries: [...this.state.countries, evt.target.name],
      });
    } else {
      const newState = {
        ...this.state,
        countries: this.state.countries.filter(
          (country) => country !== evt.target.name
        ),
      };

      this.setState(newState);
    }
  }
  render() {
    const data = this.state.data;
    const countriesCombined = d3.groups(data, (d) => d.country);

    const showData = this.state.data.filter(
      (obj, index) => obj.country !== countriesCombined[0]
    );
    if (!this.state.data.length) {
      return "hi";
    }
    console.log("hello", countriesCombined);
    return (
      <div>
        <div className="plotLinearRegression" ref={this.myRef}>
          {this.state ? (
            <PlotFigure options={plotFuncLinearRegression(this.state)} />
          ) : (
            "hi"
          )}
        </div>
        <div>
          <fieldset>
            <label htmlFor="myCheckBox">
              {countriesCombined.map((country, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name={country[0]}
                    onClick={this.selectCountry}
                  />
                  {country[0]}
                </div>
              ))}
            </label>
          </fieldset>
        </div>
      </div>
    );
  }
}
