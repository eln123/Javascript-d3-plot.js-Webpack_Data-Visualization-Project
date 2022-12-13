import React from "react";
import { plotFuncArrow } from "./plot/plotArrow";
import { PlotFigure } from "plot-react";
import { connect } from "react-redux";
import { getDataFromGithub } from "../store/dataReducer";

export class PlotArrow extends React.Component {
  constructor() {
    super();
    this.state = {
      minYear: "",
      maxYear: "",
      years: ["1980", "2020"],
      display: "lifeExpectancy",
      countries: ["China", "United States", "India", "Afghanistan"],
      countryBeingSearched: "",
    };
    this.selectCountry = this.selectCountry.bind(this);
    this.searchCountry = this.searchCountry.bind(this);
    this.helper = this.helper.bind(this);
    this.changeMinYear = this.changeMinYear.bind(this);
    this.changeMaxYear = this.changeMaxYear.bind(this);
    this.updateMinYear = this.updateMinYear.bind(this);
    this.updateMaxYear = this.updateMaxYear.bind(this);
    this.selectDisplay = this.selectDisplay.bind(this);
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
    const childMortalityArr = this.props.data.childMortality;
    const incomeArr = this.props.data.incomePerPerson;
    const populationArr = this.props.data.population;
    const countryRegionConverter = this.props.data.countryRegionConverter;

    // filters
    const years = this.state.years;
    const countries = this.state.countries;
    const display = this.state.display;
    const filteredDisplay = () => {
      if (display === "lifeExpectancy") {
        return lifeExpectancyArr.filter(
          (obj) => years.includes(obj.time) && countries.includes(obj.name)
        );
      } else if (display === "Child mortality") {
        return childMortalityArr.filter(
          (obj) => years.includes(obj.time) && countries.includes(obj.name)
        );
      } else {
        return incomeArr.filter(
          (obj) => years.includes(obj.time) && countries.includes(obj.name)
        );
      }
    };
    let displayArr = filteredDisplay();

    const filteredIPP = incomeArr.filter(
      (obj) => years.includes(obj.time) && countries.includes(obj.name)
    );

    const filteredPop = populationArr.filter(
      (obj) => years.includes(obj.time) && countries.includes(obj.name)
    );

    let combined = displayArr;

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
    combined = combined.filter((obj) => obj.region);

    return { data: combined, years: this.state.years, display: display };
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
  searchCountry(evt) {
    this.state.countryBeingSearched = evt.target.value.toLowerCase();
    if (this.state.countryBeingSearched.length === 0) return;

    let boxPreSpread = document.getElementById("countryFilterDiv");
    let box = [...boxPreSpread.childNodes].map((div) =>
      div.innerText.toLowerCase()
    );
    let lengthSoFar = this.state.countryBeingSearched.length;

    let filteredBox = box.filter(
      (name) => name.slice(0, lengthSoFar) === this.state.countryBeingSearched
    );
    console.log(filteredBox);
    // if (this.state.countryBeingSearched.length) {
    //   let first = filteredBox[0];

    //   let newStart = [...boxPreSpread.childNodes].filter(
    //     (div) => div.innerText.toLowerCase() === first
    //   );

    //   boxPreSpread.scrollTo({
    //     top: newStart.offsetTop,
    //     behavior: "smooth",
    //   });
    // } else {
    //   let afg = [...boxPreSpread.childNodes][0];
    //   boxPreSpread.scrollTo({
    //     top: afg.offsetTop,
    //     behavior: "auto",
    //   });
    // }
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
      let checked = (country) => {
        if (this.state.countries.includes(country)) {
          return "checked";
        } else {
          return false;
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
            <PlotFigure options={plotFuncArrow(combined)} />
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

          <div id="countryFilterDiv">
            <div id="countrySearchBox">
              <label htmlFor="searchBox">
                <input
                  id="countryFilterSearchInput"
                  type="text"
                  placeholder="Enter Country Name"
                  onChange={(event) => this.searchCountry(event)}
                />
              </label>
            </div>

            <div>
              <label id="countryCheckbox" htmlFor="checkBox">
                {nameArr
                  .filter((country, index) => {
                    let chars =
                      this.state.countryBeingSearched.split("").length;
                    console.log(chars);

                    let countryChars = country.slice(0, chars);
                    if (index < 10 && chars) {
                      console.log(chars, countryChars);
                    }

                    if (chars && countryChars !== chars) return;
                  })
                  .map((country, index) => {
                    return (
                      <div key={index}>
                        <input
                          type="checkbox"
                          checked={checked(country)}
                          name={country}
                          onChange={this.selectCountry}
                        />
                        {country}
                      </div>
                    );
                  })}
              </label>
            </div>
          </div>
        </div>
      );
    }
    return <div></div>;
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
