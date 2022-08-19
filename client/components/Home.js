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
    const fileStr = converter(url, (results) => {
      this.setState({ data: results.data });
      dThreeFunction();
    });
  }
  render() {
    return (
      <div>
        <svg fill="black" width="500px" height="500px">
          <circle cx="50" cy="50" r="50" fill="black"></circle>
        </svg>
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
