import Activity from './Activity';
import Poster from './Poster';
import { useActivitiesQuery } from '../store/api';

type ActivitiesProps = {
  current: number;
};

export default function Activities({ current }: ActivitiesProps) {
  const { data: activities, isSuccess } = useActivitiesQuery(undefined, {
    pollingInterval: Number(import.meta.env.VITE_LOAD_INTERVAL),
  });

  if (!isSuccess) return <></>;

  if (activities.length > 0) {
    const currentActivity = activities[current];
    return (
      <div>
        <ul className="activities">
          {activities.map((activity, i) => (
            <Activity
              key={i}
              {...activity}
              active={activity === currentActivity}
            />
          ))}
        </ul>
        <Poster src={currentActivity.poster} />
      </div>
    );
  } else {
    return (
      <section className="boardTextSection">
        <h1>There are no activities, wanbeleid!</h1>
      </section>
    );
  }
}
