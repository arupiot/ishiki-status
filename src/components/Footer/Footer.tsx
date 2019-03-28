import React, { Component } from 'react';
import QRCode  from 'qrcode.react';


interface IProps {
    statusEndpoint?: string
  }

class Footer extends React.Component<IProps> {

    bookingUrl = 'book.arupiot.com';

    render() {
        return (
            <div className="booking-prompt">
            <div className="link-text">
              {this.bookingUrl}
            </div>
            <div className="booking-qr">
                <QRCode 
                  renderAs='canvas'
                  size={90}
                  value={"http://" + this.bookingUrl} 
                />   
            </div>
          </div>
        )
    }
    

}

export default Footer;