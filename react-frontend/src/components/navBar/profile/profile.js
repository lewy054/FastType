import React from 'react';

import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

import './profile.css'


export default class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false,
            target: null,
        }
    }

    handleClick = (event) => {
        this.setState({
            show: !this.state.show,
            target: event.target,
        })
    };

    render() {
        return (
            <div className="profile-container">
                <div className="profile" onClick={this.handleClick}>
                    <li><i className="fas fa-user"></i>Gość</li>
                </div>
                <div>
                    <Overlay
                        show={this.state.show}
                        transition={false}
                        target={this.state.target}
                        placement="bottom"
                        containerPadding={20}>
                        <Popover id="popover-contained" >
                            <Popover.Title as="h3">Cześć Gość</Popover.Title>
                            <Popover.Content>
                                <strong>Holy guacamole!</strong> Check this info.
                            </Popover.Content>
                        </Popover>
                    </Overlay>
                </div>
            </div>
        );
    }

}