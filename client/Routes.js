import React, { Component } from "react";
import { connect } from "react-redux";

import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Plot from "./components/Plot";
import Bubble from "./components/Bubble";

import LinearRegression from "./components/LinearRegression";
import PlotArrow from "./components/Arrow";
import PlotDensity from "./components/Density";
import PlotFacet from "./components/Facet";

import FeedbackPage from "./components/FeedbackPage";
import Aboutus from "./components/Aboutus";
import Contactus from "./components/ContactUs";

import { getDataFromGithub } from "./store/dataReducer";

/**
 * COMPONENT
 */

export class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData();
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <Switch>
          <Route path="/plot" exact component={Plot} />
          <Route path="/bubble" exact component={Bubble} />

          <Route path="/linearRegression" exact component={LinearRegression} />
          <Route path="/density" exact component={PlotDensity} />
          <Route path="/facet" exact component={PlotFacet} />
          <Route path="/arrow" exact component={PlotArrow} />
          <Route path="/feedback" exact component={FeedbackPage} />
          <Route path="/aboutus" exact component={Aboutus} />
          <Route path="/contact" exact component={Contactus} />

          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
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
