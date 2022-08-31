import React from "react";

import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";

class Navi extends React.Component {
  constructor() {
    super();
    this.state = {
      showlinks: true,
    };
  }

  componentDidUpdate() {}

  render() {
    return (
      <div className="navbar_container">
        <div id="navi">
          <div className="leftside">
            <div className="links">
              <img id="home-icon" src="/home-icon.png" />
            </div>

            <div className="charts">
              <a href="/charts">Charts</a>
            </div>
            <div>
              <select
                onClick={(value, { history }) => history.push(`/${value}`)}
              >
                <option>path</option>
                <option>path</option>
              </select>
            </div>

            <div className="button">
              <button
                onClick={() =>
                  this.setState({ showlinks: !this.state.showlinks })
                }
              >
                Open
              </button>
            </div>
          </div>

          <div className="middle">
            <div className="links" id={this.state.showlinks ? "hidden" : ""}>
              <a href="/feedback">Feedback</a>
              <a href="/aboutus">About us</a>
              <a href="/contact">Contact</a>
            </div>

            {/* <div id={this.state.showlinks ? "hidden" : "" } class="chartlist">
              <h1>mmmm</h1>
              <a href='/chart-first'>Chart 1</a>
              <a href='/chart-second'>Chart 2</a>
              <a href='/chart-third'>Chart 3 </a>
          </div> */}
          </div>

          <div className="rightside">
            <div className="media-link">
              <a href="https://twitter.com/CeedNpm">
                <TwitterIcon />
              </a>
              <a href="https://www.instagram.com/data_visuals_by_npm_ceed/">
                <InstagramIcon />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100084793496578">
                <FacebookIcon />
              </a>
              <a href="https://github.com/2206-capstone-npm-CEED/Dashboard_data_visualization">
                <GitHubIcon />
              </a>
            </div>
            {/* <div  className='search'>
              <input type="text" placeholder='Search . . .'></input>
              <button>Search</button>
          </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Navi;
