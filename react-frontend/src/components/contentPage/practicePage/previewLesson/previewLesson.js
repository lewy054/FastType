import React from 'react';
import lessons from '../../../../content/lessons.json';
import HandsWithKeyboard from '../../handsWithKeyboard/handsWithKeyboard';
import EndScreen from '../endScreen/endScreen';

import './previewLesson.css';


let lessonText = '';
let loadedLessonText = '';
let lessonLen;


export default class PreviewLesson extends React.Component {
    constructor() {
        super();
        this.state = {
            j: 0,
            winScreen: false,
        }
    }

    renderButtons = () => {
        let buttons = [];

        for (let i = 0; i < loadedLessonText.length; i++) {
            buttons.push(<div id={i} className="button" style={{ backgroundColor: this.state.backgroundcolor }} data-char={loadedLessonText.charAt(i)} key={i}>{loadedLessonText.charAt(i)}</div>)
        }
        return buttons;
    }

    getLetter = () => {
        return lessonText[0];
    }

    toggleAnimation = () => {
        if (this.state.j < lessonLen) {
            let div = document.getElementById(this.state.j);
            if (div) {
                div.classList.toggle('click');
            }
        }
    }

    toggleAnimationBad = () => {
        if (this.state.j < lessonLen) {
            let div = document.getElementById(this.state.j);
            if (div) {
                div.classList.toggle('clickedWrong');
            }
        }
    }

    componentDidMount() {
        this.toggleAnimation();
        document.onkeydown = (e) => {
            if (lessonText.length !== 0) {
                let div = document.getElementById(this.state.j);
                if (e.key === 'Shift') {
                    return;
                }
                if (e.key === this.getLetter()) {
                    lessonText = lessonText.substring(1);
                    console.log("dobre")
                    if (div) {
                        if (div.classList.contains('clickedWrong')) {
                            this.toggleAnimationBad();
                        }
                        if (div.classList.contains('click')) {
                            this.toggleAnimation();
                        }
                        div.style.backgroundColor = '#00ad3d';
                    }
                    this.setState({
                        j: this.state.j + 1
                    })
                }
                else {
                    console.log("zle");
                    if (div) {
                        if (!div.classList.contains('clickedWrong')) {
                            this.toggleAnimationBad();
                        }
                    }
                }
                this.toggleAnimation();
            }
            if (lessonText.length === 0) {
                console.log('koniec');
                this.setState({
                    winScreen: true,
                })
            }
        };
    }

    render() {
        loadedLessonText = lessons[this.props.match.params.id]["text"];
        lessonLen = loadedLessonText.length;
        lessonText = loadedLessonText.slice(this.state.j);

        return (
            <div>
                <div>
                    <div className="buttons">
                        <div className="buttons__row">
                            {this.renderButtons()}
                        </div>
                    </div>
                    <HandsWithKeyboard letter={this.getLetter()} withInstructions={true} win={this.state.winScreen} />
                </div>
                {this.state.winScreen ? (
                    <div>
                        <EndScreen wpm={93} source={'test12'} howManyChar={12} />
                    </div>) :
                    (
                        <div></div>
                    )}
            </div>
        )
    }
}