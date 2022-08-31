import React from "react";
import { converter } from "../../csvConverter";
import { plotFuncArrow } from "./plot/plotArrow";
import { PlotFigure } from "plot-react";

export default class PlotArrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], countries: ["China", "United States"] };
    this.selectCountry = this.selectCountry.bind(this);
  }

  componentDidMount() {
    const urlLifeExpectancyPerCountry =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/LifeExpectancy_ByCountry";

    const fileStr2 = converter(urlLifeExpectancyPerCountry, (results) => {
      let newDataArr = [];
      for (let i = 0; i < results.data.length; i++) {
        let countryObj = results.data[i];

        for (let key in countryObj) {
          if (key !== "country") {
            let obj = {};
            obj.year = key;
            obj.country = countryObj.country;
            obj.lifeExpectancy = countryObj[key];
            newDataArr.push(obj);
          }
        }
      }

      this.setState({ ...this.state, data: newDataArr });
      console.log(this.state);
    });
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
    const data = this.state.data;
    const countriesCombined = d3.groups(data, (d) => d.country);

    const showData = this.state.data.filter(
      (obj, index) => obj.country !== countriesCombined[0]
    );
    if (!this.state.data.length) {
      return "hi";
    }

    return (
      <div>
        <div className="plotArrow" ref={this.myRef}>
          {this.state ? (
            <PlotFigure options={plotFuncArrow(this.state)} />
          ) : (
            "hi"
          )}
        </div>
        <div>
          <fieldset>
            <label htmlFor="myCheckBox">
              {countriesCombined.map((country, index) => (
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
    );
  }
}
