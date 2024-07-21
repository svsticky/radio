import { useQuotesQuery } from '../store/api';

type QuotesProps = {
  current: number
};

export default function Quotes({ current }: QuotesProps) {
  const { data: quotes, isSuccess } = useQuotesQuery();

  if (!isSuccess)
    return <></>;

  const quote = quotes[current];

  return (
    <article className='quoteSection'>
      <section className='quoteBackground'>
        <h1 id='quoteText'>&quot;{quote.text}&quot;</h1>
        <h2 id='quotePerson'>-{quote.person}</h2>
      </section>
    </article>
  );
}
