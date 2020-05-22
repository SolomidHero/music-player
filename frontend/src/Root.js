import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'

import './stylesheets/index.css';
import App from './App';
import SideBar from './SideBar';
import NotFound from './NotFound';
import { Login, Signup } from './Form'
import { loadUser } from "./store/actions";

// React rendering
class RootComponent extends React.Component {
  render() {
    return (
      <Router>
        <SideBar className="App-header" />
        <main className="App-main">
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Signup} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Router>
    )
  }

  componentDidMount() {
    this.props.loadUser();
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(loadUser());
    }
  }
}

RootComponent = connect(mapStateToProps, mapDispatchToProps)(RootComponent)

export default RootComponent