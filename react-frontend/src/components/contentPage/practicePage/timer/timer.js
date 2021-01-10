import React, { Component } from 'react'

import './timer.css';

let one_second;
let one_minute;
let one_hour;
let startDate;
let score;

export default class Timer extends Component {
    constructor() {
        super();
        this.state = {
            time: '00:00:00',
            seconds: 0,
            correctChars: 0,
            started: false,
            wpm: 0,
        }
        one_second = 1000
        one_minute = one_second * 60
        one_hour = one_minute * 60
        score = 0
    }

    static getDerivedStateFromProps(props, state) {
        if (props.correctChars !== state.correctChars) {
            return {
                correctChars: props.correctChars,
            }
        }
        return null;
    }

    startTimer = () => {
        this.setState({ started: true })
        startDate = new Date()
        this.interval = setInterval(() => this.tick(), 1000);
    }

    stopTimer = () => {
        this.setState({ started: false })
        clearInterval(this.interval);
    }

    componentWillUnmount() {
        this.stopTimer()
    }

    tick = () => {
        var now = new Date()
            , elapsed = now - startDate
            , parts = [];
        parts[0] = '' + Math.floor(elapsed / one_hour);
        parts[1] = '' + Math.floor((elapsed % one_hour) / one_minute);
        parts[2] = '' + Math.floor(((elapsed % one_hour) % one_minute) / one_second);
        parts[0] = (parts[0].length === 1) ? '0' + parts[0] : parts[0];
        parts[1] = (parts[1].length === 1) ? '0' + parts[1] : parts[1];
        parts[2] = (parts[2].length === 1) ? '0' + parts[2] : parts[2];
        this.setState({
            time: parts.join(':'),
            seconds: Math.floor(elapsed / one_second),
        })
    }

    countWPM = () => {
        let cps = this.state.correctChars / this.state.seconds;
        let wpm = cps * (60 / 5);
        if (this.state.seconds !== 0 && this.state.started) {
            score = parseInt(wpm)
            return parseInt(wpm)
        }
        else {
            return score
        }
    }

    getWPM = () =>{
        return (score)
    }

    getTime = () =>{
        return (this.state.time)
    }

    render() {
        return (
            <div className="timer-group">
                <div className="timer hour">
                    {this.state.started ?
                        <div>
                            <div className="hand"><span></span></div>
                            <div className="hand"><span></span></div>
                        </div> : null}
                </div>
                <div className="timer minute">
                    {this.state.started ?
                        <div>
                            <div className="hand"><span></span></div>
                            <div className="hand"><span></span></div>
                        </div> : null}
                </div>
                <div className="timer second">
                    {this.state.started ?
                        <div>
                            <div className="hand"><span></span></div>
                            <div className="hand"><span></span></div>
                        </div> : null}
                </div>
                <div className="face">
                    <h5>WPM:</h5>
                    <h5>{this.countWPM()}</h5>
                    <p id="lazy">{this.state.time}</p>
                </div>
            </div>

        )
    }
}
