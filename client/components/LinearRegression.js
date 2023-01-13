import React from "react";
import { plotFuncLinearRegression } from "./plot/plotLinearRegression";
import { PlotFigure } from "plot-react";
import { connect } from "react-redux";

export class LinearRegression extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Child mortality",
      minYear: "",
      maxYear: "",
      splitYear: "",
      half: "2000",
      years: ["1980", "2020"],
      countries: ["China", "United States"],
      countryBeingSearched: "",
    };

    this.selectCountry = this.selectCountry.bind(this);
    this.searchCountry = this.searchCountry.bind(this);
    this.helper = this.helper.bind(this);
    this.changeMinYear = this.changeMinYear.bind(this);
    this.changeMaxYear = this.changeMaxYear.bind(this);
    this.updateMinYear = this.updateMinYear.bind(this);
    this.updateMaxYear = this.updateMaxYear.bind(this);
    this.updateSplitYear = this.updateSplitYear.bind(this);
    this.changeHalf = this.changeHalf.bind(this);
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
    if (this.state.display === "Life expectancy") {
      let data = this.props.data.lifeExpectancy;
      return {
        data: data,
        display: this.state.display,
        countries: this.state.countries,
        half: this.state.half,
        years: this.state.years,
      };
    }
    if (this.state.display === "Child mortality") {
      let data = this.props.data.childMortality;

      return {
        data: data,
        display: this.state.display,
        countries: this.state.countries,
        half: this.state.half,
        years: this.state.years,
      };
    }
    if (this.state.display === "Income per person") {
      let data = this.props.data.incomePerPerson;

      return {
        data: data,
        display: this.state.display,
        countries: this.state.countries,
        half: this.state.half,
        years: this.state.years,
      };
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
  selectCountry(evt) {
    if (evt.target.checked === true) {
      this.setState({
        ...this.state,
        countries: [...this.state.countries, evt.target.name],
      });
    } else {
      this.setState({
        ...this.state,
        countries: this.state.countries.filter(
          (country) => country !== evt.target.name
        ),
      });
    }
  }
  selectCountry2(evt) {
    const country =
      evt.target.value.slice(0, 1).toUpperCase() + evt.target.value.slice(1);

    if (country) {
      this.setState({
        ...this.state,
        countries: [...this.state.countries, country],
      });
    } else {
      this.setState({
        ...this.state,
        countries: this.state.countries.filter(
          (country) => country !== evt.target.value
        ),
      });
    }
  }
  searchCountry(evt) {
    this.setState({ ...this.state, countryBeingSearched: evt.target.value });
  }
  render() {
    if (this.props.data.lifeExpectancy) {
      let data = this.helper();
      let nameArr = this.props.data.countryRegionConverter.map(
        (obj) => obj.name
      );

      if (this.state.countryBeingSearched.length) {
        nameArr = nameArr.filter((country) =>
          country
            .toLowerCase()
            .includes(this.state.countryBeingSearched.toLowerCase())
        );
      }

      let checked = (country) => {
        if (this.state.countries.includes(country)) {
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
        <div id="graphContainer">
          <div id="plotContainer">
            <PlotFigure options={plotFuncLinearRegression(data)} />
          </div>

          <div id="yearFilterDiv">
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
          </div>

          <div id="subjectFilterDiv">
            <fieldset className="checkBoxesForDisplay">
              <label htmlFor="checkBox">
                {displays.map((display, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      name={display}
                      checked={checkForDisplay(display)}
                      onChange={this.selectDisplay}
                    />
                    {display}
                  </div>
                ))}
              </label>
            </fieldset>
          </div>

          <div id="linearRegressionCountryFilterDiv">
            <div id="countrySearchBox">
              <label htmlFor="searchBox"></label>
              <input
                type="text"
                id="countryFilterSearchInput"
                placeholder="Enter Country Name"
                onChange={(event) => this.searchCountry(event)}
              />
            </div>

            <div id="countryCheckbox">
              {nameArr.map((country, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name={country}
                    checked={checked(country)}
                    onChange={this.selectCountry}
                  />
                  {country}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return <div></div>;
  }
}

const mapState = (state) => {
  return { data: state.data };
};

export default connect(mapState)(LinearRegression);
