import React from 'react';
import { connect } from 'react-redux';
// import { Button } from 'reactstrap';
import { login, register } from './store/actions'
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
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange(path) {
    return () => this.props.history.push(path);
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
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
    return (
      <div className="App-login">
      <form className="App-login-form" onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <label htmlFor="inputEmail4" className="col-sm-3 col-form-label">Username</label>
          <div className="col-sm-10">
            <input
              type="text"
              name="username"
              className="form-control"
              id="inputEmail4"
              placeholder="Username"
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
          <div className="col-sm-4">
            <button type="submit" className="col-sm btn btn-primary">Sign in</button>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-4">
            <button className="col-sm btn btn-primary"
              onClick={this.routeChange('/register')}>Register</button>
          </div>
        </div>
      </form>
      </div>
    )
  }
}

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      repeated_password: ""
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
    event.preventDefault();

    // post request for registration
    if (this.state.password === this.state.repeated_password) {
      this.props.register(this.state.username, this.state.email, this.state.password);
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
    return (
      <div className="App-login">
        <form className="App-login-form" onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <label htmlFor="inputEmail4" className="col-sm-3 start-sm col-form-label">Email</label>
          <div className="col-sm">
            <input
              type="email"
              name="email"
              className="form-control"
              id="inputEmail4"
              value={this.state.email}
              onChange={this.handleInputChange}/>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputUsername" className="col-sm-3 col-form-label">Username</label>
          <div className="col-sm">
            <input
              type="text"
              name="username"
              className="form-control"
              id="inputUsername"
              value={this.state.username}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword4" className="col-sm-3 col-form-label">Password</label>
          <div className="col-sm">
            <input
              type="password"
              name="password"
              className="form-control"
              id="inputPassword"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3"></div>
          <div className="col-sm-9">
            <input
              type="password"
              name="repeated_password"
              className="form-control"
              id="repeatPassword"
              placeholder="repeat password"
              value={this.state.repeated_password}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck" />
            <label className="form-check-label" htmlFor="gridCheck">
              I agree with terms of use.
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return { field, message: state.auth.errors[field] };
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(login(username, password));
    },
    register: (username, email, password) => {
      return dispatch(register(username, email, password));
    }
  };
}


Login = connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
Signup = connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup))

export { Login, Signup };