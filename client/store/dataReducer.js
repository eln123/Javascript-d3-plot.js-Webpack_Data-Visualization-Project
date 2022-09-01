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

  let countryRegionConverter = await converter(urlCountryRegionConverter);

  state = { ...state, countryRegionConverter: countryRegionConverter.data };
  /////////////////
  let lifeExpectancy = await converter(urlLifeExpectancyByRegion);
  let data = lifeExpectancy.data;
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
  state = { ...state, lifeExpectancy: converted };

  ////////////////////
  let incomePerPerson = await converter(urlIncomePerPersonByRegion);
  state = { ...state, incomePerPerson: incomePerPerson.data };
  //////////////////////
  let population = await converter(urlPopulationByRegion);
  state = { ...state, population: population.data };
  /////////////////////////////
  /////////////////

  //////////////////
  ///////////////////
  dispatch(setData(state));
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_DATA:
      return action.data;
    default:
      return state;
  }
}
