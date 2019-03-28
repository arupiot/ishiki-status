import React, { Component } from 'react';
import './ColdDesk.css';

interface IProps {
    deskName: string | undefined;
    email: string | undefined;
    imgUrl: string | undefined;
  }

class ColdDesk extends React.Component<IProps> {

    render() {

        console.log(this.props.imgUrl);

        let processedEmail: string;

        

        return (
            <div className="colddesk-card">
                <div className="user-img">
                    <img src={this.props.imgUrl} /> 
                </div>
                <div className="user-info-wrapper">
                    <div className="real-cold-name">{this.props.email}</div>
                    <div className="desk-cold-name">@ desk {this.props.deskName}</div>
                    <div className="booked-cold-until">until 17:30</div>
                </div>
            </div>
        )
    }
    

}

export default ColdDesk;