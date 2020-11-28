import React from 'react';
import { Button } from 'react-bootstrap';
import history from '../../../../history';

import './endScreen.css';

export default class EndScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            display: 'block',
        }
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        let modal = document.getElementById('myModalEnd');
        modal.classList.toggle('modal-slide')
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    closeWindow = () => {
        this.setState({
            display: 'none'
        })
        history.push('/practice/');
    }


    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (event.target.className !== 'end-modal') {
                let modal = document.getElementById('modal');
                modal.classList.toggle('modal-shake')
            }
        }
    }


    render() {
        return (
            <div id="myModalEnd" className="end-modal" style={{ display: this.state.display }}>
                <div id="modal" className="end-modal-content" ref={this.wrapperRef}>
                    <div className="modal-header">
                        <h2>Dobra robota!</h2>
                    </div>
                    <div className="modal-body">
                        <p style={{ fontSize: '150%' }}>{this.props.wpm} words per minute</p>
                        <br />
                        <p style={{ fontSize: '150%' }}>{this.props.howManyChar} characters per second</p>

                        <div>
                            <br />
                            <p style={{ fontSize: '100%' }}>You just typed a quote from</p>
                            <p style={{ fontSize: '100%' }}>{this.props.source}</p>
                        </div>
                    </div>
                    <Button variant="primary" size="lg" onClick={this.closeWindow}>
                        Zakończ
                    </Button>
                </div>
            </div>
        )
    }
}