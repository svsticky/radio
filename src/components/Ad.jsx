import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Poster from './Poster';
import GetContent from '../helpers/contentful';

export default function Ad({ current, onChange }) {
  const ads = useAds();

  if (ads.length > 0 && current >= ads.length - 1)
    onChange(true);

  const currentAd = ads[current];
  if (ads.length <= 0) {
    return (
      <div>
        <ul className="advertisement"></ul>
        <Poster poster={'https://public.svsticky.nl/.hidden/Backup-Ad.png'} />
      </div>
    );
  } else if (currentAd.fullscreen) {
    return (
      <div className="full-advertisement">
        <Poster poster={`https:${currentAd.poster.fields.file.url}`}></Poster>
      </div>
    );
  } else {
    return (
      <div>
        <ul className="advertisement">
          <h1>{currentAd.title}</h1>
          <p>{currentAd.description}</p>
        </ul>
        <Poster poster={`https:${currentAd.poster.fields.file.url}`}></Poster>
      </div>
    );
  }
}

function useAds() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    GetContent('ads', entries => setAds((entries ?? []).map(entry => entry.fields)));
  }, []);

  return ads;
}

// Explain expected types, for early error detection
Ad.propTypes = {
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
