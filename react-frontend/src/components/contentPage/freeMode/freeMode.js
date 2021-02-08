import React, { Component } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import EndScreen from '../practicePage/endScreen/endScreen'
import HandsWithKeyboard from '../handsWithKeyboard/handsWithKeyboard';
import Timer from '../practicePage/timer/timer';
import { toast } from 'react-toastify';
import achievements from '../../../content/achievements.json';

import 'react-toastify/dist/ReactToastify.css';
let lessonText;
let completedText;
let percentage;
let loadedLessonText;
export default class FreeMode extends Component {
    constructor() {
        super()
        this.state = {
            j: 0,
            totalPercentage: 0,
            winScreen: false,
            timerStarted: false,
            correctChars: 0,
        }
        lessonText = '';
        completedText = '';
        loadedLessonText = '';
        this.timer = React.createRef();
    }

    textLenght = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    makeRandomSentence = () => {
        let length = this.textLenght(65, 300)
        let result = [];
        let characters = 'ab cdefghijklmno pqrs tuvwxyz .';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            let letter = characters.charAt(Math.floor(Math.random() * charactersLength));
            if (result[result.length - 1] === ' ') {
                if (result[result.length - 2] === '.') {
                    letter = letter.toUpperCase()
                }
                if (letter === ' ') {
                    continue;
                }
                if (letter === '.') {
                    continue;
                }

            }

            if (letter === '.') {
                letter = '. '
            }
            result.push(letter)
        }
        result.push('.')
        result = result.join('')
        result = result.charAt(0).toUpperCase() + result.slice(1)
        return result;
    }

    countPercentages = () => {
        return (100 / loadedLessonText.length);
    }

    getLetter = () => {
        return lessonText[0];
    }


    renderText = () => {
        let letter = this.getLetter()
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

    checkAchievementsFreeMode = async () => {
        await fetch('/checkAchievementsFreeMode', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "wpm": this.state.wpm,
            })
        }).then(response => {
            if (response.status === 200) {
                return response.text().then(text => {
                    if (text) {
                        text = JSON.parse(text)
                        for (let achievement of text) {
                            if (achievement.id != -1) {
                                toast.info('Zdobyłeś osiągnięcie "' + achievements[achievement.id].title + '"', {
                                    position: "bottom-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            }
                        }

                    }
                })
            }
        }).catch(error => console.log(error))
    }


    componentDidMount() {
        loadedLessonText = this.makeRandomSentence();
        percentage = this.countPercentages()
        lessonText = loadedLessonText.slice(this.state.j);
        this.setState({})
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
                        j: this.state.j + 1,
                        totalPercentage: this.state.totalPercentage + percentage,
                        correctChars: this.state.correctChars + 1,
                    })
                }
                else {
                    // console.log("zle");
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
                        this.checkAchievementsFreeMode();
                    }
                }
            }
        };
    }

    render() {
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
                <EndScreen show={this.state.winScreen} lesson='Tryb swobodny'
                    score={" Osiągnąłeś wynik " + this.state.wpm + " słów na minutę. Lekcja została ukończona w " + this.state.time} />
            </div>
        )
    }
}
