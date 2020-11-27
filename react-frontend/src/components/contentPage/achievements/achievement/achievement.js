import React, { Component } from 'react'

export default class Achievement extends Component {
    render() {
        return (
            <div style={{ marginTop: "1em" }} class="card flex-row flex-wrap">
                <div class="card-header border-0">
                    <img src="//placehold.it/100" alt="" />
                </div>
                <div class="card-block px-2">
                    <h4 class="card-title">{this.props.achievementDetails.title}</h4>
                    <p class="card-text">{this.props.achievementDetails.description}</p>
                </div>
                <div class="w-100"></div>
            </div>
        )
    }
}
