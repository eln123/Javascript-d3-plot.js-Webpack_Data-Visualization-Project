import React from 'react'


 class Aboutus extends React.Component {
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
            <h2>
        <div>Chris - Likes walks along the beach</div>
            
        <div>Ethan - Ate some granola</div>
        <div>Emre - He very good at changing baby diapers</div>
        <div>Dat - Just made up this about us section</div>
            
            </h2>
            

        </div>
    
    )
  }
}

export default Aboutus