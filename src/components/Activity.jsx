import { useEffect, useRef } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import scrollIntoView from 'scroll-into-view';

function sameDay(d, t) {
  return (
    d.getDate() === t.getDate() && // getDate returns day number in month...
    d.getMonth() === t.getMonth() &&
    d.getYear() === t.getYear()
  );
}

function createFormat(has_time, date, as = new Date()) {
  const format =
    (!sameDay(date, as) ? 'dddd DD-MM ' : '')
    + (has_time ? 'HH:mm' : '');
  return format || '[]';
}

const Activity = ({ active, name, start_date, end_date, has_start_time, has_end_time, participant_counter }) => {
  const activityRef = useRef(null);

  // Ensure that the current activity is visible
  useEffect(() => {
    if (active && activityRef.current) {
      scrollIntoView(activityRef.current, {
        time: 500,
      });
    }
  }, [active]);

  const startDate = moment(start_date)
    .format(createFormat(has_start_time, start_date));
  const endDate = moment(end_date)
    .format(createFormat(has_end_time, end_date, start_date));
  const className = 'activity' + (active ? ' active' : '');

  return (
    <li className={className} ref={activityRef}>
      <h1>
        {name}
        {participant_counter && ` (${participant_counter})`}
      </h1>
      <time>{startDate}</time>
      {endDate && <> - <time>{endDate}</time></>}
    </li>
  );
}

// Define the the types of this component, for early error detection
Activity.propTypes = {
  active: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  start_date: PropTypes.instanceOf(Date).isRequired,
  end_date: PropTypes.instanceOf(Date),
  has_start_time: PropTypes.bool.isRequired,
  has_end_time: PropTypes.bool.isRequired,
  participant_counter: PropTypes.string,
};

export default Activity;
