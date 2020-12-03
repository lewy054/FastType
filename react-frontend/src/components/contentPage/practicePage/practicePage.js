import React from 'react';
import { CardDeck } from 'react-bootstrap';
import LessonCard from './lessonCard/lessonCard';
import lessons from '../../../content/lessons.json'
import './practicePage.css';

export default class PracticePage extends React.Component {
    constructor() {
        super()
        this.state = {
            lessonsStatus: {},
        }
    }

    getLessonType = (lessonData) => {
        this.props.onLessonSelect(lessonData)
    }

    componentDidMount() {
        this.getLessonStatus();
    }

    getLessonStatus = async () => {
        await fetch('/getLessonsStatus', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (response.status === 200) {
                return response.text().then(text => {
                    this.setState({
                        lessonsStatus: JSON.parse(text),
                    })
                })
            }
            else {
                return response.text().then(text => {
                    console.log('nie udało się zaladować danych')
                })
            }
        }).catch(error => console.log(error))
    }

    renderLessons = () => {
        let data;
        if (this.state.lessonsStatus.hasOwnProperty(['data'])) {
            data = JSON.parse(this.state.lessonsStatus['data'])
        }
        return lessons.map((d) =>
            this.state.lessonsStatus.hasOwnProperty(['data']) ?
                <CardDeck key={d.id} className="cardDeck">
                    <LessonCard className="lessonCard" onLessonSelect={this.getLessonType} lessonDetails={d}
                        lessonStatus={data['lesson' + (d.id + 1)]} />
                </CardDeck>
                :
                <CardDeck key={d.id} className="cardDeck">
                    <LessonCard className="lessonCard" onLessonSelect={this.getLessonType} lessonDetails={d}
                        lessonStatus={false} />
                </CardDeck>

        )
    }

    render() {
        return (
            <div>
                <CardDeck>
                    {this.renderLessons()}
                </CardDeck>
            </div>
        )
    }
}