import React from "react";

import { plotFuncLinearRegression } from "./plot/plotLinearRegression";
import { PlotFigure } from "plot-react";
import { connect } from "react-redux";

export class LinearRegression extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countries: ["China", "United States"] };
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
    }
  }
  render() {
    if (this.props.data.lifeExpectancy) {
      let state = this.helper();

      return (
        <div className="plotLinear">
          <div className="plotLinearRegression">
            <PlotFigure options={plotFuncLinearRegression(state)} />
          </div>

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
