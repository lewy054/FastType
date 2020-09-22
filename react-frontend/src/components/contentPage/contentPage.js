import React from 'react';
import NavBar from '../navBar/navBar';
import SideBar from '../sideBar/sideBar'
import './contentPage.css'

import HomePage from './homePage/homePage';
import AboutPage from './aboutPage/aboutPage';
import PracticePage from './practice/practice';

export default class ContentPage extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 'home',
        }
    }

    getData = (page) => {
        this.setState({
            page: page,
        })
        console.log(this.state.page);
    }

    showPage = () => {
        switch (this.state.page) {
            case 'home':
                return <HomePage/>
            case 'practice':
                return <PracticePage/>
            case 'about':
                return <AboutPage/>
            default:
                return <HomePage/>
        }
    }

    render() {
        return (
            <div className="mainPage">
                <div className="navBar">
                    <NavBar />
                </div>
                <div className="sideBar">
                    <SideBar onPageChange={this.getData} />
                </div>
                <div className="content">
                    {this.showPage()}
                </div>
            </div>
        )
    }
}