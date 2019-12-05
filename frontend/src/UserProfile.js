import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';

import { logout } from './store/actions'


class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.routeChange = this.routeChange.bind(this);
  }

  routeChange(path) {
    return () => this.props.history.push(path);
  }

  loginButton() {
    return (
      <NavItem>
      <Button onClick={this.routeChange('/login')}>Login</Button>
      </NavItem>
    )
  }

  render() {
    if (!this.props.loggedIn) {
      return this.loginButton()
    }
    return (
      <>
        <NavItem><NavLink disabled>{this.props.username}</NavLink></NavItem>
        <NavItem>
          <Button onClick={() => {
            this.props.dispatch(logout());
          }}>
            Logout
          </Button>
        </NavItem>
      </>
    )
    // console.log(this.state.auth)
  }
}

const mapStateToProps = function(state) {
  return {
    username: state.profile.username,
    loggedIn: state.auth.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(UserProfile));