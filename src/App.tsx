import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {

    const hostname = window.location.hostname

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hostname: <code>{hostname}</code>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
