import React from 'react';
import Poster from './Poster';
import GetContent from './Contentful';

let ads = [];
let index = 0;
let currentAd = {}

GetContent('ads', entries => {
  ads = entries !== null ? entries.map(entry => entry.fields) : []
});

function AdCycle() {
  if (index >= (ads.length - 1)) {
    index = 0;
    return false;
  } else {
    index++;
    currentAd = ads[index];
    return true;
  }
}

function Ad() {
  let element = <div></div>
  if (currentAd.title) {
    element = <div>
      <ul className='activities'>
        <h1>{currentAd.title}</h1>
        <p>
          {currentAd.description}
        </p>
      </ul>
      <Poster poster={`https:${currentAd.poster.fields.file.url}`}></Poster>
    </div>
  }
  return element;
}

export { AdCycle, Ad };