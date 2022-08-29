
import React from 'react'

import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';

 class Navi extends React.Component {
  constructor(){
    super()
    this.state = {
      showlinks :false,
    }
  }

  componentDidUpdate(){



  }




  render() {
    return (
      <div  className='navbar_container'>
      <div id='navi' >
        <div className='leftside'>
          <div className='links'>
          <img id="home-icon" src="/home-icon.png" />
          </div>
          <a href='/charts'>Charts</a>
        </div>

        <div className='middle'>
          <div className='links'>
              <a href='/feedback'>Feedback</a>
              <a href='/about'>About</a>
              <a href='/contact'>Contact</a>
          </div>
        </div>

        <div className='rightside'>
          <div  className='media-link'>
            <a href='/instagram'>
            <InstagramIcon/>
            </a>
            <a href='/facebook'>
              <FacebookIcon/>
            </a>
            <a>
              <TwitterIcon/>
            </a>
            <a href="https://github.com/2206-capstone-npm-CEED/Dashboard_data_visualization">
              <GitHubIcon/>
            </a>
          </div>
          <div  className='search'>
              <input type="text" placeholder='Search . . .'></input>
              <button>Search</button>
          </div>

        </div>
      </div>
    </div>
    )
  }
}

export default Navi








