import React from "react";
import { converter } from "../../csvConverter";
import { plotFuncDensity } from "./plot/plotDensity";
import { PlotFigure } from "plot-react";

export default class PlotDensity extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.state = {
      data: [],

      combined: [],
      lifeExpectancy: [],
      incomePerPerson: [],
      population: [],
      regions: ["americas", "europe", "asia"],
      years: ["1950", "2020"],
      countryRegionConverter: [],
    };
    this.selectCountry = this.selectCountry.bind(this);
  }

  async componentDidMount() {
    const urlCountryRegionConverter =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/Countries_Regions";
    const urlLifeExpectancyByCountry =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/LifeExpectancy_ByCountry";
    const urlIncomePerPersonByCountry =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/IncomePerPerson_ByCountry";
    const urlPopulationByCountry =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/Population_ByCountry";

    ///////////////////
    await converter(urlCountryRegionConverter, (results) => {
      const data = results.data;

      this.setState({ ...this.state, countryRegionConverter: results.data });
    });
    await converter(urlLifeExpectancyByCountry, (results) => {
      const data = results.data;
      let fixed = [];
      for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        for (let key in obj) {
          if (key !== "country") {
            let pushThis = {};
            pushThis.time = key;
            pushThis.name = obj.country;
            pushThis.lifeExpectancy = obj[key];
            fixed.push(pushThis);
          }
        }
      }
      const countryRegionConverter = this.state.countryRegionConverter;
      let lifeExpectancyData = fixed.map((obj) => {
        for (let i = 0; i < countryRegionConverter.length; i++) {
          let converterObj = countryRegionConverter[i];

          if (converterObj.name === obj.name) {
            obj.region = converterObj["four_regions"];
          }
        }
        return obj;
      });
      this.setState({ ...this.state, lifeExpectancy: lifeExpectancyData });
    });

    ////////////////////
    await converter(urlIncomePerPersonByCountry, (results) => {
      let data = results.data;

      const countryRegionConverter = this.state.countryRegionConverter;
      let incomeData = results.data.map((obj) => {
        for (let i = 0; i < countryRegionConverter.length; i++) {
          let converterObj = countryRegionConverter[i];

          if (converterObj.name === obj.name) {
            obj.region = converterObj["four_regions"];
          }
        }
        return obj;
      });

      this.setState({ ...this.state, incomePerPerson: incomeData });
    });
    //////////////////////
    await converter(urlPopulationByCountry, (results) => {
      const countryRegionConverter = this.state.countryRegionConverter;
      let populationData = results.data.map((obj) => {
        for (let i = 0; i < countryRegionConverter.length; i++) {
          let converterObj = countryRegionConverter[i];

          if (converterObj.name === obj.name) {
            obj.region = converterObj["four_regions"];
          }
        }
        return obj;
      });
      this.setState({ ...this.state, population: populationData });
    });

    await converter(urlPopulationByCountry, (results) => {
      this.setState({ ...this.state });

      const lifeExpectancyArr = this.state.lifeExpectancy;
      const incomeArr = this.state.incomePerPerson;
      const populationArr = this.state.population;

      let combinedDataArr = [];
      // filters
      const regions = this.state.regions;
      const minYear = this.state.years[0];

      const maxYear = this.state.years[1];
      //
      const filteredLE = lifeExpectancyArr.filter(
        (obj) =>
          regions.includes(obj.region) &&
          +obj.time <= +maxYear &&
          +obj.time >= +minYear
      );

      const filteredIPP = incomeArr.filter(
        (obj) =>
          regions.includes(obj.region) &&
          +obj.time < +maxYear &&
          +obj.time > +minYear
      );
      const filteredPop = populationArr.filter(
        (obj) =>
          regions.includes(obj.region) &&
          +obj.time < +maxYear &&
          +obj.time > +minYear
      );
      //
      const countryRegionConverter = this.state.countryRegionConverter;
      let combined = filteredLE;

      for (let i = 0; i < filteredIPP.length; i++) {
        let obj = filteredIPP[i];
        for (let j = 0; j < combined.length; j++) {
          if (combined[j].name === obj.name && combined[j].time === obj.time) {
            combined[j].incomePerPerson = obj["Income per person"];
          }
        }
      }

      for (let i = 0; i < filteredPop.length; i++) {
        let obj = filteredPop[i];
        for (let j = 0; j < combined.length; j++) {
          if (combined[j].name === obj.name && combined[j].time === obj.time) {
            combined[j].population = obj.Population;
          }
        }
      }
      for (let i = 0; i < countryRegionConverter.length; i++) {
        let obj = countryRegionConverter[i];
        for (let j = 0; j < combined.length; j++) {
          if (combined[j].name === obj.name && combined[j].time === obj.time) {
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
          {data ? (
            <PlotFigure options={plotFuncDensity(this.state.data)} />
          ) : (
            "hi"
          )}
        </div>
      </div>
    );
  }
}
