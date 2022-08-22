import React from "react";
import { converter } from "../../csvConverter";
import { dThreeFunction } from "./dThree";
import { dThreeFunction2 } from "./dThree";
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

    const fileStr2 = converter(urlPopulation, (results) => {
      this.setState({ data: results.data });

      let d3data = this.state.data
        // .map((callback) => {
        //   // console.log(+callback.year);
        //   // console.log(callback);
        //   if (+callback.year < 2020) {
        //     return callback;
        //   }
        // })

        .filter((obj, index) => index < 30000);
      console.log(d3data);
      dThreeFunction2(d3data);
    });
  }
  render() {
    return (
      <div>
        <svg className="svg1" fill="black" width="500px" height="500px"></svg>
        <svg className="svg2" width="1200" height="1500"></svg>
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
              .filter((obj, index) => index < 20)
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
