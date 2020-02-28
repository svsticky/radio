import React, { Fragment } from 'react';

let index = -1;
const text = [
  "Verneuken is ook neuken",
  "Doodgaan is ook gaan",
  "Escaleren is ook leren"
]

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
