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
      updatedYear: "",
      year: "2023",
      display: "lifeExpectancy",
      regions: ["africa", "americas", "asia", "europe"],
    };
    this.selectRegion = this.selectRegion.bind(this);
    this.updateYear = this.updateYear.bind(this);
    this.changeYear = this.changeYear.bind(this);
  }

  componentDidUpdate() {
    const lifeExpectancyArr = this.props.data.lifeExpectancy;
    const incomeArr = this.props.data.incomePerPerson;
    const populationArr = this.props.data.population;
    const childMortalityArr = this.props.data.childMortality;

    const year = this.state.year;
    const regions = this.state.regions;
    const filteredLE = lifeExpectancyArr.filter(
      (obj) => obj.time === year && regions.includes(obj.region)
    );
    const filteredIPP = incomeArr.filter(
      (obj) => obj.time === year && regions.includes(obj.region)
    );
    const filteredPop = populationArr.filter(
      (obj) => obj.time === year && regions.includes(obj.region)
    );
    const filteredCM = childMortalityArr.filter(
      (obj) => obj.time === year && regions.includes(obj.region)
    );
    const countryRegionConverter = this.props.data.countryRegionConverter;
    //
    let display = this.state.display;
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
    let bubbleObj = { data: combined, display: display };
    bubbleFunc(bubbleObj);
  }

  updateYear(evt) {
    this.setState({
      ...this.state,
      updatedYear: evt.target.value,
    });
  }
  changeYear(evt) {
    evt.preventDefault();

    this.setState({
      ...this.state,
      year: String(this.state.updatedYear),
      yearFilterChange: true,
    });
  }
  selectRegion(evt) {
    console.log("selectRegionStarted");
    if (evt.target.checked === true) {
      this.setState({
        ...this.state,
        regions: [...this.state.regions, String(evt.target.name)],
      });
    } else {
      console.log(this.state);
      const newState = {
        ...this.state,
        regions: this.state.regions.filter(
          (region) => region !== String(evt.target.name)
        ),
      };
      console.log(newState);
      this.setState(newState);
      console.log(this.state);
    }
  }
  render() {
    if (this.props.data.lifeExpectancy) {
      let regionArr = ["asia", "americas", "africa", "europe"];
      let checked = (region) => {
        if (this.state.regions.includes(region)) {
          return "checked";
        }
      };
      return (
        <div className="confine">
          <div className="bubble"></div>
          <form onSubmit={this.changeYear}>
            <label htmlFor="maxYear"> Current Year: {this.state.year} </label>
            <input name="value" placeholder="Year" onChange={this.updateYear} />
            <button type="submit"> Update </button>
          </form>
          <fieldset className="checkBoxes">
            <label htmlFor="checkBox">
              {regionArr.map((region, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    checked={checked(region)}
                    name={region}
                    onClick={this.selectRegion}
                  />
                  {region}
                </div>
              ))}
            </label>
          </fieldset>
        </div>
      );
    } else {
      return <div></div>;
    }
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
