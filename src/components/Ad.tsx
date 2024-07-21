import Poster from './Poster';
import { useAdsQuery } from '../store/api';

type AdProps = {
  current: number;
};

export default function Ad({ current }: AdProps) {
  const { data: ads, isSuccess } = useAdsQuery();

  if (!isSuccess)
    return <></>;

  const currentAd = ads[current];

  if (!currentAd.poster?.fields.file?.url)
    throw new Error('Ad without poster');

  if (ads.length <= 0) {
    return (
      <div>
        <ul className="advertisement"></ul>
        <Poster src={'https://public.svsticky.nl/.hidden/Backup-Ad.png'} />
      </div>
    );
  } else if (currentAd.fullscreen) {
    return (
      <div className="full-advertisement">
        <Poster src={`https:${currentAd.poster.fields.file.url}`}></Poster>
      </div>
    );
  } else {
    return (
      <div>
        <ul className="advertisement">
          <h1>{currentAd.title}</h1>
          <p>{currentAd.description}</p>
        </ul>
        <Poster src={`https:${currentAd.poster.fields.file.url}`}></Poster>
      </div>
    );
  }
}
