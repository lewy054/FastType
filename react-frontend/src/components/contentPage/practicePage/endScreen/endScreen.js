import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import history from '../../../../history';

import './endScreen.css';

export default class EndScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
        }
    }


    static getDerivedStateFromProps(props, state) {
        if (props.show !== state.show) {
            return {
                show: props.show,
            }
        }
        return null;
    }

    closeWindow = () => {
        this.setState({
            show: false,
        })
        history.push('/practice/');
    }



    render() {
        return (
            <body>
                <Modal
                    className="end-modal"
                    show={this.state.show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    onHide={this.closeWindow}
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Dobra robota!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Ukończyłeś właśnie {this.props.lesson}. Kontynuuj swoją naukę by stać się jeszcze lepszym w obsłudze klawiatury.
                            {this.props.score}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeWindow}>Zamknij</Button>
                    </Modal.Footer>
                </Modal>
            </body>
        )
    }
}