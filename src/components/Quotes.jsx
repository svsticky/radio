import React from 'react';
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
    quotes = quotes.filter((quote) => quote != quotes[i]);
    window.localStorage.setItem('quotes', JSON.stringify(quotes));
  }

  return quote;
}

export default function Quotes() {
  let quotes = JSON.parse(localStorage.getItem('quotes') || '[]');

  if (
    quotes == null ||
    quotes == undefined ||
    quotes.length == 0 ||
    quotes == []
  ) {
    quotes = JSON.parse(window.localStorage.getItem('AllQuotes'));
    window.localStorage.setItem('quotes', JSON.stringify(quotes));
  }

  let quote = getRandomQuote(quotes);

  return (
    <article className="quoteSection">
      <section className="quoteBackground">
        <h1 id="quoteText">"{quote.text}"</h1>
        <h2 id="quotePerson">-{quote.person}</h2>
      </section>
    </article>
  );
}
