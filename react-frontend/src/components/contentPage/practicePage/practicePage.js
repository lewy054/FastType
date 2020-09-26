import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import LessonCard from './lessonCard/lessonCard';
import Image from '../../../images/background-image.jpg';
import lessons from '../../../content/lessons.json'
import './practicePage.css';



export default class PracticePage extends React.Component {

    getLessonType = (lessonData) => {
        this.props.onLessonSelect(lessonData)
    }

    renderLessons = () => {
        return lessons.map((d) => <CardDeck key={d.id} className="cardDeck"><LessonCard className="lessonCard" onLessonSelect={this.getLessonType} lessonId={d.id} lessonName={d.title} lessonDescription={d.description} lessonType={d.lessonType} image={Image} /></CardDeck>);
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