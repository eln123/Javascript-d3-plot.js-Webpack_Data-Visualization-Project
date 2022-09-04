import React from "react";
import { converter } from "../../csvConverter";
import { plotFuncFacet } from "./plot/plotFacet";
import { PlotFigure } from "plot-react";
import { connect } from "react-redux";

export class PlotFacet extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.state = {
      minYear: "",
      maxYear: "",
      display: "lifeExpectancy",
      regions: ["americas", "europe", "asia"],
      years: ["1900", "1930"],
    };
    this.selectRegion = this.selectRegion.bind(this);
    this.helper = this.helper.bind(this);
    this.changeMinYear = this.changeMinYear.bind(this);
    this.changeMaxYear = this.changeMaxYear.bind(this);
    this.updateMinYear = this.updateMinYear.bind(this);
    this.updateMaxYear = this.updateMaxYear.bind(this);
    this.selectDisplay = this.selectDisplay.bind(this);
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
  selectDisplay(evt) {
    if (evt.target.checked === true) {
      if (evt.target.name === "Life expectancy") {
        this.setState({
          ...this.state,
          display: "lifeExpectancy",
        });
      }
      if (evt.target.name === "Child mortality") {
        this.setState({
          ...this.state,
          display: "Child mortality",
        });
      }
      if (evt.target.name === "Income per person") {
        this.setState({
          ...this.state,
          display: "Income per person",
        });
      }
    }
  }

  helper() {
    const lifeExpectancyArr = this.props.data.lifeExpectancy;
    const incomeArr = this.props.data.incomePerPerson;
    const populationArr = this.props.data.population;
    const childMortalityArr = this.props.data.childMortality;

    // filters
    const regions = this.state.regions;
    const minYear = this.state.years[0];

    const maxYear = this.state.years[1];
    //
    const display = this.state.display;
    if (display === "lifeExpectancy") {
      return { data: lifeExpectancyArr, display };
    }
    if (display === "Child mortality") {
      return { data: childMortalityArr, display };
    }
    if (display === "Income per person") {
      return { data: incomeArr, display };
    }
    // const filteredLE = lifeExpectancyArr.filter(
    //   (obj) =>
    //     regions.includes(obj.region) &&
    //     +obj.time <= +maxYear &&
    //     +obj.time >= +minYear
    // );

    // const filteredIPP = incomeArr.filter(
    //   (obj) =>
    //     regions.includes(obj.region) &&
    //     +obj.time < +maxYear &&
    //     +obj.time > +minYear
    // );
    // const filteredPop = populationArr.filter(
    //   (obj) =>
    //     regions.includes(obj.region) &&
    //     +obj.time < +maxYear &&
    //     +obj.time > +minYear
    // );

    // let combined = filteredLE;

    // for (let i = 0; i < filteredIPP.length; i++) {
    //   let obj = filteredIPP[i];
    //   for (let j = 0; j < combined.length; j++) {
    //     if (combined[j].name === obj.name && combined[j].time === obj.time) {
    //       combined[j].incomePerPerson = obj["Income per person"];
    //     }
    //   }
    // }

    // for (let i = 0; i < filteredPop.length; i++) {
    //   let obj = filteredPop[i];
    //   for (let j = 0; j < combined.length; j++) {
    //     if (combined[j].name === obj.name && combined[j].time === obj.time) {
    //       combined[j].population = obj.Population;
    //     }
    //   }
    // }

    // return combined;
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
      let data = this.helper();
      //   let datas = this.props.data.lifeExpectancy
      //     .map((obj) => obj.region)
      //     .filter((obj) => obj);
      //   let regionArr = [];
      //   for (let i = 0; i < datas.length; i++) {
      //     let region = datas[i];
      //     if (!regionArr.includes(region)) {
      //       regionArr.push(region);
      //     }
      //   }
      let regionArr = ["asia", "americas", "africa", "europe"];
      let checked = (region) => {
        if (this.state.regions.includes(region)) {
          return "checked";
        }
      };
      let displays = [
        "Life expectancy",
        "Child mortality",
        "Income per person",
      ];
      let checkForDisplay = (display) => {
        if (this.state.display === display) {
          return "checked";
        }
      };
      return (
        <div className="confine">
          <PlotFigure options={plotFuncFacet(data)} />
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
          <fieldset className="checkBoxesForDisplay">
            <label htmlFor="checkBox">
              {displays.map((display, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name={display}
                    checked={checkForDisplay(display)}
                    onClick={this.selectDisplay}
                  />
                  {display}
                </div>
              ))}
            </label>
          </fieldset>
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
    } else {
      return <div></div>;
    }
  }
}

const mapState = (state) => {
  return { data: state.data };
};

export default connect(mapState)(PlotFacet);
