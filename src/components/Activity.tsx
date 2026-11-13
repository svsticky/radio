import { useEffect, useRef } from 'react';
import moment from 'moment';
import { type Activity } from '../store/api';

function sameDay(d: Date, t: Date): boolean {
  return (
    d.getDate() === t.getDate() && // getDate returns day number in month...
    d.getMonth() === t.getMonth() &&
    d.getFullYear() === t.getFullYear()
  );
}

/**
 * Create a format for the activity date
 *
 * If the date is today or the same same as the end date (supplied by the as parameter)
 * then the day is not displayed. Additionally if the activity has a time, then it is
 * displayed.
 */
function createFormat(has_time: boolean, date: Date, as = new Date()): string {
  const format =
    (!sameDay(date, as) ? 'dddd DD-MM ' : '') + (has_time ? 'HH:mm' : '');
  return format || '[]';
}

type ActivityProps = Activity & { active: boolean };

export default function Activity({
  active,
  name,
  start_date,
  end_date,
  has_start_time,
  has_end_time,
  participant_counter,
  participant_max,
  isEnrollable,
}: ActivityProps) {
  const activityRef = useRef<HTMLLIElement | null>(null);

  // Ensure that the current activity is visible
  useEffect(() => {
    if (active && activityRef.current)
      activityRef.current.scrollIntoView({
        behavior: 'smooth',
      });
  }, [active]);

  const startDate = moment(start_date).format(
    createFormat(has_start_time, new Date(start_date)),
  );
  const endDate = end_date
    ? moment(end_date).format(
        createFormat(has_end_time, new Date(end_date), new Date(start_date)),
      )
    : null;
  const participantLabel = (() => {
    if (!isEnrollable) return '';
    const count = Number(participant_counter || 0);
    const max = Number(participant_max || 0);
    if (max > 0 && count >= max) return 'vol!';
    if (!participant_max) return `${count}`;
    return `${count}/${max}`;
  })();

  return (
    <li className={`activity ${active ? ' active' : ''}`} ref={activityRef}>
      <h1>{name}</h1>
      <div className="details">
        <div>
          {startDate}
          {endDate ? ` - ${endDate}` : ''}
        </div>
        <div className="participants">
          {participantLabel}
          <span className="material-symbols-outlined">
            {isEnrollable && participant_counter ? 'group' : ''}
          </span>
        </div>
      </div>
    </li>
  );
}
