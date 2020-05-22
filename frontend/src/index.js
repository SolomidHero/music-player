import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import configureStore from './store/store'
import { LogoutState } from './store/reducers/UserUpdater'

import './stylesheets/index.css';
import App from './App';
import SideBar from './SideBar';
import NotFound from './NotFound';
import { Login, Signup } from './Form'
import { loadUser } from "./store/actions";

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

// Redux
const store = configureStore(LogoutState)

// Backend endpoint
export const BACKEND_API = 'http://localhost:8000'

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

ReactDOM.render(
  <Provider store={store}>
    <RootComponent/>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
