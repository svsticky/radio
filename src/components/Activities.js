import React from 'react';
import Activity from './Activity';

export default function Activities(props) {
  return (
    <ul className='activities'>
      { props.activities.map((activity, i) => <Activity key={i} {...activity} active={i === props.currentActivity} />) }
    </ul>
  );
}
