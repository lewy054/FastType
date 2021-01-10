import React, { Component } from 'react'
import achievements from '../../../content/achievements.json';
import Achievement from './achievement/achievement';
import { toast } from 'react-toastify';

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
            data = JSON.parse(this.state.achievementStatus['data'])
        }

        return achievements.map((d) =>
            this.state.achievementStatus.hasOwnProperty(['data']) ?
                <Achievement achievementDetails={d} achievementStatus={data['achievement' + (d.id + 1)]} />
                : <Achievement achievementDetails={d} achievementStatus={false} />
        )
    }
    componentDidMount() {
        this.getAchievementStatus();
    }

    getAchievementStatus = async () => {
        await fetch('/getAchievementsStatus', {
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
                    toast.error('Nie udało się załadować danych', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
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
