import React from 'react';
import lessons from '../../../../content/lessons.json';
import Keyboard from '../../keyboard/keyboard';
import './previewLesson.css';


let lessonText;
let j;
let lessonLen;

const toggleAnimation = () => {
    if (j < lessonLen) {
        let div = document.getElementById(j);
        div.classList.toggle('click');
    }
}

const toggleAnimationBad = () => {
    if (j < lessonLen) {
        let div = document.getElementById(j);
        div.classList.toggle('clickedWrong');
    }
}

export default class PreviewLesson extends React.Component {
    constructor() {
        super();
        this.state = {
        }
        j = 0;
    }

    renderButtons = () => {
        let buttons = [];

        for (let i = 0; i < lessonText.length; i++) {
            buttons.push(<div id={i} className="button" style={{ backgroundColor: this.state.backgroundcolor }} data-char={lessonText.charAt(i)} key={i}>{lessonText.charAt(i)}</div>)
        }
        return buttons;
    }



    componentDidMount() {
        toggleAnimation();
        document.onkeydown = function (e) {
            if (lessonText.length !== 0) {
                let div = document.getElementById(j);
                if (e.key === lessonText[0]) {
                    lessonText = lessonText.substring(1);
                    console.log("dobre")
                    div = document.getElementById(j);

                    if (div.classList.contains('clickedWrong')) {
                        toggleAnimationBad();
                    }
                    if (div.classList.contains('click')) {
                        toggleAnimation();
                    }

                    div.style.backgroundColor = '#00ad3d';
                    j++;
                }
                else {
                    console.log("zle");
                    if (!div.classList.contains('clickedWrong')) {
                        toggleAnimationBad();
                    }
                }
                toggleAnimation();
            }
            if (lessonText.length === 0) {
                console.log('koniec');
            }
        };
    }

    render() {
        lessonText = lessons[this.props.lessonId]["text"];
        lessonLen = lessonText.length;
        return (
            <div>
                <div className="buttons">
                    <div className="buttons__row">
                        {this.renderButtons()}
                    </div>
                </div>
                <Keyboard />
            </div>
        )
    }
}