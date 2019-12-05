import React from 'react';
import { connect } from 'react-redux';
// import { Button } from 'reactstrap';
import { login } from './store/actions'
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // TODO get request for signing in

    event.preventDefault();
    // verify username and password, get id
    let id = 123
    let passed = true

    if (passed) {
      this.props.dispatch(login(id, this.state.username))
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="App-login">
      <form onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <label htmlFor="inputEmail4" className="col-sm-3 col-form-label">Email</label>
          <div className="col-sm-10">
            <input
              type="text"
              name="username"
              className="form-control"
              id="inputEmail4"
              placeholder="Email"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword4" className="col-sm-3 col-form-label">Password</label>
          <div className="col-sm-10">
            <input
              type="password"
              name="password"
              className="form-control"
              id="inputPassword4"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">Sign in</button>
          </div>
        </div>
      </form>
      </div>
    )
  }
}

Login = connect()(withRouter(Login))


export { Login };