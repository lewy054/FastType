import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import history from '../../history'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

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
import Stats from './stats/stats';
import InformationLesson from './practicePage/informationLesson/informationLesson';

export default class ContentPage extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 'home',
            lessonPage: '',
            logged: false,
            showLogin: 'none',
            showRegister: 'none',
            username: 'Gość',
        }
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        this.getUserName();
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

    logout = async () => {
        this.closeSideBar();
        await fetch('/logout', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            return response.text();
        }).then(text => {
            this.setState({
                username: 'Gość',
                logged: false,
            })
            toast.success('Wylogowano pomyślnie', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push('/');
        }).catch(error => console.log(error))
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

    getUserName = async () => {
        await fetch('/getUsername', {
            method: 'GET',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (response.status === 200) {
                return response.text().then(text => {
                    if (text) {
                        let username = (JSON.parse(text))['username']
                        this.setState({
                            username: username,
                            logged: true,
                        })
                    }
                })
            }
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <Register show={this.state.showRegister} closeRegister={this.closeRegister} />
                <Login show={this.state.showLogin} closeLogin={this.closeLogin} sendUserName={this.getUserName} />
                <div id="overlay" ></div>
                <div className="mainPage">
                    <Router history={history}>
                        <div className="navBar">
                            <NavBar username={this.state.username} showLogin={this.showLogin} showRegister={this.showRegister} logged={this.state.logged} logout={this.logout} />
                        </div>
                        <div ref={this.wrapperRef} className="sideBar">
                            <div className="navigation">
                                <div className="sidebar">
                                    {this.state.logged ?
                                        <ul className="navigation_list">
                                            <Link to="/"><li onClick={this.closeSideBar}><i className="fab fa-readme"></i>Wstęp</li></Link>
                                            <Link to="/practice"><li onClick={this.closeSideBar}><i className="fas fa-pen"></i>Praktyka</li></Link>
                                            <Link to="/freeMode"><li onClick={this.closeSideBar}><i className="fas fa-dice-three"></i>Tryb swobodny</li></Link>
                                            <Link to="/achievements"><li onClick={this.closeSideBar}><i className="fas fa-trophy"></i>Osiągnięcia</li></Link>
                                            <Link to="/stats"><li onClick={this.closeSideBar}><i className="fas fa-chart-pie"></i>Statystki</li></Link>
                                        </ul>
                                        : <ul className="navigation_list">
                                            <Link to="/"><li onClick={this.closeSideBar}><i className="fab fa-readme"></i>Wstęp</li></Link>
                                            <Link to="/practice"><li onClick={this.closeSideBar}><i className="fas fa-pen"></i>Praktyka</li></Link>
                                            <Link to="/freeMode"><li onClick={this.closeSideBar}><i className="fas fa-dice-three"></i>Tryb swobodny</li></Link>
                                        </ul>
                                    }
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
                            <Route
                                exact path='/practice/previewLesson/:id'
                                render={(props) => (
                                    <PreviewLesson {...props} logged={this.state.logged} />
                                )}
                            />
                            <Route
                                exact path='/practice/trainingLesson/:id'
                                render={(props) => (
                                    <TrainingLesson {...props} logged={this.state.logged} />
                                )}
                            />
                            <Route
                                exact path='/practice/summaryLesson/:id'
                                render={(props) => (
                                    <TrainingLesson {...props} logged={this.state.logged} />
                                )}
                            />
                            <Route
                                exact path='/practice/informationLesson/:id'
                                render={(props) => (
                                    <InformationLesson {...props} logged={this.state.logged} />
                                )}
                            />
                            <Route
                                exact path='/practice/practiceLesson/:id'
                                render={(props) => (
                                    <TrainingLesson {...props} logged={this.state.logged} />
                                )}
                            />
                            <Route path="/achievements" component={AchievementsList} />
                            <Route
                                exact path='/freeMode'
                                render={(props) => (
                                    <FreeMode {...props} logged={this.state.logged} />
                                )}
                            />
                            <Route path="/stats" component={Stats} />
                        </div>
                    </Router>
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <ToastContainer />
            </div>
        )
    }
}