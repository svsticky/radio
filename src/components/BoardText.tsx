import { StateMachineSlideProps, useTimer } from '../StateMachine';
import { useBoardMessagesQuery } from '../store/api';
import TopBar from './Topbar';

export default function BoardText({ current }: StateMachineSlideProps) {
  useTimer();
  const { data: boardMessages, isSuccess } = useBoardMessagesQuery();

  if (!isSuccess) return <></>;

  const { message } = boardMessages[current];

  return (
    <>
      <TopBar />
      <section className="boardTextSection">
        <h1 id="boardText">{message}</h1>
      </section>
    </>
  );
}
