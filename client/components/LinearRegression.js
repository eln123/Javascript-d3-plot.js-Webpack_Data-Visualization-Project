import React from "react";

import { plotFuncLinearRegression } from "./plot/plotLinearRegression";
import { PlotFigure } from "plot-react";
import { connect } from "react-redux";

export class LinearRegression extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countries: ["China", "United States"], data: [] };

    this.selectCountry = this.selectCountry.bind(this);
    this.helper = this.helper.bind(this);
  }
  helper() {
    let data = this.props.data.lifeExpectancy;

    return { data: data, countries: this.state.countries };
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
      console.log(this.setState(newState));
    }
  }
  render() {
    if (this.props.data.lifeExpectancy) {
      let state = this.helper();
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
        <div className="confine">
          <div className="plotLinearRegression">
            <PlotFigure options={plotFuncLinearRegression(state)} />
          </div>
          <fieldset className="checkBoxes">
            <label htmlFor="checkBox">
              {nameArr.map((country, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name={country[0]}
                    onClick={this.selectCountry}
                  />
                  {country}
                </div>
              ))}
            </label>
          </fieldset>
          {/* <div>
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
          </div> */}
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
