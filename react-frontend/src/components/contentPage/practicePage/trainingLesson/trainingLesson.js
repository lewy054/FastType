import React, { Component } from 'react';
import HandsWithKeyboard from '../../handsWithKeyboard/handsWithKeyboard';
import ProgressBar from 'react-bootstrap/progressBar';
import EndScreen from '../endScreen/endScreen';

import lessons from '../../../../content/lessons.json';

import './trainingLesson.css'

let lessonText;
let loadedLessonText;
let completedText;
let percentage;
export default class TrainingLesson extends Component {
    constructor() {
        super();
        this.state = {
            j: 0,
            totalPercentage: 0,
            winScreen: false,
        }
        completedText = '';
        loadedLessonText = '';
        lessonText = '';
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

    componentDidMount() {
        percentage = this.countPercentages()
        document.onkeydown = (e) => {
            if (lessonText.length !== 0) {
                if (e.key === 'Shift') {
                    return;
                }
                if (e.key === this.getLetter()) {
                    completedText += this.getLetter();
                    lessonText = lessonText.substring(1);
                    console.log("dobre")

                    this.setState({
                        j: this.state.j + 1,
                        totalPercentage: this.state.totalPercentage + percentage,
                    })
                }
                else {
                    console.log("zle");
                }
            }
            if (lessonText.length === 0) {
                this.completeLesson();
            }
        };
    }

    countPercentages = () => {
        return (100 / loadedLessonText.length);
    }

    completeLesson = async () => {
        this.setState({
            winScreen: true,
        })
        await fetch('/completedLesson', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "lesson_id": lessons[this.props.match.params.id]['id'],
            })
        }).catch(error => console.log(error))
    }

    render() {
        loadedLessonText = lessons[this.props.match.params.id]["text"];
        lessonText = loadedLessonText.slice(this.state.j);
        return (
            <div>
                <div style={{ height: '100%' }}>
                    <div style={{ width: '50%', left: '50%', margin: 'auto', overflow: 'auto' }}>
                        {this.renderText()}
                    </div>
                    <div>
                        <div style={{ width: '50%', left: '50%', margin: 'auto', overflow: 'auto' }}>
                            <ProgressBar variant="success" now={this.state.totalPercentage} />
                        </div>
                        <HandsWithKeyboard letter={this.getLetter()} />
                    </div>
                </div>
                {this.state.winScreen ? (
                    <div>
                        <EndScreen wpm={93} source={'test12'} howManyChar={12} />
                    </div>) : null}
            </div>
        )
    }
}
