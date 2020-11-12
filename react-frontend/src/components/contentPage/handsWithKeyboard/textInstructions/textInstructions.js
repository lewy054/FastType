import React, { Component } from 'react'

import './textInstructions.css';

export default class TextInstructions extends Component {

    whichFinger = (finger) => {
        switch (finger) {
            case 'thumb':
                return 'kciukiem'
            case 'pointer':
                return 'palcem wskazującym'
            case 'middle':
                return 'środkowym palcem'
            case 'ring':
                return 'palcem serdecznym'
            case 'little':
                return 'małym palcem'
            default:
                return 'none'

        }
    }

    getFirstFinger = () => {
        let text;
        let hand;
        if (!this.props.letter) {
            return;
        }
        let letter = this.props.letter.toUpperCase();
        if (letter === ' ') {
            return <p className="instruction">Naciśnij <span style={{ color: "#4287f5", fontSize: 'xx-large' }}>spację</span> <span style={{ color: "#00358a" }}> kciukiem lewej lub prawej ręki</span></p>
        }
        if (this.props.leftShift) {
            text = this.whichFinger(this.props.rightFinger);
            hand = ' prawej ręki';
        }
        else if (this.props.rightShift) {
            text = this.whichFinger(this.props.leftFinger);
            hand = ' lewej ręki';
        }
        else {
            if (this.props.leftFinger === 'none') {
                text = this.whichFinger(this.props.rightFinger);
                hand = ' prawej ręki';
            }
            else {
                text = this.whichFinger(this.props.leftFinger);
                hand = ' lewej ręki';
            }
        }
        return <p className="instruction">Naciśnij klawisz <span style={{ color: "#4287f5", fontSize: 'xx-large' }}>{letter}</span> <span style={{ color: "#00358a" }}> {text} {hand}</span></p>
    }

    getSecondFinger = () => {
        let hand;
        if (this.props.rightShift) {
            hand = ' prawej ręki';
            return <p className="instructionSecondLine">oraz klawisz <span style={{ color: "#4287f5", fontSize: 'xx-large' }}>shift</span><span style={{ color: "#00358a" }}> małym palcem {hand}</span></p>
        }
        else if (this.props.leftShift) {
            hand = ' lewej ręki';
            return <p className="instructionSecondLine">oraz klawisz <span style={{ color: "#4287f5", fontSize: 'xx-large' }}>shift</span><span style={{ color: "#00358a" }}> małym palcem {hand}</span></p>
        }

    }

    render() {
        return (
            <div className="instructionsBlock">
                {this.getFirstFinger()}
                {this.getSecondFinger()}
            </div>
        )
    }
}
