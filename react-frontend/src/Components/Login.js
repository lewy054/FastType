import React from 'react';
import '../css/Login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }

  }

  onUserNameChange = (data) => {
    this.setState({
      username: data.target.value,
    })
  }

  onPasswordChange = (data) => {
    this.setState({
      password: data.target.value,
    })
  }

  onButtonClick = async (event) => {
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
    }).then(function (response) { // At this point, Flask has printed our JSON
      return response.text();
    }).then(text => {
      if (text === "OK") {
        window.open('/home', '_self');
      }
    }).catch(error => console.log(error))
  }

  render() {
    return (
      <div class="box">
          <h1>Login</h1>
          <input type="text" name="username" placeholder="Username" onChange={this.onUserNameChange} />
          <input type="password" name="password" placeholder="Password" onChange={this.onPasswordChange} />
          <button type="submit" name="submit" onClick={this.onButtonClick}>Login</button>
      </div>
    );
  }
}

