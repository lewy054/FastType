import React, { Component } from 'react'
import { toast } from 'react-toastify';
import { ProgressBar, Tab, Nav, Tooltip, OverlayTrigger } from 'react-bootstrap';
import achievement from '../../../content/achievements.json';
import lessons from '../../../content/lessons.json';
import './stats.css';
import LessonDetails from './lessonDetails/lessonDetails';




export default class Stats extends Component {
    constructor() {
        super()
        this.state = {
            done_lesson_count: 0,
            lesson_count: 0,
            done_achievement_count: 0,
            achievement_count: 0,
            selectedLesson: 2,
            avgWpm: 0,
            othersWpm: 0,
        }
    }

    componentDidMount() {
        this.getAvgValues();
        this.setState({
            lesson_count: Object.keys(lessons).length,
            achievement_count: Object.keys(achievement).length,
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
                        avgWpm: stats['avgWpm'],
                        othersWpm: stats['othersWpm'],
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

    setLessonId = (id) => {
        this.setState({
            selectedLesson: id
        })
    }

    renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Pisanych słów na minutę
        </Tooltip>
    );

    renderTabs = () => {
        return lessons.map((d) =>
            d.lessonType === 'trainingLesson' || d.lessonType === 'summaryLesson' || d.lessonType === 'practiceLesson' ?
                <Nav.Link onClick={() => this.setLessonId(d.id)}>
                    {d.title}
                </Nav.Link> : null
        )
    }

    renderLessonDetail = () => {
        return <LessonDetails lesson={lessons[this.state.selectedLesson]} />
    }


    render() {
        return (
            <div>
                <div className="generalStats">
                    <h2>Statystyki ogólne</h2>
                    <div className="wpmStats">
                        <div className="userAvg">
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={this.renderTooltip}
                            >
                                <h4>Twoja średnia ilość WPM</h4>
                            </OverlayTrigger>
                            <h2>{parseInt(this.state.avgWpm)}</h2>
                        </div>
                        <div className="othersAvg">
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={this.renderTooltip}
                            >
                                <h4>Średnia ilość WPM innych osób</h4>
                            </OverlayTrigger>
                            <h2>{parseInt(this.state.othersWpm)}</h2>
                        </div>
                    </div>
                    <div>
                        <div className="progressbars">
                            <h2>Ilość ukończonych lekcji</h2>
                            <ProgressBar>
                                <ProgressBar variant="success" label={this.state.done_lesson_count} now={this.state.done_lesson_count * this.getLessonsNow()} key={1} />
                                <ProgressBar variant="danger" label={this.state.lesson_count - this.state.done_lesson_count} now={(this.state.lesson_count - this.state.done_lesson_count) * this.getLessonsNow()} key={2} />
                            </ProgressBar>
                        </div>
                        <div className="progressbars">
                            <h2>Ilość ukończonych osiągnięć</h2>
                            <ProgressBar>
                                <ProgressBar variant="success" label={this.state.done_achievement_count} now={this.state.done_achievement_count * this.getAchievementsNow()} key={1} />
                                <ProgressBar variant="danger" label={this.state.achievement_count - this.state.done_achievement_count} now={(this.state.achievement_count - this.state.done_achievement_count) * this.getAchievementsNow()} key={2} />
                            </ProgressBar>
                        </div>
                    </div>

                </div>
                <div className="detailStats">
                    <h2>Statystyki szczegółowe</h2>
                    <Tab.Container defaultActiveKey="position">
                        <div className="detailStatsLeft">
                            {this.renderLessonDetail()}
                        </div>
                        <div className="detailStatsRight">
                            <Nav defaultActiveKey="lesson1" className="flex-column">
                                {this.renderTabs()}
                            </Nav>

                        </div>
                    </Tab.Container>
                </div>
            </div>
        )
    }
}
