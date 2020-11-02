import React from 'react';
import history from '../../../../history';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export default class LessonCard extends React.Component {
    constructor() {
        super()
        this.state = {
            image: ''
        }
    }

    startClick = () => {
        history.push('/practice/' + this.props.lessonType + '/' + this.props.lessonId);
    }

    componentDidMount() {
        let image = require(`../../../../images/${this.props.image}.jpg`)
        this.setState({ image: image });
    }

    render() {
        return (
            <Card className="text-center" style={{ width: '20rem', height:'25rem' }}>
                <Card.Img variant="top" src={this.state.image}  style={{ width: '20rem', height:'15rem' }}/>
                <Card.Body>
                    <Card.Title>{this.props.lessonName}</Card.Title>
                    <Card.Text>
                        {this.props.lessonDescription}
                    </Card.Text>
                </Card.Body>
                <Card.Footer >
                    <Button variant="primary" style={{ width: '100%' }} onClick={this.startClick}>Start</Button>
                </Card.Footer>
            </Card>
        )
    }
}