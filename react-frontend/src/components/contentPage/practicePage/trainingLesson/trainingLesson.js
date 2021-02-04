import React, { Component } from 'react';
import HandsWithKeyboard from '../../handsWithKeyboard/handsWithKeyboard';
import ProgressBar from 'react-bootstrap/progressBar';
import EndScreen from '../endScreen/endScreen';

import lessons from '../../../../content/lessons.json';
import achievements from '../../../../content/achievements.json';
import './trainingLesson.css'
import Timer from '../timer/timer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let lessonText;
let loadedLessonText;
let completedText;
let percentage;
export default class TrainingLesson extends Component {
    constructor() {
        super();
        this.state = {
            correctChars: 0,
            totalPercentage: 0,
            winScreen: false,
            timerStarted: false,
            wpm: 0,
            time: '',
            achiev_id: -1,
        }
        completedText = '';
        loadedLessonText = '';
        lessonText = '';
        this.timer = React.createRef();
        this.toast = React.createRef();
    }

    getLetter = () => {
        return lessonText[0];
    }

    renderText = () => {
        let letter = this.getLetter();
        let restOfText = lessonText.substring(1);
        return (
            <p className="text" key="textToShow">
                <span style={{ backgroundColor: '#00db3a' }}>
                    {completedText}
                </span>
                {letter ?
                    <span className="letterToWrite">
                        {letter}
                    </span>
                    : null}
                <span>
                    {restOfText}
                </span>
            </p>
        )
    }

    completeLesson = async () => {
        await fetch('/completedLesson', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "lesson_id": lessons[this.props.match.params.id]['id'],
                "wpm": this.state.wpm,
                "time": this.state.time,
            })
        }).then(response => {
            if (response.status === 200) {
                return response.text().then(text => {
                    if (text) {
                        text = JSON.parse(text)
                        let achievement = text['data']
                        toast.info('Zdobyłeś osiągnięcie "' + achievements[achievement - 1].title + '"', {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                })
            }
        }).catch(error => console.log(error))

    }

    checkAchievements = async () => {
        await fetch('/checkAchievements', {
            method: 'GET',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (response.status === 200) {
                return response.text().then(text => {
                    if (text) {
                        text = JSON.parse(text)
                        let achievement = text['data']
                        toast.info('Zdobyłeś osiągnięcie "' + achievements[achievement - 1].title + '"', {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                })
            }
        }).catch(error => console.log(error))
    }


    componentDidMount() {
        percentage = this.countPercentages()
        document.onkeydown = (e) => {
            if (!this.state.timerStarted) {
                this.timer.current.startTimer();
                this.setState({
                    timerStarted: true,
                })
            }
            if (lessonText.length !== 0) {
                if (e.key === 'Shift') {
                    return;
                }
                if (e.key === this.getLetter()) {
                    completedText += this.getLetter();
                    lessonText = lessonText.substring(1);
                    this.setState({
                        correctChars: this.state.correctChars + 1,
                        totalPercentage: this.state.totalPercentage + percentage,
                    })
                }
            }
            if (lessonText.length === 0) {
                if (!this.state.winScreen) {
                    this.setState({
                        winScreen: true,
                        timerStarted: false,
                        wpm: this.timer.current.getWPM(),
                        time: this.timer.current.getTime(),
                    })
                    this.timer.current.stopTimer();
                    if (this.props.logged) {
                        this.completeLesson();
                        this.checkAchievements()
                    }
                }
            }
        };
    }

    countPercentages = () => {
        return (100 / loadedLessonText.length);
    }

    handleTimeChange = (time) => this.setState({ time: time });


    render() {
        loadedLessonText = lessons[this.props.match.params.id]["text"];
        lessonText = loadedLessonText.slice(this.state.correctChars);
        return (
            <div>
                <div style={{ height: '100%' }}>
                    <div className="text-timer">
                        <div className="text-container">
                            {this.renderText()}
                        </div>
                        <div className="timer-container">
                            <Timer ref={this.timer} correctChars={this.state.correctChars} />
                        </div>
                        <div style={{ width: '50%', left: '50%', margin: 'auto', overflow: 'auto' }}>
                            <ProgressBar variant="success" now={this.state.totalPercentage} />
                        </div>
                    </div>

                    <div style={{ height: '50%' }}>
                        <HandsWithKeyboard letter={this.getLetter()} />
                    </div>
                </div>
                <EndScreen show={this.state.winScreen} lesson={lessons[this.props.match.params.id]["title"]}
                    score={" Osiągnąłeś wynik " + this.state.wpm + " słów na minutę. Lekcja została ukończona w " + this.state.time} />
            </div>
        )
    }
}
