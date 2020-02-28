import React, { Fragment } from 'react';
const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

let text = [];

// Get all entries from Contentful and put them into the text array
client
  .getEntries({
    'content_type': 'board-message'
  })
  .then(result => {
    text = result.items.map(entry => entry.fields.message);
  })
  .catch(err => console.log(err));

let index = -1;

// Get the next message from the array or start over if you have
// reached the end.
function getCurrentText() {
  if (index < (text.length - 1))
    index++;
  else
    index = 0;

  return text[index];
}

export default function BoardText() {
  return (
    <section className="boardTextSection">
      <h1 id="boardText">
        {getCurrentText()}
      </h1>
    </section>
  );
}
