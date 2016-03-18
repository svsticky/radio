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

  render() {
    const props = this.props;
    const startDate = moment(props.start_date).format('DD/MM/YY');
    const endDate = props.end_date ? moment(props.end_date).format('DD/MM/YY') : null;

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
