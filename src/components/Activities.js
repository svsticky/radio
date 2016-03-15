import React from 'react';
import FluxComponent from 'flummox/component';

const moment = require('moment');

export default class Activities extends React.Component {
  
  render() {
    const cx = React.addons.classSet;


    const x = this.props.activities[this.props.currentActivity];

    return (
      <ul className='calendar'>
        {this.props.activities.map(
          (x,i) => {
            const classes = cx({
              'event': true,
              'active': i === this.props.currentActivity
            });
            if (x.type == 'activity') {
              return (
                <li className={classes}>
                  <h1>{x.content.name}</h1>
                  <time>{moment(x.content.start_date).format('DD/MM/YY')}</time>
                  <time>{x.content.end_date !== null ? moment(x.content.end_date).format('DD/MM/YY') : ''}</time>
                </li>
              );
            } else {
              return (<li className='advertisement'></li>);
            }
          })
          }
      </ul>
    );
  }
}
