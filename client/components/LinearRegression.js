import React from "react";

import { plotFuncLinearRegression } from "./plot/plotLinearRegression";
import { PlotFigure } from "plot-react";
import { connect } from "react-redux";

export class LinearRegression extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minYear: "",
      maxYear: "",
      splitYear: "",
      half: "2000",
      years: ["1980", "2020"],
      countries: ["China", "United States"],
    };

    this.selectCountry = this.selectCountry.bind(this);
    this.helper = this.helper.bind(this);
    this.changeMinYear = this.changeMinYear.bind(this);
    this.changeMaxYear = this.changeMaxYear.bind(this);
    this.updateMinYear = this.updateMinYear.bind(this);
    this.updateMaxYear = this.updateMaxYear.bind(this);
    this.updateSplitYear = this.updateSplitYear.bind(this);
    this.changeHalf = this.changeHalf.bind(this);
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
  updateSplitYear(evt) {
    this.setState({
      ...this.state,
      splitYear: evt.target.value,
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
  changeHalf(evt) {
    evt.preventDefault();
    this.setState({
      ...this.state,
      half: this.state.splitYear,
    });
  }

  helper() {
    let data = this.props.data.lifeExpectancy;

    return {
      data: data,
      countries: this.state.countries,
      half: this.state.half,
      years: this.state.years,
    };
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
  selectCountry2(evt) {
    const country =
      evt.target.value.slice(0, 1).toUpperCase() + evt.target.value.slice(1);

    if (country) {
      const newState = {
        ...this.state,
        countries: [...this.state.countries, country],
      };
      this.setState(newState);
    } else {
      const newState = {
        ...this.state,
        countries: this.state.countries.filter(
          (country) => country !== evt.target.value
        ),
      };
      this.setState(newState);
    }
  }
  render() {
    if (this.props.data.lifeExpectancy) {
      let data = this.helper();
      let names = this.props.data.countryRegionConverter.map((obj) => obj.name);
      let checked = (country) => {
        if (this.state.countries.includes(country)) {
          return "checked";
        }
      };

      return (
        <div className="confine">
          {/* <div className="plotLinearRegression"> */}
          <PlotFigure options={plotFuncLinearRegression(data)} />
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
          <form onSubmit={this.changeHalf}>
            <label htmlFor="Split Year"> SplitYear </label>
            <input
              name="value"
              placeholder="Split Year"
              onChange={this.updateSplitYear}
            />
            <button type="submit"> Update </button>
          </form>
          <div>
            <label htmlFor="searchBox">
              <input
                type="text"
                className="search"
                id="search"
                placeholder="Enter Country Name"
                onChange={(event) => this.selectCountry2(event)}
              />
            </label>
            <div className="checkBoxes">
              <fieldset>
                <label htmlFor="checkBox">
                  {names.map((country, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        name={country}
                        checked={checked(country)}
                        onClick={this.selectCountry}
                      />
                      {country}
                    </div>
                  ))}
                </label>
              </fieldset>
            </div>
          </div>
          {/* </div> */}
        </div>
      );
    }
    return <div>hi</div>;
  }
}

const mapState = (state) => {
  return { data: state.data };
};

export default connect(mapState)(LinearRegression);
