import React, { Component } from 'react'
import achievements from '../../../content/achievements.json';
import Achievement from './achievement/achievement';

export default class AchievementsList extends Component {
    constructor() {
        super()
        this.state = {
            achievementStatus: {},
        }
    }

    renderAchievements = () => {
        let data;
        if (this.state.achievementStatus.hasOwnProperty(['data'])) {
            data = JSON.parse(this.state.lessonsStatus['data'])
        }

        return achievements.map((d) =>
            this.state.achievementStatus.hasOwnProperty(['data']) ?
                <Achievement achievementDetails={d} achievementStatus={data['achievement' + (d.id + 1)]} />
                : <Achievement achievementDetails={d} achievementStatus={false} />
        )
    }

    getAchievementStatus = async () => {
        await fetch('/getAchievementStatus', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (response.status === 200) {
                return response.text().then(text => {
                    this.setState({
                        achievementStatus: JSON.parse(text),
                    })
                })
            }
            else {
                return response.text().then(text => {
                    console.log('nie udało się zaladować danych')
                })
            }
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div style={{ width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "3em" }}>
                {this.renderAchievements()}
            </div>
        )
    }
}
