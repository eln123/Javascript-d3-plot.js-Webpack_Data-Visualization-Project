import axios from "axios";
import { converter } from "../../csvConverter";

const SET_DATA = "SET_DATA";

const setData = (data) => ({ type: SET_DATA, data });

export const getDataFromGithub = () => async (dispatch) => {
  const urlCountryRegionConverter =
    "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/Countries_Regions";
  const urlLifeExpectancyByRegion =
    "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/LifeExpectancy_ByCountry";
  const urlIncomePerPersonByRegion =
    "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/IncomePerPerson_ByCountry";
  const urlPopulationByRegion =
    "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/Population_ByCountry";

  let state = {};

  ///////////////////
  await converter(urlCountryRegionConverter, (results) => {
    const data = results.data;

    state = { state, countryRegionConverter: results.data };
  });
  await converter(urlLifeExpectancyByRegion, (results) => {
    const data = results.data;
    let converted = [];
    for (let i = 0; i < data.length; i++) {
      let obj = data[i];
      for (let key in obj) {
        if (key !== "country") {
          let pushThis = {};
          pushThis.time = key;
          pushThis.name = obj.country;
          pushThis.lifeExpectancy = obj[key];
          converted.push(pushThis);
        }
      }
    }
    state = { state, lifeExpectancy: converted };
  });

  ////////////////////
  await converter(urlIncomePerPersonByRegion, (results) => {
    state = { state, incomePerPerson: results.data };
  });
  //////////////////////
  await converter(urlPopulationByRegion, (results) => {
    state = { ...state, population: results.data };
  });

  await converter(urlPopulationByRegion, (results) => {
    state = { ...state };
    console.log(state);
    setData("hi", state);
  });
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_DATA:
      return action.data;
    default:
      return state;
  }
}
