import React, { Component } from 'react';
import './Booked.css';

interface IProps {
    deskName: string | undefined;
    userEmail: string | undefined;
}

class Booked extends React.Component<IProps> {

    render() {
        return (
            <div className="booked-card">
                <div className="user-name">{this.props.userEmail}</div>
                <div className="desk-booked-name">Desk {this.props.deskName}</div>
                <div className="until">Booked until 17:30</div>
            </div>
        )
    }

}

export default Booked;