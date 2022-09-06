import React from "react";
import { converter } from "../../csvConverter";
import { dThreeFunction2 } from "./d3/dThree";
import { countryList } from "./CountryList";

export default class Population extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      countries: ["China", "United States of America"],
      display: "Child mortality",
      minYear: "",
      maxYear: "",
      splitYear: "",
      half: "2000",
      years: ["1980", "2020"],
    };

    this.selectCountry = this.selectCountry.bind(this);
    this.selectCountry2 = this.selectCountry2.bind(this);
  }
  async componentDidMount() {
    const urlPopulation =
      "https://raw.githubusercontent.com/open-numbers/ddf--gapminder--population/master/ddf--datapoints--population--by--country--year.csv";

    const results = await converter(urlPopulation);

    let NewcountryList = countryList.map((list) => {
      list[0] = list[0].toLowerCase();
      return list;
    });

    const data = results.data.map((obj) => {
      for (let i = 0; i < NewcountryList.length; i++) {
        let list = NewcountryList[i];

        if (list[0] === obj.country) {
          obj.country = list[1];
        }
      }
      return obj;
    });

    this.setState({ ...this.state, data: data });
  }

  componentDidUpdate() {
    let d3data = this.state.data.filter((obj, index) => obj.year < 2023);

    dThreeFunction2(d3data, this.state.countries);
  }
  selectCountry(evt) {
    if (evt.target.checked === true) {
      this.setState({
        ...this.state,
        countries: [...this.state.countries, evt.target.name],
      });
      let d3data = this.state.data.filter((obj, index) => obj.year < 2023);

      dThreeFunction2(d3data, this.state.countries);
    } else {
      this.setState({
        ...this.state,
        countries: this.state.countries.filter(
          (country) => country !== evt.target.name
        ),
      });
      let d3data = this.state.data.filter((obj, index) => obj.year < 2023);

      dThreeFunction2(d3data, this.state.countries);
    }
  }

  selectCountry2(evt) {
    const allcountry = this.state.data;
    const byCountry = d3.groups(allcountry, (d) => d.country);
    const country =
      evt.target.value.slice(0, 1).toUpperCase() + evt.target.value.slice(1);

    if (country) {
      const newState = {
        ...this.state,
        countries: [...this.state.countries, country],
      };
      this.setState(newState);
      let d3data = this.state.data.filter((obj, index) => obj.year < 2023);

      dThreeFunction2(d3data, this.state.countries);
    } else {
      const newState = {
        ...this.state,
        countries: this.state.countries.filter(
          (country) => country !== evt.target.value
        ),
      };
      this.setState(newState);
      let d3data = this.state.data.filter((obj, index) => obj.year < 2023);

      dThreeFunction2(d3data, this.state.countries);
    }
  }

  render() {
    const allcountry = this.state.data;
    const byCountry = d3.groups(allcountry, (d) => d.country);
    console.log(allcountry);
    console.log(byCountry);
    const showData = this.state.data.filter(
      (obj, index) => obj.country !== byCountry[0]
    );

    const countryName = countryList.map((country) => {
      return country[1];
    });

    return (
      <div>
        <div className="confine">
          <svg className="svg2" width="1525" height="950"></svg>

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
                  {byCountry.map((country, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        name={country[0]}
                        onClick={this.selectCountry}
                      />
                      {country[0]}
                    </div>
                  ))}
                </label>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
