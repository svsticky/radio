import { StateMachineSlideProps, useTimer } from '../StateMachine';
import { useBoardMessagesQuery } from '../store/api';
import TopBar from './Topbar';

export default function BoardText({ current }: StateMachineSlideProps) {
  useTimer();
  const { data: boardMessages, isSuccess } = useBoardMessagesQuery();

  if (!isSuccess) return <></>;

  const { message } = boardMessages[current];

  return (
    <div className="basic-page">
      <div className="content-wrapper">
        <TopBar />
        <div className="boardtext">
          <div id="text">{message}</div>
        </div>
      </div>
    </div>
  );
}
