import React from 'react'




 class aboutUs1 extends React.Component {
  constructor(){
    super()
    this.state = {
      showlinks :true,
    }
  }

  componentDidUpdate(){

const panels = document.querySelectorAll('.panel')

function toggleOpen() {
	this.classList.toggle('open')
}

function toggleActive(event) {
	if (event.propertyName.includes('flex')) {
		this.classList.toggle('active')
	}
}

panels.forEach(panel => {
	panel.addEventListener('click', toggleOpen)
	panel.addEventListener('transitionend', toggleActive)
})


  }
  render() {
    return (
      <div className='aboutUs'>
        <section id="section01">
  <h3><img className='npmLogo' src='https://i.ibb.co/g7rkmSm/npmLogo.png'/></h3>
  <div className='quote'>
  <p>
    <h1>"Data visualization helps to bridge the gap between numbers and words"</h1>
    <p>-Brie E. Anderson</p>
  </p>
  </div>
      </section>
<div className="panels">
    <div className="panel panel1">
      <p>Meet the</p>
      <p>Dev Team</p>
      <p>Technologies</p>
      <img className="img-responsive" id="css3" src="//inf3cti0n95.github.io/img/css3.svg"/>
		<img className="img-responsive" id="html5" src="//inf3cti0n95.github.io/img/html5.svg"/>
		<img className="img-responsive" id="js" src="//inf3cti0n95.github.io/img/js.svg"/>
    <img className="img-responsive" id="D3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7EGo-Lt2Kw58PqIegd7MlYUTr5G7kE3vdJA&usqp=CAU"/>
		<img className="img-responsive" id="redux" src="https://daqxzxzy8xq3u.cloudfront.net/wp-content/uploads/2019/04/21032431/redux-cover-imgage-1024x768.jpg"/>
	  <img className="img-responsive" id="react" src="https://miro.medium.com/max/1400/0*EitUXT-pqbaQSCTt.gif"/>
    </div>
    <div className="panel panel2">
      <p><img src='https://media-exp1.licdn.com/dms/image/D4E35AQFeizMGDrQDfg/profile-framedphoto-shrink_100_100/0/1661741091938?e=1662829200&v=beta&t=lsNpyzHmDb7CJqokFIWaCRkmy96SWWBbyn7HAsr1xbk'/>Chris Lee</p>
      <p>C</p>
      <p>"Data is essential in decision making"</p>
    </div>
    <div className="panel panel3">

      <p><img src='https://media-exp1.licdn.com/dms/image/C4E03AQFHmXN9nIIOdQ/profile-displayphoto-shrink_100_100/0/1585526355754?e=1667433600&v=beta&t=yCnZP0BJLV_M8_vFAa16JrOi3tCmH1p05WvSOivdN-Y'/>Ethan Nair</p>
      <p>E</p>
      <p>"I like solving problems and adding value to the world."</p>
    </div>
    <div className="panel panel4">
      <p><img src='https://media-exp1.licdn.com/dms/image/D4D35AQG4kxUwteKEOw/profile-framedphoto-shrink_100_100/0/1658893281764?e=1662829200&v=beta&t=BD1A44hnX9xCgfKO6JGO-uAPz4Scbo0imXmZb5sKZoM'/>Emre Basbaydar</p>
      <p>E</p>
      <p>"Excited to apply an engineering mindset/practical technical skills to a developer role."</p>
    </div>
    <div className="panel panel5">
      <p><img src='https://media-exp1.licdn.com/dms/image/C4E03AQFd_0ANTs7NKw/profile-displayphoto-shrink_100_100/0/1659918831747?e=1667433600&v=beta&t=081o2vDkl54qsEQ7uKCXBzUGyeHGVouGSsTCAvCMTUc'/>Dat Vu</p>
      <p>D</p>
      <p>"I enjoy the fast-paced world of technology, collaborative work and the coding challenges."</p>
    </div>
  </div>
    </div>
    )
  }
}

export default aboutUs1
