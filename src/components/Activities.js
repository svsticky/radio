import React from 'react';
import FluxComponent from 'flummox/component';

import StyleSheet from 'react-style';


const styles = StyleSheet.create({
  activities: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    WebkitColumns: `2 ${10 * Math.sqrt(2)}vh`
  },
  activity: {
    listStyle: 'none'
  },
  selected: {
    color: 'red'
  },
  advertisement: {
    display: 'none'
  }
});

export default class Activities extends React.Component {
  
  render() {
    return (
      <ul style={styles.activities}>
        { 
          this.props.activities.map(x => {
            if (x.type === 'activity') {
              return (
                <li styles={[styles.activity, this.props.currentActivity == x.id && styles.selected]}>
                  <h1>{x.content.name}</h1>
                  <div>{x.content.start_date}</div>
                </li>
              );
            //FIXME: Hax so that posters and activities are aligned
            // we can probably do something smarter.
            // My preferred way is to have a seperate location for 
            // advertisements.
            // we just hide advertisements in the activity log 
            } else {
              return <li style={styles.advertisement}></li>
            }
          })
        }
      </ul>
    );
  }
}
