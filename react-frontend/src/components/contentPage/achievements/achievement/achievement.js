import React, { Component } from 'react'
import doneImage from '../../../../images/done.png';

import './achievement.css'
export default class Achievement extends Component {
    render() {
        return (
            <div style={{ marginTop: "1em" }} className="card flex-row flex-wrap">
                <div className="card-header border-0" style={{ width: "8%" }}>
                    <img src="//placehold.it/100" alt="" />
                </div>
                <div className="px-2" style={{ width: "92%" }}>
                    <div style={{ display: "inline-block", width: '92%' }}>
                        <h4 className="card-title">{this.props.achievementDetails.title}</h4>
                        <p className="card-text">{this.props.achievementDetails.description}</p>
                    </div>
                    {this.props.achievementDetails.done==='true' ?
                        <div className="vertical-center">
                            <img src={doneImage} alt="" />
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }
}
