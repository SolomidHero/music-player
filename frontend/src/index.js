import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'
import configureStore from './store/store'

import './stylesheets/index.css';
import App from './App';
import SideBar from './SideBar';
import NotFound from './NotFound';
import { Login } from './Form'

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

// Redux
const store = configureStore({
  auth: {
    loggedIn: false
  },
  profile: {
    id: null,
    username: null
  },
  song: {
    id: null,
    name: null,
    time: 0
  }
})

// React rendering
const routing = (
  <Provider store={store}>
  <Router>
    <SideBar className="App-header" />
    <main className="App-main">
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </main>
  </Router>
  </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
