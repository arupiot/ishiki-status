import React, { Component } from 'react';
import logo from './francesco.png';
import axios from 'axios'
import './App.css';

interface IState {
  booked?: boolean;
  userEmail?: string;
  deskName?: string;
}

interface IProps {}

class App extends React.Component<IProps, IState> {

  constructor (props: any) {
    super(props)
    this.state = {
      booked: false,
      userEmail: '' ,
      deskName: ''
    }
  }

  render() {

    const id = '5629499534213120'

    axios.get('https://arup-iot-desk.appspot.com/api/desks/' + id)
    .then(response => {
      console.log(response.data)
      this.setState({
        booked: response.data.booked,
        userEmail: response.data.user_email,
        deskName: response.data.name
      })
    })

    const hostname:string = window.location.hostname

    return (
      <div className="App">
        <header className="App-header">
          <p>
            <code>{hostname}</code>
          </p>
          <p>
            <code>{this.state.deskName}</code>
          </p>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Booked by: {this.state.userEmail}
          </p>
          <p>
            Booked until 5:30pm
          </p>
        </header>
      </div>
    );
  }
}

export default App;
