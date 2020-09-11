import React from 'react';
import './profile.css'

export default class Profile extends React.Component {

    render() {
        return (
            <div className="profile">
                <li><i className="fas fa-user"></i>Guest</li>
            </div>
        )
    }
}