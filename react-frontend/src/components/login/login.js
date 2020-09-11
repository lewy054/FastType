import React from 'react';
import '../css/login.css';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confPass: "",
      email: "",
      login: true,
    }

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

  moveToLogin = () => {
    this.setState({
      login: true,
    });
  }

  moveToRegister = () => {
    this.setState({
      login: false,
      name: "",
      password: "",
      confPass: "",
      email: "",
    });
  }

  login = async (event) => {
    event.nativeEvent.preventDefault(); // prevent form form submitting/ going to new page
    await fetch('/signIn', {
      method: 'POST',
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
      if (text === "OK") {
        window.open('/home', '_self');
      }
    }).catch(error => console.log(error))
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

  render() {
    if (this.state.login) {
      return (
        <div class="container">
          <button type="card" name="loginClicked" onClick={this.moveToLogin}>Zaloguj</button><button type="card" name="register" onClick={this.moveToRegister}>Zarejestruj</button>
          <div class="box">
            <h1>Login</h1>
            <input type="text" name="username" onChange={this.onUserNameChange} value={this.state.username} placeholder="Login"/>
            <input type="password" name="password" onChange={this.onPasswordChange} value={this.state.password} placeholder="Hasło" />
            <button type="submit" name="login" onClick={this.login}>Zaloguj</button>
          </div>
        </div>
      );
    }
    else {
      return (
        <div class="container">
          <button type="card" name="login" onClick={this.moveToLogin}>Zaloguj</button><button type="card" name="registerClicked" onClick={this.moveToRegister}>Zarejestruj</button>
          <div class="box">
            <h1>Register</h1>
            <input type="text" name="username" onChange={this.onUserNameChange} value={this.state.username} placeholder="Login"/>
            <input type="text" name="email" onChange={this.onEmailChange} value={this.state.email} placeholder="Email" />
            <input type="password" name="password" onChange={this.onPasswordChange} value={this.state.password} placeholder="Hasło" />
            <input type="password" name="confPass" onChange={this.onPassConfChange} value={this.state.confPass} placeholder="Potwierdź" />
            <button type="submit" name="register" onClick={this.register}>Zarejestruj</button>
          </div>
        </div>
      )
    }
  }
}

