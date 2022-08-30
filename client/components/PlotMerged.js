import React from "react";
import { converter } from "../../csvConverter";
import { plotFunc } from "./plot/plotLineChart";
import { PlotFigure } from "plot-react";

export default class PlotMerged extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], countries: ["chn", "usa"] };
    this.myRef = React.createRef();
    this.selectCountry = this.selectCountry.bind(this);
  }

  componentDidMount() {
    const urlPopulation =
      "https://raw.githubusercontent.com/open-numbers/ddf--gapminder--population/master/ddf--datapoints--population--by--country--year.csv";

    const fileStr2 = converter(urlPopulation, (results) => {
      this.setState({ ...this.state, data: results.data });
    });
  }

  selectCountry(evt) {
    if (evt.target.checked === true) {
      this.setState({
        ...this.state,
        countries: [...this.state.countries, evt.target.name],
      });
      console.log(this.state);
    } else {
      const newState = {
        ...this.state,
        countries: this.state.countries.filter(
          (country) => country !== evt.target.name
        ),
      };

      this.setState(newState);
      console.log(this.state);
    }
    // const chart = plotFunc(this.state);

    // this.myRef.current.append(chart);
  }
  render() {
    const allcountry = this.state.data;
    const byCountry = d3.groups(allcountry, (d) => d.country);

    const showData = this.state.data.filter(
      (obj, index) => obj.country !== byCountry[0]
    );
    if (!this.state.data.length) {
      return "hi";
    }
    return (
      <div className="confine">
        <div className="plot" ref={this.myRef}>
          <PlotFigure options={plotFunc(this.state)} />
        </div>
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
    );
  }
}
