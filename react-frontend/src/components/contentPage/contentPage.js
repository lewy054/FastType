import React from 'react';
import NavBar from '../navBar/navBar';
import SideBar from '../sideBar/sideBar'
import './contentPage.css'

import HomePage from './homePage/homePage';
import AboutPage from './aboutPage/aboutPage';
import PracticePage from './practicePage/practicePage';

import PreviewLesson from './practicePage/previewLesson/previewLesson';

export default class ContentPage extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 'home',
            lessonPage: '',
        }
    }

    getData = (page) => {
        this.setState({
            page: page,
        })
    }

    getLessonData = (lessonData) => {
        this.setState({
            page: lessonData[0],
            lessonId: lessonData[1],
        })
    }

    showPage = () => {
        switch (this.state.page) {
            case 'home':
                return <HomePage />;
            case 'practice':
                return <PracticePage onLessonSelect={this.getLessonData} />;
            case 'about':
                return <AboutPage />;
            case 'previewLesson':
                return <PreviewLesson lessonId={this.state.lessonId} />;
            default:
                return <HomePage />;
        }
    }

    showLesson = () => {
        switch (this.state.lessonPage) {
            case 'preview':
                console.log("preview");
                return <PreviewLesson />;
            case 'review':
                console.log("review");
                break;
            case 'practice':
                console.log("practice");
                break;
            // case 'practice':
            //     return <PracticePage/>
            // case 'about':
            //     return <AboutPage/>
            default:
                return <PracticePage />;
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