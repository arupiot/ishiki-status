import React, { Component } from 'react';
import QRCode  from 'qrcode.react';
import './Footer.css';

interface IProps {
    statusEndpoint?: string
  }

class Footer extends React.Component<IProps> {

    bookingUrl = 'book.arupiot.com';

    render() {
        return (
            <div className="booking-prompt">
                <div className="link-text">
                  <b>Book this desk</b> @ {this.bookingUrl}<br/>
                  or by using the QR code
                </div>
              
                <div className="booking-qr">
                    <QRCode 
                      renderAs='canvas'
                      size={80}
                      value={"http://" + this.bookingUrl} 
                    />   
                </div>
            </div>
        )
    }
    

}

export default Footer;