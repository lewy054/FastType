import React, { Component } from 'react'
import image from '../../../images/fjpreview.jpg';
import achievements from '../../../content/achievements.json';
import Achievement from './achievement/achievement';

export default class AchievementsList extends Component {
    renderLessons = () => {
        return achievements.map((d) => <Achievement achievementDetails={d}/>);
    }

    render() {
        return (
            <div style={{ width: "90%", marginLeft: "auto", marginRight: "auto", marginTop:"7em" }}>
                {this.renderLessons()}
            </div>
        )
    }
}
