import React from 'react';
import { Button } from 'reactstrap';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: "logged out",
      username: " ",
      password: " "
    };

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    console.log(this.state.username)
    this.setState({ username: event.target.value });
  }

  handleChangePassword(event) {
    console.log(this.state.username)
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ auth: "logged in" })
    event.preventDefault();
  }

  loginButton() {
    return (
      <Button onClick={() => {
        this.setState({ auth: "logging" })
      }}>Login</Button>
    )
  }

  loginForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChangeUsername} />
        </label>
        <label>Password:
          <input
            type="text"
            value={this.state.password}
            onChange={this.handleChangePassword}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }

  render() {
    console.log(this.state.auth)
    switch (this.state.auth) {
      case "logged out":
        return this.loginButton()
      case "logging":
        return this.loginForm()
      case "logged in":
        return (
          <>
            <div>
              {this.state.username}
            </div>
            <Button onClick={() => {
              this.setState({ auth: "logged out"})
            }}>
              Logout
            </Button>
          </>
        )
      default:
        break;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.auth === "logging") {

    }
  }
}

export default UserProfile;