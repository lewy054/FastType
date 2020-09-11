import React from 'react';
import './navBar.css';
import Profile from './profile/profile'


export default class NavBar extends React.Component {

  handleClick = () => {
    var nav = document.querySelector('.navigation');
    nav.classList.toggle('navigation--active');
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
          <h1 className="logo">
            FastType
          </h1>
          <Profile />
        </div>
      </div>
    )
  }
}