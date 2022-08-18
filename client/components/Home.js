import React from "react";
import { converter } from "../../csvConverter";

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
    const url =
      "https://raw.githubusercontent.com/open-numbers/ddf--gapminder--population/master/ddf--datapoints--population--by--country--year.csv";
    const fileStr = converter(url, (results) => {
      this.setState({ data: results.data });
    });
  }
  render() {
    console.log(this.state);
    return (
      <div>
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
