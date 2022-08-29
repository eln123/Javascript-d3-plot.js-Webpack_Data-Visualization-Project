import React from "react";
import { converter } from "../../csvConverter";
import { dThreeFunction } from "./d3/dThree";
import { dThreeFunction2 } from "./d3/dThree";
import { test } from "./d3/byCountryD3";
import { useRef, useEffect } from "react";
import { ContactSupportOutlined } from "@material-ui/icons";
import { countryList } from "./CountryList";
// import { toDefaultValue } from "sequelize/types/utils";

/**
 * COMPONENT
 */

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      countries: [],
    };

    this.selectCountry = this.selectCountry.bind(this);
    this.selectCountry2 = this.selectCountry2.bind(this);
  }
  componentDidMount() {
    const urlC02Emissions =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/CO2_emissions_per_ton";
    const urlPopulation =
      "https://raw.githubusercontent.com/open-numbers/ddf--gapminder--population/master/ddf--datapoints--population--by--country--year.csv";
    const testurl =
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_connectedscatter.csv";

    const fileStr2 = converter(urlPopulation, (results) => {
      this.setState({ ...this.state, data: results.data });
    });
  }
  componentDidUpdate() {
    let d3data = this.state.data.filter((obj, index) => obj.year < 2023);

    dThreeFunction2(d3data, this.state.countries);
  }
  selectCountry(evt) {
    if (evt.target.checked === true) {
      const newState = {
        ...this.state,
        countries: [...this.state.countries, evt.target.name],
      };
      this.setState({
        ...this.state,
        countries: [...this.state.countries, evt.target.name],
      });
      let d3data = this.state.data.filter((obj, index) => obj.year < 2023);

      dThreeFunction2(d3data, this.state.countries);
    } else {
      const newState = {
        ...this.state,
        countries: this.state.countries.filter(
          (country) => country !== evt.target.name
        ),
      };
      this.setState(newState);
      let d3data = this.state.data.filter((obj, index) => obj.year < 2023);

      dThreeFunction2(d3data, this.state.countries);
    }
    // console.log("ASDFASFDSAFASDFASD", event);
    // console.log("event target", event.target);
    // console.log("this state2", newState);
  }

  selectCountry2(evt) {
    const value = document.getElementById("search").value;

    const allcountry = this.state.data;
    const byCountry = d3.groups(allcountry, (d) => d.country);

    //map thru byCountry and return value as country[0] at evt.target.value
    const singleCountry = byCountry.map((country) => country[0]);

    if (evt.target.value) {
      const newState = {
        ...this.state,
        countries: [...this.state.countries, evt.target.value],
      };
      this.setState({
        ...this.state,
        countries: [...this.state.countries, evt.target.value],
      });
      let d3data = this.state.data.filter((obj, index) => obj.year < 2023);

      dThreeFunction2(d3data, this.state.countries);
      console.log("111111111111", evt);
      console.log("event target11111", evt.target.value);
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
      console.log("222222222222222", evt);
      console.log("event target22222", evt.target.value);
    }
  }

  render() {
    // console.log(this.state.data);
    const allcountry = this.state.data;
    const byCountry = d3.groups(allcountry, (d) => d.country);
    // console.log(byCountry.map((country) => country[0]));
    const showData = this.state.data.filter(
      (obj, index) => obj.country !== byCountry[0]
    );
    // const ref = useRef(null);

    // useEffect(() => {
    //   const handleClick = (event) => {
    //     console.log("Button clicked");
    //   };

    //   const element = ref.current;

    //   element.addEventListener("click", handleClick);

    //   return () => {
    //     element.removeEventListener("click", handleClick);
    //   };
    // }, []);

    console.log(this.state);
    const countryName = countryList.map((country) => {
      if (country[0].toLowerCase() == byCountry[0]) return country[1];
    });

    return (
      <div>
        {/* <svg className="svg1" fill="black" width="500px" height="500px"></svg> */}
        <div className="confine">
          <svg className="svg2" width="1525" height="950"></svg>
          {/* <input type="checkbox" name="myCheckBox" /> */}
          <div className="checkBoxes">
            <label htmlFor="searchBox">
              <input
                type="text"
                className="search"
                id="search"
                placeholder="Country"
                onChange={(event) => this.selectCountry2(event)}
              />
            </label>

            {/* <datalist id="myList">

            {byCountry.map((country, index) => (
             <option  key={index} value={country[0]} onChange={this.selectCountry2}/>
              ))}

          </datalist>
            <input type="text" list="myList" placeholder='Country'></input> */}

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
                    {/* {countryName} */}
                  </div>
                ))}
              </label>
            </fieldset>
          </div>
        </div>
        {/* <svg className="my_dataviz" width="2200" height="1500"></svg> */}
        <div>_________________________________</div>
        {/* <table>
          <thead>
            <tr>
              <th>country</th>
              <th>year</th>
              <th>population</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data
              .filter((obj, index) => index < 20)
              .map((obj, index) => (
                <tr key={index}>
                  <td>{obj.country}</td>
                  <td>{obj.year}</td>
                  <td>{obj.population}</td>
                </tr>
              ))}
          </tbody>
        </table> */}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
