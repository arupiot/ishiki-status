import React, { Component } from 'react';
import QRCode  from 'qrcode.react';


interface IProps {
    deskName: string | undefined;
  }

class Available extends React.Component<IProps> {

    bookingUrl = 'book.arupiot.com';

    render() {
        return (
            <>
                <div>Desk {this.props.deskName}</div>
                <div>Availble until 17:30</div>
            </>
        )
    }
    

}

export default Available;