import React, { Component } from 'react';
import logo from './francesco.png';
import axios from 'axios'
import './App.css';

interface IState {
  booked?: boolean;
  userEmail?: string;
  deskName?: string;
  deskId?: string;
  eth0Ip?: string;
  wlan0Ip?: string;
  hostname?: string;
  infoLoading?: boolean;
}

interface IProps {
  statusEndpoint?: string
}

class App extends React.Component<IProps, IState> {

  statusEndpoint = 'https://arup-iot-desk.appspot.com/api/desks/';
  infoEndpoint = 'http://172.24.2.65/info';
  infoLoading: boolean = true;

  constructor (props: any) {
    super(props)
    this.state = {
      booked: false,
      userEmail: '' ,
      deskName: '',
      deskId: '',
      infoLoading: true
    }
  }

  getStatus() {
    axios.get(this.statusEndpoint + this.state.deskId)
      .then(response => {
        console.log(response.data)
        this.setState({
          booked: response.data.booked,
          userEmail: response.data.user_email,
          deskName: response.data.name
        })
      })
  }

  getInfo() {

    axios.get(this.infoEndpoint).then( infoRes => {
      console.log(infoRes);
      this.setState({
        hostname: infoRes.data[0],
        eth0Ip: infoRes.data[2][0][2],
        wlan0Ip: infoRes.data[2][1][2],
        deskId: infoRes.data[1],
        infoLoading: false
      })
    })    
  }

  componentDidMount() {
    this.getInfo(); 
  }

  render() {

    if (this.state.infoLoading !== false) {
      setInterval( () => {
        this.getStatus()  
      }, 4000)  
    }

    return (
      <div className="App">
        <header className="App-header">
          <p className='debug'>
            <code>{this.state.hostname} : ({this.state.eth0Ip}) : ({this.state.wlan0Ip})</code>
          </p>
          <p>
            <code>{this.state.deskName}</code>
          </p>
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.booked ===  true && 
            <>
              <p>
                Booked by: {this.state.userEmail}
              </p>
              <p>
                until 5:30pm
              </p>
            </>
          }
        </header>
      </div>
    );
  }
}

export default App;
