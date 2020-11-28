import React, { Component } from 'react'
import doneImage from '../../../../images/done.png';

import './achievement.css'
export default class Achievement extends Component {
    render() {
        return (
            <div style={{ marginTop: "1em" }} class="card flex-row flex-wrap">
                <div class="card-header border-0" style={{ width: "8%" }}>
                    <img src="//placehold.it/100" alt="" />
                </div>
                <div class="px-2" style={{ width: "92%" }}>
                    <div style={{ display: "inline-block", width: '92%' }}>
                        <h4 class="card-title">{this.props.achievementDetails.title}</h4>
                        <p class="card-text">{this.props.achievementDetails.description}</p>
                    </div>
                    {this.props.achievementDetails.done==='true' ?
                        <div class="vertical-center">
                            <img src={doneImage} alt="" />
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }
}
