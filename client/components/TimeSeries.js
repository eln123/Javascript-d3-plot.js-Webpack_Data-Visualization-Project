import React from "react";
import { drawChart } from "./dThreeTimeSeries";
import { converter } from "../../csvConverter";

export default class TimeSeries extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  componentDidMount() {
    const urlC02EmissionsUrl =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/CO2_emissions_per_ton";
    const fileStr2 = converter(urlC02EmissionsUrl, (results) => {
      let tempData = [];
      let data = results.data;
      let updated = [];
      for (let i = 0; i < data.length; i++) {
        let countryObj = data[i];
        let innerArr = [];
        for (let key in countryObj) {
          if (key !== "country") {
            let obj = { date: key, value: countryObj[key] };
            innerArr.push(obj);
          } else {
            let obj = { country: countryObj[key] };
            innerArr.push(obj);
          }
        }
        updated.push(innerArr);
      }

      this.setState({ data: updated });
      drawChart(updated);
    });
  }

  render() {
    return (
      <div>
        <div id="timeSeriesContainer"></div>
      </div>
    );
  }
}
