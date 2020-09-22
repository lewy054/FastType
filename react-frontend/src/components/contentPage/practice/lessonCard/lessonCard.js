import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export default class LessonCard extends React.Component {

    render() {
        return (
            <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src={this.props.image} />
                <Card.Body>
                    <Card.Title>{this.props.lessonName}</Card.Title>
                    <Card.Text>
                    {this.props.lessonDescription}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary">Start</Button>
                </Card.Footer>
            </Card>
        )
    }
}