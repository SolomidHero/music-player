import React from 'react';
import logo from './data/logo.svg';
import Player from './Player';
import SideBar from './SideBar';
import './stylesheets/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SideBar />
      </header>
      <main className="App-main">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-player">
          <Player/>
        </div>
      </main>
    </div>
  );
}

export default App;
