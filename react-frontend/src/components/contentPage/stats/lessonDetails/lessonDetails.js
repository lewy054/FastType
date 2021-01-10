import React, { Component } from 'react';
import Charts from '../charts/charts';

export default class LessonDetails extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.lesson['title']}</h1>
                <Charts lessonId={this.props.lesson['id']} />
            </div>
        )
    }
}
