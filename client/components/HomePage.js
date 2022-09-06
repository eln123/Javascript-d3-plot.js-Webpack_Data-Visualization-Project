import React from "react";

class HomePage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="container__item landing-page-container">
          <div className="content__wrapper">
            <p className="coords">N 49° 16' 35.173" / W 0° 42' 11.30"</p>

            <div className="ellipses-container">
              <h1 className="greeting">DATA VISUALIZATION</h1>

              <div className="ellipses ellipses__outer--thin">
                <div className="ellipses ellipses__orbit"></div>
              </div>

              <div className="ellipses ellipses__outer--thick"></div>
            </div>

            <div className="scroller">
              <p className="page-title">npm C.E.E.D ©2022</p>

              <div className="timeline">
                <span className="timeline__unit"></span>
                <span className="timeline__unit timeline__unit--active"></span>
                <span className="timeline__unit"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
