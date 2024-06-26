import GetContent from '../helpers/contentful';

GetContent('quotes', (entries) => {
  const quotes = entries !== null ? entries.map((entry) => entry.fields) : [];
  window.localStorage.setItem('AllQuotes', JSON.stringify(quotes));
});

// Get a random quote
function getRandomQuote(quotes) {
  let quote = {
    text: '',
    person: '',
  };

  let i = Math.floor(Math.random() * quotes.length);
  if (quotes.length > 0) {
    quote = {
      text: quotes[i].text,
      person: quotes[i].person,
    };

    // Delete quote after using it.
    quotes = quotes.filter((quote) => quote !== quotes[i]);
    window.localStorage.setItem('quotes', JSON.stringify(quotes));
  }

  return quote;
}

export default function Quotes() {
  let quotes = JSON.parse(localStorage.getItem('quotes') || '[]');

  // If there are no quotes, retrieve them
  if (!quotes ||
    // quotes === null ||
    // quotes === undefined ||
    // quotes === "" ||
    // quotes === false ||
    (Array.isArray(quotes) && quotes.length === 0)
  ) {
    quotes = JSON.parse(window.localStorage.getItem('AllQuotes'));
    window.localStorage.setItem('quotes', JSON.stringify(quotes));
  }

  let quote = getRandomQuote(quotes);

  return (
    <article className="quoteSection">
      <section className="quoteBackground">
        <h1 id="quoteText">&quot;{quote.text}&quot;</h1>
        <h2 id="quotePerson">-{quote.person}</h2>
      </section>
    </article>
  );
}
