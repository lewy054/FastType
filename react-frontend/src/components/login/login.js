import React, { Component } from 'react'

import './login.css';

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            show: 'none',
            username: "",
            password: "",
        }
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }


    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        let modal = document.getElementById('loginModal');
        modal.classList.toggle('modal-slide')
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.closeLogin();
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.show !== state.show) {
            return {
                show: props.show,
            }
        }
        return null;
    }

    handleClose = () => {
        this.props.closeLogin();
    }


    login = async (event) => {
        event.nativeEvent.preventDefault();
        await fetch('/login', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password,
            })
        }).then(function (response) {
            return response.text();
        }).then(text => {
            console.log('zalogowany');
        }).catch(error => console.log(error))
    }

    onUserNameChange = (data) => {
        this.setState({
            username: data.target.value,
        });
    }

    onPasswordChange = (data) => {
        this.setState({
            password: data.target.value,
        });
    }

    render() {
        return (
            <div id="loginModal" className="login-modal" style={{ display: this.state.show }}>
                <div id="loginModalContent" className="login-modal-content" >
                    <div className="container" ref={this.wrapperRef}>
                        <div className="row1">
                            <div className="col-md-8 offset-md-2">
                                <div className="login-form">
                                    <h1>Zaloguj się</h1>
                                    <form >
                                        <div className="form-group">
                                            <label for="InputUserName">Nazwa użytkownika</label>
                                            <input type="username" className="form-control" aria-describedby="usernameHelp"
                                                placeholder="Nazwa użytkownika" onChange={this.onUserNameChange} value={this.state.username} />
                                        </div>
                                        <div className="form-group">
                                            <label for="InputPassword">Hasło</label>
                                            <input type="password" className="form-control" placeholder="Hasło"
                                                onChange={this.onPasswordChange} value={this.state.password} />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Zaloguj</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
