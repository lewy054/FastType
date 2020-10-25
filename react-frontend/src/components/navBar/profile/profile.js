import React from 'react';
import './profile.css'

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            showProfile: false,
        }
    }
    showProfileDetails = () => {
        if (this.state.showProfile) {
            this.setState({
                showProfile: false,
            })
            console.log('dont show')
        }
        else {
            console.log('show')
            this.setState({
                showProfile: true,
            })
        }
    }

    renderProfileDetails = () => {
        //return <ProfileDetails />
    }

    render() {
        return (
            <div className="profile" onClick={this.showProfileDetails}>
                <li><i className="fas fa-user"></i>Gość</li>
                {/* {this.renderProfileDetails()} */}
            </div>
        )
    }
}