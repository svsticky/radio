import React, { Component } from 'react';

export default class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        console.log(this.props);
        let quote = this.props.quote[0];
        let quoter = this.props.quote[1];
        return (
            <div className='quote'>

                <div className='quoteText'>{quote}</div>
                <div className='quoteText Author'>- {quoter}</div>
            </div>
        );
    }
}