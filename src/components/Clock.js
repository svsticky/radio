import React, { Component } from 'react';

export default class Clock extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
          date: new Date()
        };
    }

    componentDidMount() {
      console.log(this.state.date)
      this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    tick() {
      console.log(this._ismounted == true)
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      let formattedDate = this.state.date.toLocaleTimeString("nl-NL", {hour: "2-digit", minute:"2-digit"});
      return (
        <div className="clock-wrapper">
          <span className="clock">
            {formattedDate}
          </span>
        </div>
      );
    }
  }