import Poster from './Poster';
import { useAdsQuery } from '../store/api';
import { StateMachineSlideProps } from '../App';

export default function Ad({ current }: StateMachineSlideProps) {
  const { data: ads, isSuccess } = useAdsQuery();

  if (!isSuccess)
    return <></>;

  //  TODO: Maybe this case isnt necessary anymore
  if (ads.length <= 0)
    return (
      <div>
        <ul className="advertisement"></ul>
        <Poster src={'https://public.svsticky.nl/.hidden/Backup-Ad.png'} />
      </div>
    );

  const currentAd = ads[current];

  if (!currentAd.poster?.fields.file?.url)
    throw new Error('Ad without poster');

  if (currentAd.fullscreen)
    return (
      <div className="full-advertisement">
        <Poster src={`https:${currentAd.poster.fields.file.url}`}></Poster>
      </div>
    );

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
