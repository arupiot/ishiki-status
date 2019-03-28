import React, { Component } from 'react';

interface IProps {
    deskName: string | undefined;
    userEmail: string | undefined;
}

class Booked extends React.Component<IProps> {

    render() {
        return (
            <>
                <div>{this.props.userEmail}</div>
                <div>{this.props.deskName}</div>
                <div>Booked until 17:30</div>
            </>
        )
    }
    

}

export default Booked;