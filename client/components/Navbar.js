import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import SearchBar from "./SearchBar";
import { converter } from "../../csvConverter";

const dataJson = converter(
  "https://raw.githubusercontent.com/open-numbers/ddf--gapminder--population/master/ddf--datapoints--population--by--country--year.csv"
);
// console.log('((()()()()()', dataJson)

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home"></Link>
          <a href="#" onClick={handleClick}></a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login"></Link>
          <Link to="/signup"></Link>
        </div>
      )}
      <SearchBar placeholder="Enter a Country" data={dataJson} />
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
