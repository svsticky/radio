import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import scrollIntoView from 'scroll-into-view';

export default class Activity extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.ensureVisible();
  }

  componentDidUpdate() {
    this.ensureVisible();
  }

  ensureVisible() {
    if (this.props.active) {
      scrollIntoView(findDOMNode(this), {
        time: 200,
        ease: v => Math.pow(v,2) - v,
      });
    }
  }

  sameDay(d, t = new Date()) {
      return d.getDay() == t.getDay() &&
          d.getMonth() == t.getMonth() &&
          d.getYear() == t.getYear();
  }

  makeStartDate() {
      var sd = this.props.start_date;
      if (this.sameDay(sd) && this.props.has_start_time)
          return moment(sd).format("HH:mm");

      if (this.props.has_start_time)
          return moment(sd).format('DD-MM HH:mm');

      return moment(sd).format('DD-MM');
  }

  makeEndDate() {
      var ed = this.props.end_date;
      if (!ed) return null;
      if (this.sameDay(ed, this.props.start_date)) {
          if (this.props.has_end_time)
              return moment(ed).format("HH:mm");
          return null; // Same as start_date
      }

      if (this.props.has_end_time)
          return moment(ed).format('DD-MM HH:mm');

      return moment(ed).format('DD-MM');
  }

  render() {
    const props = this.props;
    const startDate = this.makeStartDate();
    const endDate = this.makeEndDate();

    let className = 'activity';
    if (props.active) {
      className += ' active';
    }

    return (
      <li className={className}>
        <h1>{props.name}</h1>
        <time>{startDate}</time>
        {endDate ? <time>{endDate}</time> : null}
      </li>
    );
  }
}
