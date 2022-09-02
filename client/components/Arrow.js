import React from "react";
import { converter } from "../../csvConverter";
import { plotFuncArrow } from "./plot/plotArrow";
import { PlotFigure } from "plot-react";
import { connect } from "react-redux";
import { getDataFromGithub } from "../store/dataReducer";

export class PlotArrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.state = {
      minYear: "",
      maxYear: "",
      years: ["1980", "2020"],

      countries: ["China", "United States", "India", "Afghanistan"],
    };
    this.selectCountry = this.selectCountry.bind(this);
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
    let test = evt;

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
    const countryRegionConverter = this.props.data.countryRegionConverter;

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

    return { data: combined, years: this.state.years };
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
      let data = this.props.data.lifeExpectancy.map((obj) => obj.name);
      let nameArr = [];
      for (let i = 0; i < data.length; i++) {
        let name = data[i];
        if (!nameArr.includes(name)) {
          nameArr.push(name);
        }
      }
      console.log(nameArr);
      return (
        <div>
          <PlotFigure options={plotFuncArrow(combined)} />
          <div>
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
          </div>
          <div className="checkBoxes">
            <fieldset>
              <label htmlFor="checkBox">
                {nameArr.map((country, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      name={country}
                      onClick={this.selectCountry}
                    />
                    {country}
                  </div>
                ))}
              </label>
            </fieldset>
          </div>
        </div>
      );
    }
    return <div>"hi"</div>;
  }
}
const mapState = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => {
      dispatch(getDataFromGithub());
    },
  };
};

export default connect(mapState, mapDispatch)(PlotArrow);
