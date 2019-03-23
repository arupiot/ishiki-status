import React, { Component } from 'react';
import axios from 'axios'
// First way to import
import { ClipLoader } from 'react-spinners';
import { MdDone } from 'react-icons/md';
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
  statusLoading?: boolean;
}

interface IProps {
  statusEndpoint?: string
}

class App extends React.Component<IProps, IState> {

  statusEndpoint = 'https://arup-iot-desk.appspot.com/api/desks/';
  infoEndpoint = 'http://statusserver/info';
  infoLoading: boolean = true;

  constructor (props: any) {
    super(props)
    this.state = {
      booked: false,
      userEmail: '' ,
      deskName: '',
      deskId: '',
      infoLoading: true,
      statusLoading: true,
    }
  }

  getStatus() {
    if (this.state.deskId !== '') {
      axios.get(this.statusEndpoint + this.state.deskId)
      .then(response => {
        console.log(response.data)
        this.setState({
          booked: response.data.booked,
          userEmail: response.data.user_email,
          deskName: response.data.name,
          statusLoading: false
        })
      })
    }
  }

  getInfo() {

    axios.get(this.infoEndpoint).then( infoRes => {
      console.log(infoRes);
      if (infoRes.data[2].length) {

        const wlan0Ip = infoRes.data[2][1] !== undefined ? infoRes.data[2][1] : null 

        this.setState({
          hostname: infoRes.data[0],
          eth0Ip: infoRes.data[2][0][2],
          wlan0Ip: wlan0Ip,
          deskId: infoRes.data[1],
          infoLoading: false
        })
      }
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
          {!this.state.booked && !this.state.statusLoading ? ( 
            <>
              ...is available! 
            <p className='available-tick'>
              <MdDone/>
            </p>
          </> ) : (
             <ClipLoader
             css={''}
             sizeUnit={"px"}
             size={150}
             color={'#fff'}
             loading={this.state.statusLoading}
           /> 
          )
          }
          {this.state.booked && 
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
