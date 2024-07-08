import PropTypes from 'prop-types';
import Poster from './Poster';
import { useGetAdsQuery } from "../store/ads";

export default function Ad({ current, onChange }) {
  const { data: ads, isSuccess } = useGetAdsQuery();

  if (!isSuccess)
    return <></>;

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

// Explain expected types, for early error detection
Ad.propTypes = {
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
