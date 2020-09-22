import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import LessonCard from './lessonCard/lessonCard';
import Image from '../../../images/background-image.jpg';
import lessons from '../../../content/lessons.json'



export default class PracticePage extends React.Component {

    renderLessons = () =>{
        return lessons.map((d) => <CardDeck style={{ margin: '20px', alignContent:'center'}}><LessonCard lessonName={d.title} lessonDescription={d.description} image={Image}/></CardDeck>);
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