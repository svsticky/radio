import { StateMachineSlideProps, useTimer } from '../StateMachine';
import { useQuotesQuery } from '../store/api';
import TopBar from './Topbar';

export default function Quotes({ current }: StateMachineSlideProps) {
  useTimer();
  const { data: quotes, isSuccess } = useQuotesQuery();

  if (!isSuccess) return <></>;

  const quote = quotes[current];

  return (
    <>
      <TopBar />
      <article className="quoteSection">
        <section className="quoteBackground">
          <h1 id="quoteText">&quot;{quote.text}&quot;</h1>
          <h2 id="quotePerson">-{quote.person}</h2>
        </section>
      </article>
    </>
  );
}
