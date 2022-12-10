import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Bubble from "./components/Bubble";
import LinearRegression from "./components/LinearRegression";
import PlotArrow from "./components/Arrow";
import PlotDensity from "./components/Density";
import PlotFacet from "./components/Facet";
import Home from "./components/Home";
import ImportantFacts from "./components/ImportantFacts";

import { getDataFromGithub } from "./store/dataReducer";

export class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData();
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/bubble" exact component={Bubble} />
          <Route path="/linearRegression" exact component={LinearRegression} />
          <Route path="/density" exact component={PlotDensity} />
          <Route path="/facet" exact component={PlotFacet} />
          <Route path="/arrow" exact component={PlotArrow} />
          <Route path="/importantFacts" exact component={ImportantFacts} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    );
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

export default connect(mapState, mapDispatch)(Routes);
