import React from "react";

class HomePage extends React.Component {
  render() {
    return (
      <div
        style={{ height: "100vh", width: "100vw", backgroundColor: "white" }}
      >
        <h1 style={{ position: "absolute", top: "27%", left: "30%" }}>
          Browse charts to see visuals
        </h1>
        <div
          style={{
            position: "absolute",
            top: "17.5%",
            left: "38%",
            transform: "rotate(-45deg)",
            height: "10px",
            width: "400px",
            backgroundColor: "red",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "11.5%",
            left: "47.6%",
            transform: "rotate(108deg)",
            height: "10px",
            width: "100px",
            backgroundColor: "red",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "9.8%",
            left: "46.5%",
            transform: "rotate(-20deg)",
            height: "10px",
            width: "100px",
            backgroundColor: "red",
          }}
        ></div>
        <div
          style={{
            width: "30vw",
            height: "35vh",
            position: "relative",
            top: "28%",
            left: "30%",
            display: "flex",
            flexDirection: "column",
            alignContent: "end",
            border: "2px solid black",
            padding: "0 0 0 0",
          }}
        >
          <h2
            style={{
              position: "absolute",
              left: "50%",
              top: "3%",
              transform: "translateX(-50%)",
              fontSize: "42px",
            }}
          >
            2 Important Facts
          </h2>
          <li
            style={{
              position: "absolute",
              left: "50%",
              top: "24%",
              transform: "translateX(-50%)",
              fontSize: "30px",
              width: "80%",
            }}
          >
            Extreme poverty across the globe has decreased from 40% to 10% since
            1980 (92% of people guess today's % as 30% or 50% before 10%)
          </li>
          <li
            style={{
              position: "absolute",
              left: "50%",
              top: "53%",
              transform: "translateX(-50%)",
              fontSize: "30px",
              width: "80%",
            }}
          >
            In 1990, 58% of the world's population lived in low-income
            countries. The share today is 9%. (93% of people guess 37% or 61%
            for today's share)
          </li>
        </div>
      </div>
    );
  }
}

export default HomePage;
