import PropTypes from 'prop-types';
import Poster from './Poster';
import { useAdsQuery } from '../store/api';

export default function Ad({ current }) {
  const { data: ads, isSuccess } = useAdsQuery();

  if (!isSuccess)
    return <></>;

  const currentAd = ads[current];

  if (ads.length <= 0)
    return (
      <div>
        <ul className="advertisement"></ul>
        <Poster poster={'https://public.svsticky.nl/.hidden/Backup-Ad.png'} />
      </div>
    );

  if (currentAd.fullscreen)
    return (
      <div className="full-advertisement">
        <Poster poster={`https:${currentAd.poster.fields.file.url}`}></Poster>
      </div>
    );

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

// Explain expected types, for early error detection
Ad.propTypes = {
  current: PropTypes.number.isRequired
};
