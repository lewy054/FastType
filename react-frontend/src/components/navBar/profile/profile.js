import React from 'react';
import { Overlay, Popover, Button, ButtonGroup } from 'react-bootstrap';

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

    showLogin = () => {
        this.props.showLogin();
        this.setState({
            show: false,
        })
    }

    showRegister = () => {
        this.props.showRegister();
        this.setState({
            show: false,
        })
    }

    logout = () => {
        this.props.logout();
        this.setState({
            show: false,
        })
    }

    render() {
        return (
            <div className="profile-container">
                <div className="profile" onClick={this.handleClick}>
                    <li><i className="fas fa-user"></i>{this.props.username}</li>
                </div>
                <div>
                    <Overlay
                        show={this.state.show}
                        transition={false}
                        target={this.state.target}
                        placement="bottom"
                        containerPadding={20}>
                        {this.props.logged ?
                            <Popover id="popover-contained" >
                                <Popover.Title as="h3">Cześć {this.props.username}</Popover.Title>
                                <Popover.Content>
                                    Jakieś tam dane profilu tu będą
                            </Popover.Content>
                                <ButtonGroup className="mb-2">
                                    <Button onClick={this.logout}>Wyloguj się</Button>
                                </ButtonGroup>
                            </Popover>
                            :
                            <Popover id="popover-contained" >
                                <Popover.Title as="h3">Cześć {this.props.username}</Popover.Title>
                                <Popover.Content>
                                    Zaloguj się by mieć dostęp do profilu
                            </Popover.Content>
                                <ButtonGroup className="mb-2">
                                    <Button onClick={this.showLogin}>Zaloguj</Button>
                                    <Button onClick={this.showRegister}>Zarejestruj</Button>
                                </ButtonGroup>
                            </Popover>}
                    </Overlay>
                </div>
            </div>
        );
    }

}