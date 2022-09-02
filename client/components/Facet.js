import React from "react";
import { converter } from "../../csvConverter";
import { plotFuncFacet } from "./plot/plotFacet";
import { PlotFigure } from "plot-react";
import { connect } from "react-redux";

export class PlotFacet extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.state = {
      regions: ["americas", "europe", "asia"],
      years: ["1900", "1930"],
    };
    this.helper = this.helper.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
  }

  helper() {
    console.log(this.props);
    const lifeExpectancyArr = this.props.data.lifeExpectancy;
    const incomeArr = this.props.data.incomePerPerson;
    const populationArr = this.props.data.population;

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

    return combined;
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
    if (this.props.data.lifeExpectancy) {
      let combined = this.helper();
      return (
        <div>
          <PlotFigure options={plotFuncFacet(combined)} />
        </div>
      );
    } else {
      return "hi";
    }
  }
}

const mapState = (state) => {
  return { data: state.data };
};

export default connect(mapState)(PlotFacet);
