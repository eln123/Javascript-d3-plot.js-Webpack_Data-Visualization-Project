import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Plot from "./components/Plot";
import Bubble from "./components/Bubble";

import LinearRegression from "./components/LinearRegression";
import PlotArrow from "./components/Arrow";
import PlotDensity from "./components/Density";

import FeedbackPage from "./components/FeedbackPage";
import Aboutus from "./components/Aboutus";
import Contactus from "./components/ContactUs";

/**
 * COMPONENT
 */

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/plot" exact component={Plot} />
          <Route path="/bubble" exact component={Bubble} />

          <Route path="/linearRegression" exact component={LinearRegression} />
          <Route path="/density" exact component={PlotDensity} />
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
