import React, { Component } from 'react';
import logo from './francesco.png';
import axios from 'axios'
import './App.css';

interface IState {
  booked?: boolean;
  userEmail?: string;
  deskName?: string;
  deskId?: string;
}

interface IProps {
  statusEndpoint?: string
}

class App extends React.Component<IProps, IState> {

  statusEndpoint = 'https://arup-iot-desk.appspot.com/api/desks/';
  infoEndpoint = 'http://172.24.2.65/info';

  constructor (props: any) {
    super(props)
    this.state = {
      booked: false,
      userEmail: '' ,
      deskName: '',
      deskId: ''
    }
  }

  getStatus() {

    const id = '5629499534213120'

    const requests = [
      axios.get(this.infoEndpoint),
      axios.get(this.statusEndpoint + id) 
    ]; 

    axios.get(this.infoEndpoint).then( infoRes => {
      console.log(infoRes);

    })
  
    // axios.get(this.statusEndpoint + id)
    //   .then(response => {
    //     console.log(response.data)
    //     this.setState({
    //       booked: response.data.booked,
    //       userEmail: response.data.user_email,
    //       deskName: response.data.name
    //     })
    //   })
  }

  componentDidMount() {

    this.getStatus(); 

    setInterval( () => {
      this.getStatus()  
    }, 4000)

    
  }

  render() {

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
