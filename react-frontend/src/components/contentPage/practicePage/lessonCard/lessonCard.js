import React from 'react';
import history from '../../../../history';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import doneImage from '../../../../images/done.png';

import './lessonCard.css';

export default class LessonCard extends React.Component {
    constructor() {
        super()
        this.state = {
            image: ''
        }
    }

    startClick = () => {
        history.push('/practice/' + this.props.lessonDetails.lessonType + '/' + this.props.lessonDetails.id);
    }

    componentDidMount() {
        try{
        let image = require(`../../../../images/lessons/${this.props.lessonDetails.image}.jpg`)
        this.setState({ image: image });
        }
        catch{
            console.log("Image cannot be loaded")
        }
    }

    render() {
        return (
            <Card className="text-center" style={{ width: '20rem', height: '28rem' }}>
                <img className="lessonImage" src={this.state.image} style={{ width: '20rem', height: '15rem' }} alt="Zdjęcie lekcji" />
                {this.props.lessonStatus === 1 ?
                    <img className="doneImage" src={doneImage} style={{ width: '10rem', height: '10rem' }} alt="Lekcja ukończona" />
                    : null}
                <Card.Body style={{ marginTop: '15rem' }}>
                    <Card.Title>{this.props.lessonDetails.title}</Card.Title>
                    <Card.Text>
                        {this.props.lessonDetails.description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer >
                {this.props.lessonStatus === 1 ?
                <Button variant="success" style={{ width: '100%' }} onClick={this.startClick}>Start</Button> : 
                    <Button variant="primary" style={{ width: '100%' }} onClick={this.startClick}>Start</Button>}
                </Card.Footer>
            </Card>
        )
    }
}