import Activity from './Activity';
import Poster from './Poster';
import PropTypes from 'prop-types';
import { useActivitiesQuery } from '../store/koala';

export default function Activities({ current, onChange }) {
  const { data: activities, isSuccess } = useActivitiesQuery({
    pollingInterval: Number(import.meta.env.VITE_LOAD_INTERVAL)
  });

  if (!isSuccess)
    return <></>;

  if (current >= activities.length - 1)
    onChange(true);

  if (activities.length > 0) {
    const currentActivity = activities[current];
    return (
      <div>
        <ul className='activities'>
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


// function useActivities() {
//   const [activities, setActivities] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetch(KOALA_ACTIVITY_ENDPOINT)
//         // Fix activity dates and sort them on start_date
//         .then(resp => resp.json())
//         .then(activities =>
//           setActivities(activities
//             .filter(act => act.poster)
//             .map(setDate)
//             .sort((a, b) => a.start_date - b.start_date)));
//     }, Number(import.meta.env.VITE_LOAD_INTERVAL));

//     return () => clearInterval(interval);
//   }, []);

//   return activities;
// }
