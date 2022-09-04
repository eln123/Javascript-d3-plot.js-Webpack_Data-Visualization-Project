import React from "react";
import { converter } from "../../csvConverter";
import { plotFuncDensity } from "./plot/plotDensity";
import { PlotFigure } from "plot-react";
import { connect } from "react-redux";

export class PlotDensity extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.state = {
      regions: ["americas", "europe", "asia"],
      minYear: "",
      maxYear: "",
      years: ["1950", "2020"],
    };
    this.selectRegion = this.selectRegion.bind(this);
    this.helper = this.helper.bind(this);
    this.changeMinYear = this.changeMinYear.bind(this);
    this.changeMaxYear = this.changeMaxYear.bind(this);
    this.updateMinYear = this.updateMinYear.bind(this);
    this.updateMaxYear = this.updateMaxYear.bind(this);
  }
  updateMinYear(evt) {
    evt.preventDefault;
    this.setState({
      ...this.state,
      minYear: evt.target.value,
    });
  }
  updateMaxYear(evt) {
    this.setState({
      ...this.state,
      maxYear: evt.target.value,
    });
  }
  changeMinYear(evt) {
    evt.preventDefault();

    this.setState({
      ...this.state,
      years: [String(this.state.minYear), this.state.years[1]],
    });
  }
  changeMaxYear(evt) {
    evt.preventDefault();
    this.setState({
      ...this.state,
      years: [this.state.years[0], String(this.state.maxYear)],
    });
  }

  helper() {
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

    combined = combined.filter(
      (obj) => +obj.population > 0 && +obj.lifeExpectancy > 0
    );

    return combined;
  }

  selectRegion(evt) {
    if (evt.target.checked === true) {
      this.setState({
        ...this.state,
        regions: [...this.state.regions, String(evt.target.name)],
      });
    } else {
      const newState = {
        ...this.state,
        regions: this.state.regions.filter(
          (region) => region !== String(evt.target.name)
        ),
      };

      this.setState(newState);
    }
  }
  render() {
    if (this.props.data.lifeExpectancy) {
      let regionArr = ["asia", "americas", "africa", "europe"];
      let data = this.helper();
      let checked = (region) => {
        if (this.state.regions.includes(region)) {
          return "checked";
        }
      };
      return (
        <div className="confine">
          <PlotFigure options={plotFuncDensity(data)} />
          <form onSubmit={this.changeMinYear}>
            <label htmlFor="minYear"> MinYear </label>
            <input
              name="minYear"
              placeholder="minYear"
              onChange={this.updateMinYear}
            />
            <button type="submit"> Update </button>
          </form>

          <form onSubmit={this.changeMaxYear}>
            <label htmlFor="maxYear"> MaxYear </label>
            <input
              name="value"
              placeholder="maxYear"
              onChange={this.updateMaxYear}
            />
            <button type="submit"> Update </button>
          </form>
          <fieldset className="checkBoxes">
            <label htmlFor="checkBox">
              {regionArr.map((region, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name={region}
                    checked={checked(region)}
                    onClick={this.selectRegion}
                  />
                  {region}
                </div>
              ))}
            </label>
          </fieldset>
        </div>
      );
    }
    return <div></div>;
  }
}

const mapState = (state) => {
  return { data: state.data };
};

export default connect(mapState)(PlotDensity);
