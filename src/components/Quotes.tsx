import { StateMachineSlideProps, useTimer } from '../StateMachine';
import { useQuotesQuery } from '../store/api';
import TopBar from './Topbar';

export default function Quotes({ current }: StateMachineSlideProps) {
  useTimer();
  const { data: quotes, isSuccess } = useQuotesQuery();

  if (!isSuccess) return <></>;

  const quote = quotes[current];

  return (
    <div className="basic-page">
      <div className="content-wrapper">
        <TopBar />
        <div className="quote">
          <div id="text">&quot;{quote.text}&quot;</div>
          <div id="person">-{quote.person}</div>
        </div>
      </div>
    </div>
  );
}
