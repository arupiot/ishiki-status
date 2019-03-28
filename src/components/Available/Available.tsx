import React, { Component } from 'react';
import QRCode  from 'qrcode.react';
import './Available.css';


interface IProps {
    deskName: string | undefined;
}

class Available extends React.Component<IProps> {

    bookingUrl = 'book.arupiot.com';

    render() {
        return (
            <div className="available-card">
                <div className="desk-name">Desk {this.props.deskName}</div>
                <div className="until">Availble until 17:30</div>
            </div>
        )
    }
    

}

export default Available;