import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Population from "./components/Population";
import Bubble from "./components/Bubble";
import LinearRegression from "./components/LinearRegression";
import PlotArrow from "./components/Arrow";
import PlotDensity from "./components/Density";
import PlotFacet from "./components/Facet";
import HomePage from "./components/HomePage";
import FeedbackPage from "./components/FeedbackPage";
import Aboutus from "./components/Aboutus";
import Contactus from "./components/ContactUs";

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
          <Route path="/feedback" exact component={FeedbackPage} />
          <Route path="/aboutus" exact component={Aboutus} />
          <Route path="/contact" exact component={Contactus} />
          <Route path="/home" exact component={HomePage} />
          <Route path="/Population" exact component={Population} />
          <Route path="/" exact component={HomePage} />
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
