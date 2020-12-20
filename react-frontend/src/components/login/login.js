import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert';
import history from '../../history';
import './login.css';

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            show: 'none',
            username: "",
            password: "",
            showAlert: false,
            alertText: '',
            checked:true,
        }
        this.wrapperRef = React.createRef();
        this.remember = React.createRef();
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
                "remember": this.state.checked,
            })
        }).then(response => {
            if (response.status === 200) {
                return response.text().then(text => {
                    this.setState({
                        showAlert: false,
                    })
                    this.props.sendUserName()
                    this.props.closeLogin();
                    history.push('/');
                })
            }
            else {
                return response.text().then(text => {
                    this.setState({
                        showAlert: true,
                        alertText: (JSON.parse(text))['message'],
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

    handleCheckboxChange = event =>
    this.setState({ checked: event.target.checked })

    render() {
        return (
            <div id="loginModal" className="login-modal" style={{ display: this.state.show }}>
                <div id="loginModalContent" className="login-modal-content" >
                    <div className="container" ref={this.wrapperRef}>
                        <div className="login-container">
                        <div className="row1">
                            <div className="col-md-8 offset-md-2">
                                <div className="login-form">
                                    <h1>Zaloguj się</h1>
                                    <form >
                                        <div className="form-group">
                                            <label>Nazwa użytkownika</label>
                                            <input type="username" className="form-control" aria-describedby="usernameHelp"
                                                placeholder="Nazwa użytkownika" onChange={this.onUserNameChange} value={this.state.username} />
                                        </div>
                                        <div className="form-group">
                                            <label>Hasło</label>
                                            <input type="password" className="form-control" placeholder="Hasło"
                                                onChange={this.onPasswordChange} value={this.state.password} />
                                        </div>
                                        <div class="form-group form-check">
                                            <input type="checkbox" class="form-check-input" checked={this.state.checked} onChange={this.handleCheckboxChange}/>
                                            <label class="form-check-label">Zapamiętaj mnie</label>
                                        </div>
                                        <button type="submit" className="btn btn-primary" onClick={this.login}>Zaloguj</button>
                                    </form>
                                    <br />
                                    {this.state.showAlert ?
                                        <Alert variant='danger' onClose={() => this.setState({ showAlert: false })} dismissible>
                                            <Alert.Heading>Nie udało się zalogować</Alert.Heading>
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
            </div>
        )
    }
}
