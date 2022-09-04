import React from "react";

class FeedbackPage extends React.Component {
  constructor() {
    super();
    this.state = {
      showlinks: true,
    };
  }

  componentDidUpdate() {}
  render() {
    return (
      <div className="feedback">
        <h3>
          <img className="npmLogo" src="https://i.ibb.co/g7rkmSm/npmLogo.png" />
        </h3>
        <div id="form-main">
          <div id="form-div">
            <form className="form" id="form1">
              <p className="name">
                <input
                  name="name"
                  type="text"
                  className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                  placeholder="Name"
                  id="name"
                />
              </p>

              <p className="email">
                <input
                  name="email"
                  type="text"
                  className="validate[required,custom[email]] feedback-input"
                  id="email"
                  placeholder="Email"
                />
              </p>

              <p className="text">
                <textarea
                  name="text"
                  className="validate[required,length[6,300]] feedback-input"
                  id="comment"
                  placeholder="Comment"
                ></textarea>
              </p>

              <div className="submit">
                <input type="submit" value="Send" id="button-blue" />
                <div className="ease"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedbackPage;
