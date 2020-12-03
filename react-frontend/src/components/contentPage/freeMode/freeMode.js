import React, { Component } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import EndScreen from '../practicePage/endScreen/endScreen'
import HandsWithKeyboard from '../handsWithKeyboard/handsWithKeyboard';

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
        }
        lessonText = '';
        completedText = '';
        loadedLessonText = '';
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
                letter='. '
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


    componentDidMount() {
        loadedLessonText = this.makeRandomSentence();
        percentage = this.countPercentages()
        lessonText = loadedLessonText.slice(this.state.j);
        this.setState({})
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
                this.setState({
                    winScreen: true,
                })
            }
        };
    }

    render() {
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
