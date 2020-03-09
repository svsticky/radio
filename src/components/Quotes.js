import React from 'react';
import GetContent from './Contentful';

let content = [];

GetContent('quotes', entries => {
  content = entries !== null ? entries.map(entry => entry.fields) : [];
});

// Get a random quote
function getRandomQuote() {
  let quote = {
    text: "",
    person: "" 
  }
  let i = Math.floor(Math.random() * content.length);
  if (content.length > 0) {
    quote = {
      text: content[i].text,
      person: content[i].person
    }
  }

  return quote;
}

export default function Quotes() {
  let quote = getRandomQuote();
  return (
    <article className="quoteSection">
      <section className="quoteBackground">
        <h1 id="quoteText">
          "{quote.text}"
        </h1>
        <h2 id="quotePerson">
          -{quote.person}
        </h2>
      </section>
    </article>
  );
}
