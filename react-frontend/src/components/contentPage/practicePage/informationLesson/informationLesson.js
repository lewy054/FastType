import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import lessons from '../../../../content/lessons.json';
import achievements from '../../../../content/achievements.json';
import { toast } from 'react-toastify';
import history from '../../../../history';
import 'react-toastify/dist/ReactToastify.css';


export default class InformationLesson extends Component {
    completeLesson = async () => {
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
                history.push('/practice/');
                if (response.status === 200) {
                    return response.text().then(text => {
                        if (text) {
                            text = JSON.parse(text)
                            for (let achievement of text) {
                                if (achievement.id != -1) {
                                    toast.info('Zdobyłeś osiągnięcie "' + achievements[achievement.id].title + '"', {
                                        position: "bottom-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                }
                            }

                        }
                    })
                }
            }).catch(error => console.log(error))
        }
    }


    render() {
        return (
            <div>
                <Form>
                    <Form.Group controlId="informationLesson">
                        <Form.Label className="text-center" style={{ width: "100%" }}>
                            <h1 style={{ marginTop: '3%' }}> {lessons[this.props.match.params.id]["title"]}</h1>
                            <p style={{ marginTop: '3%' }}>
                                {lessons[this.props.match.params.id]["text"]}
                            </p>
                            <p style={{ marginTop: '3%' }}>
                                <Button variant="primary" style={{ width: "50%" }} onClick={this.completeLesson}>Zakończ</Button>
                            </p>
                        </Form.Label>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}
