import React from 'react'

 class Contactus extends React.Component {
  constructor(){
    super()
    this.state = {
      showlinks :true,
    }
  }

  componentDidUpdate(){



  }




  render() {
    return (
      <div>
      <div>
        <h2> Contact </h2>
        <div>
            FSA @ interwebs.edu
        </div>
        <div>
            1-800-doesnotwork
        </div>
      </div>
    </div>
    )
  }
}

export default Contactus