import React, { Component } from 'react'
import { PieChart, Pie, Tooltip } from 'recharts';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

import './charts.css';

let data_time = [
];

let data_wpm = [
];



export default class Charts extends Component {
    constructor(params) {
        super()
        this.state = {
            time: 0,
            wpm: 0,
            lessonDone: false,
            loading: false,
            timeSlower: 0,
            timeSame: 0,
            timeFaster: 0,
            wpmFaster: 0,
            wpmSame: 0,
            wpmSlower: 0,
        }
    }
    componentDidMount() {
        this.getLessonDetails();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lessonId !== this.props.lessonId) {
            this.getLessonDetails();
        }
    }

    getLessonDetails = async () => {
        this.setState({
            loading: true,
        })
        await fetch('/getLessonDetails', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "lessonId": this.props.lessonId,
            })
        }).then(response => {
            if (response.status === 200) {
                return response.text().then(text => {
                    let stats = JSON.parse(text)
                    data_time = []
                    data_wpm = []
                    if (stats['time_slower'] > 0) {
                        data_time.push({ name: 'Ukończyło wolniej', value: stats['time_slower'], fill: '#00b815', },)
                    }
                    if (stats['time_same'] > 0) {
                        data_time.push({ name: 'Ukończyło tak samo', value: stats['time_same'], fill: '#e89c05', },)
                    }
                    if (stats['time_faster'] > 0) {
                        data_time.push({ name: 'Ukończyło szybciej', value: stats['time_faster'], fill: '#eb0000', },)
                    }

                    if (stats['wpm_slower'] > 0) {
                        data_wpm.push({ name: 'Pisało wolniej', value: stats['wpm_slower'], fill: '#00b815', },)
                    }
                    if (stats['wpm_same'] > 0) {
                        data_wpm.push({ name: 'Pisało tak samo', value: stats['wpm_same'], fill: '#e89c05', })
                    }
                    if (stats['wpm_faster'] > 0) {
                        data_wpm.push({ name: 'Pisało szybciej', value: stats['wpm_faster'], fill: '#eb0000', },)
                    }
                    this.setState({
                        lessonDone: true,
                        loading: false,
                        time: stats['time'],
                        timeSlower: stats['time_slower'],
                        timeSame: stats['time_same'],
                        timeFaster: stats['time_faster'],
                        wpm: stats['wpm'],
                        wpmFaster: stats['wpm_faster'],
                        wpmSame: stats['wpm_same'],
                        wpmSlower: stats['wpm_slower'],
                    })
                })
            }
            else if (response.status === 204) {
                return response.text().then(text => {
                    this.setState({
                        lessonDone: false,
                        loading: false,
                    })
                })
            }
            else {
                return response.text().then(text => {
                    toast.error('Nie udało się załadować danych', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        loading: false,
                    });
                })
            }
        }).catch(error => console.log(error))
    }

    renderLabel = (entry) => {
        return entry.name;
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <Spinner animation="border" >
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )
        }
        else {
            if (this.state.lessonDone) {
                return (
                    <div>
                        <h4>Twój czas: {this.state.time}</h4>
                        <div className="chartContainer">
                            <div className="chartStats">
                                <PieChart width={500} height={400}>
                                    <Pie isAnimationActive={false} data={data_time} cx={250} cy={200} outerRadius={80} label={this.renderLabel} />
                                    <Tooltip />
                                </PieChart>
                            </div>
                            <div className="textStats">
                                <h4>Ukończyłeś tę lekcję <span style={{ color: "#00b815", fontSize: 'xx-large' }}>szybciej</span> niż {this.state.timeSlower}% użytkowników,</h4>
                                <h4>{this.state.timeFaster + this.state.timeSame}% ukończyło ją w tym <span style={{ color: "#e89c05", fontSize: 'xx-large' }}>samym czasie</span> lub <span style={{ color: "#eb0000", fontSize: 'xx-large' }}>wolniej</span>.</h4>
                            </div>
                        </div>
                        <h4>Twoja liczba słów na minutę: {this.state.wpm}</h4>
                        <div className="chartContainer">
                            <div className="chartStats">
                                <PieChart width={500} height={400}>
                                    <Pie isAnimationActive={false} data={data_wpm} cx={250} cy={200} outerRadius={80} label={this.renderLabel} />
                                    <Tooltip />
                                </PieChart>
                            </div>
                            <div className="textStats">
                                <h4>Zdobyłeś <span style={{ color: "#00b815", fontSize: 'xx-large' }}>wyższy</span> wskaźnik pisanych słów na minutę niż {this.state.wpmSlower}% użytkowników</h4>
                                <h4>{this.state.wpmFaster + this.state.wpmSame}% piszę  <span style={{ color: "#e89c05", fontSize: 'xx-large' }}>tyle samo </span> lub  <span style={{ color: "#eb0000", fontSize: 'xx-large' }}>mniej</span> słów na minutę co Ty.</h4>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <h4>Lekcja nieukończona</h4>
                    </div>
                )
            }
        }
    }
}
