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
        let image = require(`../../../../images/${this.props.lessonDetails.image}.jpg`)
        this.setState({ image: image });
    }

    render() {
        return (
            <Card className="text-center" style={{ width: '20rem', height: '25rem' }}>
                <img className="lessonImage" src={this.state.image} style={{ width: '20rem', height: '15rem' }} alt="lesson icon" />
                {this.props.lessonDetails.done ?
                    <img className="doneImage" src={doneImage} style={{ width: '10rem', height: '10rem' }} alt="done icon" />
                    : null}
                <Card.Body style={{ marginTop: '15rem' }}>
                    <Card.Title>{this.props.lessonDetails.title}</Card.Title>
                    <Card.Text>
                        {this.props.lessonDetails.description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer >
                    <Button variant="primary" style={{ width: '100%' }} onClick={this.startClick}>Start</Button>
                </Card.Footer>
            </Card>
        )
    }
}