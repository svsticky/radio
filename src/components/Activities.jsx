import { useState, useEffect } from 'react';
import Activity from './Activity';
import Poster from './Poster';
import { KOALA_ACTIVITY_ENDPOINT } from '../helpers/env';
import PropTypes from 'prop-types';

export default function Activities({ current, onChange }) {
  const activities = useActivities();

  if (activities.length > 0) {
    if (current >= activities.length - 1)
      onChange(true);

    const currentActivity = activities[current];
    return (
      <div>
        <ul className="activities">
          {activities.map((activity, i) =>
            <Activity
              key={i}
              {...activity}
              active={activity === currentActivity}
              />
          )}
        </ul>
        <Poster poster={currentActivity ? currentActivity.poster : null} />
      </div>
    );
  } else {
    return <></>;
  }
}

// Explain expected types, for early error detection
Activities.propTypes = {
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

function setDate(activity) {
  return Object.assign({
    ...activity,
    has_start_time: activity.start_date.indexOf('T') > -1,
    has_end_time: activity.end_date && activity.end_date.indexOf('T') > -1,
    start_date: new Date(activity.start_date)
  }, activity.end_date ? { end_date: new Date(activity.end_date) } : null);
}

function useActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(KOALA_ACTIVITY_ENDPOINT)
        // Fix activity dates and sort them on start_date
        .then(resp => resp.json())
        .then(activities =>
          setActivities(activities
            .filter(act => act.poster)
            .map(setDate)
            .sort((a, b) => a.start_date - b.start_date)));
    }, Number(import.meta.env.VITE_LOAD_INTERVAL));

    return () => clearInterval(interval);
  });

  return activities;
}
