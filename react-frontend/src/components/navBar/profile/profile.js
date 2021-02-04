import React from 'react';
import { Overlay, Popover, Button, ButtonGroup, ProgressBar } from 'react-bootstrap';
import { toast } from 'react-toastify';
import achievement from '../../../content/achievements.json';
import lessons from '../../../content/lessons.json';
import './profile.css'


export default class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false,
            target: null,
            done_lesson_count: 0,
            lesson_count: 0,
            done_achievement_count: 0,
            achievement_count: 0,
        }
    }

    componentDidMount() {
        this.getAvgValues();
        this.setState({
            lesson_count: Object.keys(lessons).length,
            achievement_count: Object.keys(achievement).length,
        })
    }

    handleClick = (event) => {
        this.setState({
            show: !this.state.show,
            target: event.target,
        })
    };

    showLogin = () => {
        this.props.showLogin();
        this.setState({
            show: false,
        })
    }

    showRegister = () => {
        this.props.showRegister();
        this.setState({
            show: false,
        })
    }

    logout = () => {
        this.props.logout();
        this.setState({
            show: false,
        })
    }

    getLessonsNow = () => {
        return (100 / this.state.lesson_count)
    }


    getAchievementsNow = () => {
        return (100 / this.state.achievement_count)
    }

    getAvgValues = async () => {
        await fetch('/getAvgValues', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (response.status === 200) {
                return response.text().then(text => {
                    let stats = JSON.parse(text)
                    this.setState({
                        done_achievement_count: stats['achievement_count'],
                        done_lesson_count: stats['lesson_count'],
                    })
                })
            }
            else {
                return response.text().then(text => {
                    toast.error('Nie udało się załadować danych', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
            }
        }).catch(error => console.log(error))
    }


    render() {
        return (
            <div className="profile-container">
                <div className="profile" onClick={this.handleClick}>
                    <li><i className="fas fa-user"></i>{this.props.username}</li>
                </div>
                <div>
                    <Overlay
                        show={this.state.show}
                        transition={false}
                        target={this.state.target}
                        placement="bottom"
                        containerPadding={20}>
                        {this.props.logged ?
                            <Popover id="popover-contained" >
                                <Popover.Title as="h3">Cześć {this.props.username}!</Popover.Title>
                                <Popover.Content>
                                    <div style={{ width: '100%' }}>
                                        <div >
                                            <p style={{marginBottom:'0'}}>Ilość ukończonych lekcji</p>
                                            <ProgressBar>
                                                <ProgressBar variant="success" label={this.state.done_lesson_count} now={this.state.done_lesson_count * this.getLessonsNow()} key={1} />
                                                <ProgressBar variant="danger" label={this.state.lesson_count - this.state.done_lesson_count} now={(this.state.lesson_count - this.state.done_lesson_count) * this.getLessonsNow()} key={2} />
                                            </ProgressBar>
                                        </div>
                                        <br/>
                                        <div >
                                            <p style={{marginBottom:'0'}}>Ilość ukończonych osiągnięć</p>
                                            <ProgressBar>
                                                <ProgressBar variant="success" label={this.state.done_achievement_count} now={this.state.done_achievement_count * this.getAchievementsNow()} key={1} />
                                                <ProgressBar variant="danger" label={this.state.achievement_count - this.state.done_achievement_count} now={(this.state.achievement_count - this.state.done_achievement_count) * this.getAchievementsNow()} key={2} />
                                            </ProgressBar>
                                        </div>
                                        <br/>
                                    </div>
                                </Popover.Content>
                                <ButtonGroup style={{ width: '100%' }}>
                                    <Button onClick={this.logout}>Wyloguj się</Button>
                                </ButtonGroup>
                            </Popover>
                            :
                            <Popover id="popover-contained" >
                                <Popover.Title as="h3">Cześć {this.props.username}</Popover.Title>
                                <Popover.Content>
                                    Zaloguj się aby mieć dostęp do statystyk
                            </Popover.Content>
                                <ButtonGroup style={{ width: '100%' }} >
                                    <Button onClick={this.showLogin}>Zaloguj</Button>
                                    <Button onClick={this.showRegister}>Zarejestruj</Button>
                                </ButtonGroup>
                            </Popover>}
                    </Overlay>
                </div>
            </div>
        );
    }

}