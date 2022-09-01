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
      years: ["1980", "2020"],

      countries: ["China", "United States", "India", "Afghanistan"],
    };
    this.selectCountry = this.selectCountry.bind(this);
    this.helper = this.helper.bind(this);
  }
  helper() {
    const lifeExpectancyArr = this.props.data.lifeExpectancy;
    console.log(lifeExpectancyArr);
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
    console.log(this.props.data);


    if (this.props.data.lifeExpectancy) {
      let combined = this.helper();
      return <PlotFigure options={plotFuncArrow(combined)} />;
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
