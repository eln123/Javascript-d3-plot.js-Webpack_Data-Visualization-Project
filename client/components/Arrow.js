import React from "react";
import { converter } from "../../csvConverter";
import { plotFuncArrow } from "./plot/plotArrow";
import { PlotFigure } from "plot-react";

export default class PlotArrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.state = {
      data: [],
      years: ["1980", "2020"],
      combined: [],
      lifeExpectancy: [],
      incomePerPerson: [],
      population: [],
      countries: [
        "China",
        "United States",
        "India",
        "Afghanistan",
        "Singapore",
      ],
      countryRegionConverter: [],
    };
    this.selectCountry = this.selectCountry.bind(this);
  }

  async componentDidMount() {
    const urlCountryRegionConverter =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/Countries_Regions";
    const urlLifeExpectancyByRegion =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/LifeExpectancy_ByCountry";
    const urlIncomePerPersonByRegion =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/IncomePerPerson_ByCountry";
    const urlPopulationByRegion =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/Population_ByCountry";

    ///////////////////
    await converter(urlCountryRegionConverter, (results) => {
      const data = results.data;

      this.setState({ ...this.state, countryRegionConverter: results.data });
    });
    await converter(urlLifeExpectancyByRegion, (results) => {
      const data = results.data;
      let converted = [];
      for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        for (let key in obj) {
          if (key !== "country") {
            let pushThis = {};
            pushThis.time = key;
            pushThis.name = obj.country;
            pushThis.lifeExpectancy = obj[key];
            converted.push(pushThis);
          }
        }
      }
      this.setState({ ...this.state, lifeExpectancy: converted });
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
      // filters
      const years = this.state.years;
      const countries = this.state.countries;
      //
      const filteredLE = lifeExpectancyArr.filter(
        (obj) => years.includes(obj.time) && countries.includes(obj.name)
      );
      const filteredIPP = incomeArr.filter(
        (obj) => years.includes(obj.time) && countries.includes(obj.name)
      );
      const filteredPop = populationArr.filter(
        (obj) => years.includes(obj.time) && countries.includes(obj.name)
      );
      //
      const countryRegionConverter = this.state.countryRegionConverter;
      let combined = filteredLE;

      for (let i = 0; i < filteredIPP.length; i++) {
        let obj = filteredIPP[i];
        for (let j = 0; j < combined.length; j++) {
          if (combined[j].name === obj.name) {
            combined[j].incomePerPerson = obj["Income per person"];
          }
        }
      }

      for (let i = 0; i < filteredPop.length; i++) {
        let obj = filteredPop[i];
        for (let j = 0; j < combined.length; j++) {
          if (combined[j].name === obj.name) {
            combined[j].population = obj.Population;
          }
        }
      }
      for (let i = 0; i < countryRegionConverter.length; i++) {
        let obj = countryRegionConverter[i];
        for (let j = 0; j < combined.length; j++) {
          if (combined[j].name === obj.name) {
            combined[j].region = obj["four_regions"];
          }
        }
      }

      this.setState({ ...this.state, combined, data: combined });
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

    return (
      <div>
        <div className="plotArrow" ref={this.myRef}>
          {data ? <PlotFigure options={plotFuncArrow(this.state)} /> : "hi"}
        </div>
      </div>
    );
  }
}
