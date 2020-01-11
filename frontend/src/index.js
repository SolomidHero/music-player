import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'

import configureStore from './store/store'
import { LogoutState } from './store/reducers/UserUpdater'

import './stylesheets/index.css';
import App from './App';
import SideBar from './SideBar';
import NotFound from './NotFound';
import { Login, Signup } from './Form'

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

// Redux
const store = configureStore(LogoutState)

// React rendering
const routing = (
  <Provider store={store}>
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
  </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));

let proxy = ""
// let proxy = "https://cors-anywhere.herokuapp.com/"
let url = "http://127.0.0.1:8000/users/"
fetch(proxy + url)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(e => console.log(e))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
