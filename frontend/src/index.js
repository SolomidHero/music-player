import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

// Redux
import store from './ReduxStore'

import RootComponent from './Root'


// Backend endpoint
export const BACKEND_API = ''

ReactDOM.render(
  <Provider store={store}>
    <RootComponent/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
