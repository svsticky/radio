import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import moment from "moment";
import scrollIntoView from "scroll-into-view";

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
        time: 500,
      });
    }
  }

  sameDay(d, t = new Date()) {
    return (
      d.getDate() == t.getDate() && // getDate returns day number in month...
      d.getMonth() == t.getMonth() &&
      d.getYear() == t.getYear()
    );
  }

  makeStartDate() {
    var sd = this.props.start_date;
    if (this.sameDay(sd) && this.props.has_start_time)
      return moment(sd).format("HH:mm");

    if (this.props.has_start_time) return moment(sd).format("dddd DD-MM HH:mm");

    return moment(sd).format("dddd DD-MM");
  }

  makeEndDate() {
    var ed = this.props.end_date;
    if (!ed) return null;
    if (this.sameDay(ed, this.props.start_date)) {
      if (this.props.has_end_time) return moment(ed).format("HH:mm");
      return null; // Same as start_date
    }

    if (this.props.has_end_time) return moment(ed).format("dddd DD-MM HH:mm");

    return moment(ed).format("dddd DD-MM");
  }

  render() {
    const props = this.props;
    const startDate = this.makeStartDate();
    const endDate = this.makeEndDate();
    var participants = "";

    if (props.participant_counter != null)
      participants = ` (${props.participant_counter})`;

    let className = "activity";
    if (props.active) {
      className += " active";
    }

    return (
      <li className={className}>
        <h1>
          {props.name}
          {participants}
        </h1>
        <time>{startDate}</time>
        {endDate ? <time> - {endDate}</time> : null}
      </li>
    );
  }
}
