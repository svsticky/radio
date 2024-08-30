import { useEffect, useRef } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import scrollIntoView from 'scroll-into-view';

function sameDay(d, t) {
  return (
    d.date() === t.date() &&
    d.month() === t.month() &&
    d.year() === t.year()
  );
}

function formatDate(has_time, date, as = moment()) {
  const format =
    (!sameDay(date, as) ? 'dddd DD-MM ' : '')
    + (has_time ? 'HH:mm' : '');
  return date.format(format || '[]');
}

export default function Activity({ active, name, start_date, end_date, has_start_time, has_end_time, participant_counter }) {
  const activityRef = useRef(null);

  // Ensure that the current activity is visible
  useEffect(() => {
    if (active && activityRef.current) {
      scrollIntoView(activityRef.current, {
        time: 500,
      });
    }
  }, [active]);

  //  TODO: Get rid of moment for formatting some time
  start_date = moment(start_date);

  const formattedStartDate = formatDate(has_start_time, start_date);
  const formattedEndDate = end_date
    ? formatDate(has_end_time, moment(end_date), start_date)
    : '';

  return (
    <li className={`activity ${active ? 'active' : ''}`} ref={activityRef}>
      <h1>
        {name}
        {participant_counter && ` (${participant_counter})`}
      </h1>
      <time>{formattedStartDate}</time>
      {formattedEndDate && <> - <time>{formattedEndDate}</time></>}
    </li>
  );
}

// Define the the types of this component, for early error detection
Activity.propTypes = {
  active: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string,
  has_start_time: PropTypes.bool.isRequired,
  has_end_time: PropTypes.bool.isRequired,
  participant_counter: PropTypes.string,
};
