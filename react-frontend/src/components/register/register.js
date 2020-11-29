import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert';

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
            showAlert: false,
            alertText: '',
            variant: 'danger',
            alertHead: 'Nie udało się zarejestrować',
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
        }).then(response => {
            if (response.status === 201) {
                return response.text().then(text => {
                    this.setState({
                        showAlert: true,
                        alertText: (JSON.parse(text))['message'],
                        variant: 'success',
                        alertHead: 'Zarejestrowano pomyślnie',
                    })
                })
            }
            else {
                return response.text().then(text => {
                    this.setState({
                        showAlert: true,
                        alertText: (JSON.parse(text))['message'],
                        variant: 'danger',
                        alertHead: 'Nie udało się zarejestrować',
                    })
                })
            }
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
            <div id="registerModal" className="register-modal" style={{ display: this.state.show }}>
                <div id="registerModalContent" className="register-modal-content" >
                    <div className="container" ref={this.wrapperRef}>
                        <div className="row1">
                            <div className="col-md-8 offset-md-2">
                                <div className="register-form">
                                    <h1>Zarejestruj się</h1>
                                    <form >
                                        <div className="form-group">
                                            <label >Nazwa użytkownika</label>
                                            <input type="username" className="form-control" aria-describedby="usernameHelp"
                                                placeholder="Wprowadź nazwę użytkownika" onChange={this.onUserNameChange} value={this.state.username} />
                                        </div>
                                        <div className="form-group">
                                            <label >Adres email</label>
                                            <input type="email" className="form-control" aria-describedby="emailHelp"
                                                onChange={this.onEmailChange} placeholder="Wprowadź swój adres email" value={this.state.email} />
                                        </div>
                                        <div className="form-group">
                                            <label >Hasło</label>
                                            <input type="password" className="form-control" placeholder="Hasło"
                                                onChange={this.onPasswordChange} value={this.state.password} />
                                        </div>
                                        <div className="form-group">
                                            <label >Powtórz hasło</label>
                                            <input type="password" className="form-control"
                                                placeholder="Powtórz hasło" onChange={this.onPassConfChange} value={this.state.confPass} />
                                        </div>
                                        <button type="submit" className="btn btn-primary" onClick={this.register}>Zarejestruj się</button>
                                    </form>
                                    <br />
                                    {this.state.showAlert ?
                                        <Alert variant={this.state.variant} onClose={() => this.setState({ showAlert: false })} dismissible>
                                            <Alert.Heading>{this.state.alertHead}</Alert.Heading>
                                            <p>
                                                {this.state.alertText}
                                            </p>
                                        </Alert>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
