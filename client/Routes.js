import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Plot from "./components/Plot";
import PlotMerged from "./components/PlotMerged";
import HomeEthan from "./components/HomeEthan";
import LinearRegression from "./components/LinearRegression";
import TimeSeries from "./components/TimeSeries";
import { me } from "./store";

import FeedbackPage from "./components/FeedbackPage";
import Aboutus from "./components/Aboutus";
import Contactus from "./components/ContactUs";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/plot" exact component={Plot} />
          <Route path="/linearRegression" exact component={LinearRegression} />
          <Route path="/plotMerged" exact component={PlotMerged} />
          <Route path="/homeEthan" exact component={HomeEthan} />
          <Route path="/timeseries" exact component={TimeSeries} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/feedback" exact component={FeedbackPage} />
          <Route path="/aboutus" exact component={Aboutus} />
          <Route path="/contact" exact component={Contactus} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
