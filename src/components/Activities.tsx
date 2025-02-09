import Activity from './Activity';
import { useActivitiesQuery } from '../store/api';
import { StateMachineSlideProps, useTimer } from '../StateMachine';
import TopBar from './Topbar';
import ContentWithPoster from './ContentWithPoster';

export default function Activities({ current }: StateMachineSlideProps) {
  useTimer({ interval: true });

  const { data: activities, isSuccess } = useActivitiesQuery(undefined, {
    pollingInterval: Number(import.meta.env.VITE_LOAD_INTERVAL),
  });

  if (!isSuccess) return <></>;

  if (activities.length === 0)
    return (
      <section className="boardTextSection">
        <h1>There are no activities, wanbeleid!</h1>
      </section>
    );

  const currentActivity = activities[current];
  return (
    <ContentWithPoster posterSrc={currentActivity.poster}>
      <TopBar />
      <ul className="scrollable-list">
        {activities.map((activity) => (
          <Activity
            key={activity.id}
            {...activity}
            active={activity === currentActivity}
          />
        ))}
      </ul>
    </ContentWithPoster>
  );
}
