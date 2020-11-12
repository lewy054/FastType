import React from 'react';
import history from '../../history';
import './navBar.css';
import Profile from './profile/profile';


export default class NavBar extends React.Component {

  handleClick = () => {
    var nav = document.querySelector('.navigation');
    if (nav.classList.toggle('navigation--active')) {
      document.getElementById("overlay").style.display = "block";
    }
    else {
      document.getElementById("overlay").style.display = "none";
    }
  }

  goToMain = () => {
    history.push('/');
  }


  render() {
    return (
      <div>
        <div className="menu">
          <button className="hamburger" onClick={this.handleClick}>
            <span className="hamburger__box">
              <span className="hamburger__inner"></span>
            </span>
          </button>
          <h1 className="logo" onClick={this.goToMain}>
            FastType
          </h1>
          <div className="profile">
            <Profile />
          </div>
        </div>
      </div>
    )
  }
}