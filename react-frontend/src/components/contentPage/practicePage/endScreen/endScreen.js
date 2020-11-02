import React from 'react';
import './endScreen.css'

export default class EndScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            display: 'block'
        }
    }

    closeWindow = () => {
        this.setState({
            display: 'none'
        })
    }


    render() {
        return (
            <div id="myModal" className="modal" style={{ display: this.state.display }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={this.closeWindow}>&times;</span>
                        <h2>Result</h2>
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

                </div>
            </div>
        )
    }
}