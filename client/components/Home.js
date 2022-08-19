import React from "react";
import { converter } from "../../csvConverter";
import { dThreeFunction } from "./dThree";

/**
 * COMPONENT
 */

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const urlC02Emissions =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/CO2_emissions_per_ton";
    const urlPopulation =
      "https://raw.githubusercontent.com/open-numbers/ddf--gapminder--population/master/ddf--datapoints--population--by--country--year.csv";

    const fileStr = converter(urlPopulation, (results) => {
      this.setState({ data: results.data });
      let d3data = this.state.data.filter((obj, index) => index < 10);
      console.log(d3data);
      dThreeFunction(d3data);
    });
  }
  render() {
    return (
      <div>
        <svg fill="black" width="500px" height="500px"></svg>

        <div>_________________________________</div>
        <table>
          <thead>
            <tr>
              <th>country</th>
              <th>year</th>
              <th>population</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data
              .filter((obj, index) => index < 50)
              .map((obj, index) => (
                <tr key={index}>
                  <td>{obj.country}</td>
                  <td>{obj.year}</td>
                  <td>{obj.population}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
