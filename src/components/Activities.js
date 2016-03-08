import React from 'react';
import FluxComponent from 'flummox/component';

const moment = require('moment');

export default class Activities extends React.Component {
  
  render() {
    const cx = React.addons.classSet;

    const classes = cx({
      'event': true,
    });

    const x = this.props.activities[this.props.currentActivity];

    return (
      <ul className='calendar'>
        {(() => {
          if (x) {
            switch (x.type) {
              case 'activity':
                return (
                  <li className={classes}>
                    <h1>{x.content.name}</h1>
                    <time>{moment(x.content.start_date).format('DD/MM/YY')}</time>
                    <time>{moment(x.content.end_date).format('DD/MM/YY')}</time>
                  </li>
                );
              case 'advertisement':
                break;
            }
          }
        })()}
      </ul>
    );
  }
}
