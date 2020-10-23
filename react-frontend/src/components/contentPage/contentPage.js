import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import history from '../../history'


import NavBar from '../navBar/navBar';
import HomePage from './homePage/homePage';
import AboutPage from './aboutPage/aboutPage';
import PracticePage from './practicePage/practicePage';

import PreviewLesson from './practicePage/previewLesson/previewLesson';

import './contentPage.css'

export default class ContentPage extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 'home',
            lessonPage: '',
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
        nav.classList.toggle('navigation--active');
    }

    render() {
        return (
            <div className="mainPage">
                <Router history={history}>
                    <div className="navBar">
                        <NavBar />
                    </div>
                    <div className="sideBar">
                        <div className="navigation">
                            <div className="sidebar">
                                <ul className="navigation_list">
                                    <Link to="/"><li onClick={this.closeSideBar}><i className="fab fa-readme"></i>Wstęp</li></Link>
                                    <Link to="/practice"><li onClick={this.closeSideBar}><i className="fas fa-pen"></i>Praktyka</li></Link>
                                    <Link to="/about"><li onClick={this.closeSideBar}><i className="fas fa-address-card"></i>About</li></Link>
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
                        <Route path="/about" component={AboutPage} />
                        <Route path="/practice/previewLesson/:id" component={PreviewLesson} />
                        <Route path="/practice/trainingLesson/:id" component={PreviewLesson} />
                    </div>
                </Router>
            </div>
        )
    }
}