import React from 'react';
import Activity from './Activity';
import Poster from './Poster';

export default function Activities(props) {
  return (
    <div>
      <ul className='activities'>
        { props.activities.map((activity, i) => <Activity key={i} {...activity} active={i === props.currentActivity} />) }
      </ul>
      <Poster poster={props.poster} />
    </div>
  );
}
