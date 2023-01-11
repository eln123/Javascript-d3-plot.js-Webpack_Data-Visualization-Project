import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <div
        style={{
          fontSize: "30px",
          display: "flex",
          backgroundColor: "gold",
          color: "black",
          height: "100px",
          alignItems: "center",
          justifyContent: "center",
          gap: "100px",
        }}
      >
        <Link style={{ color: "black" }} to="/">
          Home
        </Link>

        {/* <Link style={{ color: "black" }} to="/importantFacts">
          Important Facts
        </Link> */}

        <div className="dropdown">
          <button
            style={{
              fontSize: "27px",
              backgroundColor: "gray",
              color: "white",
              width: "125px",
              height: "75px",
            }}
          >
            Charts
          </button>
          <div className="dropdown-content">
            <a href="/arrow">Arrow</a>
            <a href="/linearRegression">Linear Regression</a>

            <a href="/density">Density</a>

            <a href="/bubble">Bubble</a>
            <a href="/facet">Facet</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
