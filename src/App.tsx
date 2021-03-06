import React, { Component } from 'react';
import axios from 'axios'
import { ClipLoader } from 'react-spinners';
import { MdDone, MdSignalWifiOff } from 'react-icons/md';
import './App.css';


import ColdDesk from './components/ColdDesk/ColdDesk';
import Available from './components/Available/Available';
import Booked from './components/Booked/Booked';
import Footer from './components/Footer/Footer';

interface NetworkError {
  type: string | null;
  message: string | null;
}

interface IState {
  booked?: boolean;
  userEmail?: string;
  deskName?: string | undefined;
  deskId?: string;
  eth0Ip?: string;
  wlan0Ip?: string;
  hostname?: string;
  infoLoading?: boolean;
  statusLoading: boolean;
  networkError?: NetworkError | null;
  hotdesk: boolean;
  imgUrl: string | undefined;
}

interface IProps {
  statusEndpoint?: string
}

interface StatusLoadingProps {
  statusLoading: boolean;
}

interface NetworkErrorProps {
  message: string | null;
  deskId?: string;
}


const NetworkError: React.SFC<NetworkErrorProps>  = (props) => (
  <div className='network-error-wrapper'>
    <MdSignalWifiOff className='network-error'/>
    <div>{props.message}, deskId: {props.deskId}</div>
  </div>
);

const StatusLoading: React.SFC<StatusLoadingProps>  = (props) => {
  return (
    <ClipLoader
      sizeUnit={"px"}
      size={100}
      color={'#fff'}
      loading={props.statusLoading}
    /> 
  )
}


class App extends React.Component<IProps, IState> {

  statusEndpoint = 'https://arup-iot-desk.appspot.com/api/desks/';
  bookingUrl = 'book.arupiot.com';
  infoEndpoint: string;
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
      networkError: null,
      hotdesk: false,
      imgUrl: undefined
    }
    console.log(process.env.NODE_ENV);
    
    if (process.env.NODE_ENV === 'development') {
      this.infoEndpoint = 'http://10.18.32.41/info';
    } else {
      this.infoEndpoint = 'http://localhost/info'
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
          hotdesk: response.data.hotdesk,
          imgUrl: response.data.cold_img,
          statusLoading: false,
          networkError: null
        })
      })
      .catch( error => {
        console.log('Error getting status!', error);
        this.setState({
          networkError: {
            type: 'WAN',
            message: 'Cannot contact appspot api'
          }
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
          infoLoading: false,
          networkError: null,
          imgUrl: undefined
        })
      }
    })  
    .catch( error => {
      console.log('Error getting info!', error);
      this.setState({
        networkError: {
          type: 'local',
          message: 'Cannot contact local statusserver'
        }
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
          <>
            { (process.env.NODE_ENV === 'development' && process.env.REACT_APP_STAGE == null) &&
              <>
                <p className='debug'>
                  <code>{this.state.hostname} : ({this.state.eth0Ip}) : ({this.state.wlan0Ip})</code>
                </p>
              </>
            }
          </>

          {!this.state.hotdesk && !this.state.statusLoading &&
            <ColdDesk 
              deskName={this.state.deskName}
              email={this.state.userEmail}
              imgUrl={this.state.imgUrl}
            />
          } 


          {!this.state.booked && !this.state.statusLoading && this.state.hotdesk ? ( 
            <>
              
          </> ) : ( this.state.networkError ? 
                      <NetworkError message={this.state.networkError.message} deskId={this.state.deskId} />
                    : 
                      <StatusLoading
                        statusLoading={this.state.statusLoading} 
                      />
          )
          }

          
          {(!this.state.booked && this.state.hotdesk && !this.state.statusLoading) &&
            <Available
              deskName={this.state.deskName}
            /> 
          }

          {(this.state.booked && this.state.hotdesk && !this.state.statusLoading) &&
            <Booked
              deskName={this.state.deskName}
              userEmail={this.state.userEmail}
            /> 
          }

          {this.state.hotdesk &&
            <Footer />
          }

        </header>
        
      </div>
      
      
    );
  }
}

export default App;
