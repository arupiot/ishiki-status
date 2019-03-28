import React, { Component } from 'react';


interface IProps {
    statusEndpoint?: string
  }

class Booked extends React.Component<IProps> {

    bookingUrl = 'book.arupiot.com';

    render() {
        return (
            <div>Booked!</div>
        )
    }
    

}

export default Booked;