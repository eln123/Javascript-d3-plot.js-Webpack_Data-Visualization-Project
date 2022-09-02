//
// y = lifeExpectancy
// x = income
// circle size = population
// circle color = region

import React from "react";
import { bubbleFunc } from "./d3/dThreeBubble";
import { PlotFigure } from "plot-react";
import { connect } from "react-redux";

export class Bubble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      year: "2023",
      combined: [],
      lifeExpectancy: [],
      incomePerPerson: [],
      population: [],
      countryRegionConverter: [],
    };
    this.selectCountry = this.selectCountry.bind(this);
  }

  componentDidUpdate() {
    const lifeExpectancyArr = this.props.data.lifeExpectancy;
    const incomeArr = this.props.data.incomePerPerson;
    const populationArr = this.props.data.population;

    const year = this.state.year;
    const filteredLE = lifeExpectancyArr.filter((obj) => obj.time === year);
    const filteredIPP = incomeArr.filter((obj) => obj.time === year);
    const filteredPop = populationArr.filter((obj) => obj.time === year);
    //
    const countryRegionConverter = this.props.data.countryRegionConverter;

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
    console.log(combined);
    bubbleFunc(combined);
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
    return (
      
      <div id="backgroundOfBubblePage">
        <div className="bubble"></div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    data: state.data,
  };
};

export default connect(mapState)(Bubble);
