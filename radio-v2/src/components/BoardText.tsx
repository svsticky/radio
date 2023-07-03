import GetContent from '@/helpers/contentful';
import React, { useEffect, useState } from 'react';

let index = -1;


export default function BoardText() {
    const [boardTexts, setBoardTexts] = useState([]);

    async function fetchBoardtexts() {
        const texts = await GetContent('board-message');

        setBoardTexts(() => texts.map(entry => entry.fields.message));
            

    }

    useEffect(() => {
        fetchBoardtexts();
    },[]);

    
// Get the next message from the array or start over if you have
// reached the end.
function getCurrentText() {
    if (index < (boardTexts.length - 1))
      index++;
    else
      index = 0;
  
    return boardTexts[index];
  }
  

  return (
    <section className="boardTextSection">
      <h1 id="boardText">
        {getCurrentText()}
      </h1>
    </section>
  );
}
