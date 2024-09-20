import Activity from './Activity';
import Poster from './Poster';
import PropTypes from 'prop-types';
import { useActivitiesQuery } from '../store/api';

export default function Activities({ current }) {
  const { data: activities, isSuccess } = useActivitiesQuery(undefined, {
    pollingInterval: Number(import.meta.env.VITE_LOAD_INTERVAL)
  });

  if (!isSuccess)
    return <></>;

  if (activities.length === 0)
    return (
      <section className='boardTextSection'>
        <h1>There are no activities, wanbeleid!</h1>
      </section>
    );

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
}

// Explain expected types, for early error detection
Activities.propTypes = {
  current: PropTypes.number.isRequired
};
