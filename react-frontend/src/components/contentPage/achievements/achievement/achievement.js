import React, { Component } from 'react'
import doneImage from '../../../../images/done.png';
import { Image } from 'react-bootstrap'

import './achievement.css'
export default class Achievement extends Component {
    constructor() {
        super();
        this.state = {
            image: '',
        }
    }
    componentDidMount() {
        try {
            let image = require(`../../../../images/achievements/${this.props.achievementDetails.image}.jpg`)
            this.setState({ image: image });
        }
        catch {
            console.log("Image cannot be loaded")
        }
    }

    render() {
        return (
            <div className="achievement-container card flex-row flex-wrap">
                <div className="card-header border-0">
                    {this.props.achievementStatus === 1 ?
                        <Image className="achievement-image" src={this.state.image} alt="Zdjęcie osiągnięcia" />
                        :
                        <Image className="achievement-image undone" src={this.state.image} alt="Zdjęcie osiągnięcia" />}
                </div>
                <div className="card-body px-2">
                    <h4 className="card-title">{this.props.achievementDetails.title}</h4>
                    <p className="card-text">{this.props.achievementDetails.description}</p>
                </div>
                {this.props.achievementStatus === 1 ?
                    <div className="card-footer border-0">
                        <Image src={doneImage} alt="Osiągnięcie ukończone" />
                    </div>
                    : null
                }
                <div className="w-100"></div>
            </div>
        )
    }
}
