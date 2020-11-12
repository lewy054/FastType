import React, { Component } from 'react'

import './register.css';

export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            show: 'none',
            username: "",
            password: "",
            confPass: "",
            email: "",
        }
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }


    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        let modal = document.getElementById('registerModal');
        modal.classList.toggle('modal-slide')
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.closeRegister();
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
        this.props.closeRegister();
    }


    register = async (event) => {
        event.nativeEvent.preventDefault();
        await fetch('/register', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password,
                "confPass": this.state.confPass,
                "email": this.state.email,
            })
        }).then(function (response) {
            return response.text();
        }).then(text => {
            console.log('zarejestrowany');
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

    onPassConfChange = (data) => {
        this.setState({
            confPass: data.target.value,
        });
    }

    onEmailChange = (data) => {
        this.setState({
            email: data.target.value,
        });
    }


    render() {
        return (
            <div id="registerModal" className="modal" style={{ display: this.state.show }}>
                <div id="registerModal" className="modal-content" ref={this.wrapperRef}>
                    <div class="col-md-8 offset-md-2">
                        <div class="register-form">
                            <h1>Zarejestruj się</h1>
                            <form >
                            <div class="form-group">
                                    <label for="InputUserName">Nazwa użytkownika</label>
                                    <input type="username" class="form-control" id="InputUserName" aria-describedby="usernameHelp" placeholder="Wprowadź nazwę użytkownika" />
                                </div>
                                <div class="form-group">
                                    <label for="InputEmail">Adres email</label>
                                    <input type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Wprowadź swój adres email" />
                                </div>
                                <div class="form-group">
                                    <label for="InputPassword">Hasło</label>
                                    <input type="password" class="form-control" id="InputPassword" placeholder="Hasło" />
                                </div>
                                <div class="form-group">
                                    <label for="InputRepeatPassword">Powtórz hasło</label>
                                    <input type="password" class="form-control" id="InputRepeatPassword" placeholder="Powtórz hasło" />
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
