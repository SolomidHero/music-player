import React from 'react';
import logo from './data/logo.svg';
import Player from './Player';
import './stylesheets/App.css';

class App extends React.Component {
  render() {
    return (
      <>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-player">
          <Player />
        </div>
      </>
    );
  }
}

export default App;
