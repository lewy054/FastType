import React from 'react';
import lessons from '../../../../content/lessons.json';
import HandsWithKeyboard from '../../handsWithKeyboard/handsWithKeyboard';
import EndScreen from '../endScreen/endScreen';
import { toast } from 'react-toastify';
import achievements from '../../../../content/achievements.json';

import 'react-toastify/dist/ReactToastify.css';
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

    completeLesson = async () => {
        this.setState({
            winScreen: true,
        })
        if (this.props.logged) {
            await fetch('/completedLesson', {
                method: 'POST',
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "lesson_id": lessons[this.props.match.params.id]['id'],
                })
            }).then(response => {
                if (response.status === 200) {
                    return response.text().then(text => {
                        if (text) {
                            text = JSON.parse(text)
                            let achievement = text['data']
                            toast.info('Zdobyłeś osiągnięcie "' + achievements[achievement - 1].title + '"')
                        }
                    })
                }
            }).catch(error => console.log(error))
        }
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
        this.toggleAnimation();
        document.onkeydown = (e) => {
            if (lessonText.length !== 0) {
                let div = document.getElementById(this.state.j);
                if (e.key === 'Shift') {
                    return;
                }
                if (e.key === this.getLetter()) {
                    lessonText = lessonText.substring(1);
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
                    if (div) {
                        if (!div.classList.contains('clickedWrong')) {
                            this.toggleAnimationBad();
                        }
                    }
                }
                this.toggleAnimation();
            }
            if (lessonText.length === 0) {
                if (!this.state.winScreen) {
                    if (this.props.logged) {
                        this.completeLesson();
                        this.checkAchievements();
                    }
                }
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
                <EndScreen show={this.state.winScreen} wpm={93} source={'test12'} howManyChar={12} />
            </div>
        )
    }
}