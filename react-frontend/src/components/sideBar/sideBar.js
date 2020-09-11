import React from 'react';
import './sideBar.css'

export default class SideBar extends React.Component {

    closeSideBar = () => {
        var nav = document.querySelector('.navigation');
        nav.classList.toggle('navigation--active');
      }

    homeClick = () => {
        this.closeSideBar();
        this.props.onPageChange('home');
    }
    profileClick = () => {
        this.closeSideBar();
        this.props.onPageChange('profile');
    }
    aboutClick = () => {
        this.closeSideBar();
        this.props.onPageChange('about');
    }
    render() {
        return (
            <div className="navigation">
                <div className="sidebar">
                    <ul className="navigation_list">
                        <li onClick={this.homeClick}><i className="fas fa-home"></i>Home</li>
                        <li onClick={this.profileClick}><i className="fas fa-user"></i>Profile</li>
                        <li onClick={this.aboutClick}><i className="fas fa-address-card"></i>About</li>
                    </ul>
                </div>
            </div>
        )
    }
}
