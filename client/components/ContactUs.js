import React from "react";

class Contactus extends React.Component {
  constructor() {
    super();
    this.state = {
      showlinks: true,
    };
  }

  render() {
    return (
      <div>
        <h3>
          <img className="npmLogo" src="https://i.ibb.co/g7rkmSm/npmLogo.png" />
        </h3>
        <section id="contact">
          <div className="content">
            <div id="form">
              <form action="" id="contactForm" method="post">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  className="name"
                  placeholder="Enter your name"
                />
                <span>Email</span>
                <input
                  type="text"
                  name="email"
                  className="email"
                  placeholder="Enter your email"
                />

                <div className="message" placeholder="Enter your message">
                  {" "}
                </div>
                <input
                  type="submit"
                  name="submit"
                  value="Send e-mail"
                  className="submit"
                />
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Contactus;
