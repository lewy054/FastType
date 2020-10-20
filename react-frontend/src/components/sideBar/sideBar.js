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
    practiceClick = () => {
        this.closeSideBar();
        this.props.onPageChange('practice');
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
                        <li onClick={this.homeClick}><i className="fab fa-readme"></i>Wstęp</li>
                        <li onClick={this.practiceClick}><i className="fas fa-pen"></i>Praktyka</li>
                        <li onClick={this.aboutClick}><i className="fas fa-address-card"></i>About</li>
                    </ul>
                </div>
            </div>
        )
    }
}
