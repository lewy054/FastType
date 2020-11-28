import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import history from '../../history'


import NavBar from '../navBar/navBar';
import HomePage from './homePage/homePage';
import PracticePage from './practicePage/practicePage';
import AchievementsList from './achievements/achievementsList';
import FreeMode from './freeMode/freeMode';

import PreviewLesson from './practicePage/previewLesson/previewLesson';
import TrainingLesson from './practicePage/trainingLesson/trainingLesson';

import Register from '../register/register';
import Login from '../login/login';

import './contentPage.css'

export default class ContentPage extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 'home',
            lessonPage: '',
            logged: false,
            showLogin: 'none',
            showRegister: 'none',
        }
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    //  close the sidebar after clicking outside of it
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (event.target.className !== 'hamburger' && event.target.className !== 'hamburger__box' && event.target.className !== 'hamburger__inner') {
                this.closeSideBar();
            }
        }
    }


    getLessonData = (lessonData) => {
        this.setState({
            page: lessonData[0],
            lessonId: lessonData[1],
        })
    }

    closeSideBar = () => {
        var nav = document.querySelector('.navigation');
        if (nav.classList.toggle('navigation--active')) {
            nav.classList.toggle('navigation--active');
        }
        document.getElementById("overlay").style.display = "none";
    }

    logout = () => {
        this.closeSideBar();
    }

    showLogin = () => {
        this.closeSideBar();
        this.setState({
            showLogin: 'block',
        })
    }

    showRegister = () => {
        this.closeSideBar();
        this.setState({
            showRegister: 'block',
        })
    }

    closeLogin = () => {
        this.setState({
            showLogin: 'none',
        })
    }

    closeRegister = () => {
        this.setState({
            showRegister: 'none',
        })
    }


    render() {
        return (
            <div>
                <Register show={this.state.showRegister} closeRegister={this.closeRegister} />
                <Login show={this.state.showLogin} closeLogin={this.closeLogin}/>
                <div id="overlay" ></div>
                <div className="mainPage">
                    <Router history={history}>
                        <div className="navBar">
                            <NavBar />
                        </div>
                        <div ref={this.wrapperRef} className="sideBar">
                            <div className="navigation">
                                <div className="sidebar">
                                    <ul className="navigation_list">
                                        <Link to="/"><li onClick={this.closeSideBar}><i className="fab fa-readme"></i>Wstęp</li></Link>
                                        <Link to="/practice"><li onClick={this.closeSideBar}><i className="fas fa-pen"></i>Praktyka</li></Link>
                                        <Link to="/achievements"><li onClick={this.closeSideBar}><i className="fas fa-trophy"></i>Osiągnięcia</li></Link>
                                        <Link to="/freeMode"><li onClick={this.closeSideBar}><i className="fas fa-dice-three"></i>Tryb swobodny</li></Link>
                                    </ul>
                                    <ul className="navigation_list_bottom">
                                        {this.state.logged ?
                                            <li onClick={this.logout}><i className="fas fa-sign-out-alt"></i>Wyloguj</li> :
                                            <div>
                                                <li onClick={this.showLogin}><i className="fas fa-sign-in-alt"></i>Zaloguj</li>
                                                <li onClick={this.showRegister}><i className="fas fa-user-plus fa-xs"></i>Zarejestruj</li>
                                            </div>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <Route exact path="/" component={HomePage} />
                            <Route
                                exact path='/practice'
                                render={(props) => (
                                    <PracticePage {...props} onLessonSelect={this.getLessonData} />
                                )}
                            />
                            <Route path="/achievements" component={AchievementsList} />
                            <Route path="/practice/previewLesson/:id" component={PreviewLesson} />
                            <Route path="/practice/trainingLesson/:id" component={TrainingLesson} />
                            <Route path="/freeMode" component={FreeMode} />
                        </div>
                    </Router>
                </div>
            </div>
        )
    }
}