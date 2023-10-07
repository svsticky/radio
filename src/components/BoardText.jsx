import React from "react";
import GetContent from "../helpers/contentful";

let text = [];
let index = -1;

GetContent("board-message", (entries) => {
  text = entries !== null ? entries.map((entry) => entry.fields.message) : [];
});

// Get the next message from the array or start over if you have
// reached the end.
function getCurrentText() {
  if (index < text.length - 1) index++;
  else index = 0;

  return text[index];
}

export default function BoardText() {
  return (
    <section className="boardTextSection">
      <h1 id="boardText">{getCurrentText()}</h1>
    </section>
  );
}
