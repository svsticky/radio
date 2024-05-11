import { useEffect, useRef } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import scrollIntoView from 'scroll-into-view';

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

  const sameDay = (d, t = new Date()) => {
    return (
      d.getDate() === t.getDate() && // getDate returns day number in month...
      d.getMonth() === t.getMonth() &&
      d.getYear() === t.getYear()
    );
  }

  const makeStartDate = () => {
    var sd = start_date;
    if (sameDay(sd) && has_start_time)
      return moment(sd).format('HH:mm');

    if (has_start_time) return moment(sd).format('dddd DD-MM HH:mm');

    return moment(sd).format('dddd DD-MM');
  }

  const makeEndDate = () => {
    var ed = end_date;
    if (!ed) return null;
    if (sameDay(ed, start_date)) {
      if (has_end_time) return moment(ed).format('HH:mm');
      return null; // Same as start_date
    }

    if (has_end_time) return moment(ed).format('dddd DD-MM HH:mm');

    return moment(ed).format('dddd DD-MM');
  }

  const startDate = makeStartDate();
  const endDate = makeEndDate();
  var participants = '';

  if (participant_counter != null)
    participants = ` (${participant_counter})`;

  let className = 'activity';
  if (active) {
    className += ' active';
  }

  return (
    <li className={className} ref={activityRef}>
      <h1>
        {name}
        {participants}
      </h1>
      <time>{startDate}</time>
      {endDate ? <time> - {endDate}</time> : null}
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
  participant_counter: PropTypes.number,
};

export default Activity;
