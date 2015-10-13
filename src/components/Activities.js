import React from 'react';
import FluxComponent from 'flummox/component';


export default class Activities extends React.Component {
  
  render() {
    var cx = React.addons.classSet;

    return (
      <ul className='calendar'>
        { 
          this.props.activities.map(x => {
            const classes = cx({
              'event': true,
              'active': this.props.currentActivity == x.id
            });
            if (x.type === 'activity') {
              return (
                <li className={classes}>
                  <h1>{x.content.name}</h1>
                  <time>{x.content.start_date.toString()}</time>
                </li>
              );
            //FIXME: Hax so that posters and activities are aligned
            // we can probably do something smarter.
            // My preferred way is to have a seperate location for 
            // advertisements.
            // we just hide advertisements in the activity log 
            } else {
              return <li className='advertisement'></li>
            }
          })
        }
      </ul>
    );
  }
}
