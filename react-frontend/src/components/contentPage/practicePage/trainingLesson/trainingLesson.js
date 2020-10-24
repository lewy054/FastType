import React, { Component } from 'react';
import HandsWithKeyboard from '../../handsWithKeyboard/handsWithKeyboard';
import lessons from '../../../../content/lessons.json';


let lessonText = '';
let loadedLessonText = '';
export default class TrainingLesson extends Component {
    constructor() {
        super();
        this.state = {
            j: 0,
        }
    }

    getLetter() {
        return lessonText[0];
    }

    componentDidMount() {
        document.onkeydown = (e) => {
            if (lessonText.length !== 0) {
                if (e.key === 'Shift') {
                    return;
                }
                console.log(e.key);
                if (e.key === lessonText[0]) {
                    lessonText = lessonText.substring(1);
                    console.log("dobre")

                    this.setState({
                        j: this.state.j + 1
                    })
                }
                else {
                    console.log("zle");
                }
            }
            if (lessonText.length === 0) {
                console.log('koniec');
            }
        };
    }

    render() {
        loadedLessonText = lessons[this.props.match.params.id]["text"];
        lessonText = loadedLessonText.slice(this.state.j);
        return (
            <div>
                <HandsWithKeyboard letter={this.getLetter()} />
            </div>
        )
    }
}
