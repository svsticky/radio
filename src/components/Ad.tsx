import Poster from './Poster';
import { type Ad, useAdsQuery } from '../store/api';
import { StateMachineSlideProps, useTimer } from '../StateMachine';
import { nextState, useAppDispatch } from '../store';
import { useCallback } from 'react';

export default function Ad({ current }: StateMachineSlideProps) {
  const { data: ads, isSuccess } = useAdsQuery();

  if (!isSuccess) return <></>;

  //  TODO: Maybe this case isnt necessary anymore
  if (ads.length <= 0)
    return (
      <div>
        <ul className="advertisement"></ul>
        <Poster src={'https://public.svsticky.nl/.hidden/Backup-Ad.png'} />
      </div>
    );

  const currentAd = ads[current];

  if (!currentAd.poster?.fields.file?.url) throw new Error('Ad without poster');

  const contentType = currentAd.poster?.fields.file.contentType;
  if (contentType.startsWith('video')) {
    return <VideoAd currentAd={currentAd} />;
  } else {
    return <ImageAd currentAd={currentAd} />;
  }
}

function VideoAd({ currentAd }: { currentAd: Ad['fields'] }) {
  const dispatch = useAppDispatch();

  const onEnded = useCallback(() => dispatch(nextState), [dispatch]);

  if (!currentAd.poster?.fields.file?.url) throw new Error('Ad without poster');

  return (
    <video
      onEnded={onEnded}
      style={{
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      autoPlay
      muted
    >
      <source
        src={currentAd.poster.fields.file.url}
        type={currentAd.poster.fields.file.contentType}
      />
    </video>
  );
}

function ImageAd({ currentAd }: { currentAd: Ad['fields'] }) {
  useTimer(
    currentAd.duration
      ? { duration: currentAd.duration, dependencies: [currentAd] }
      : { dependencies: [currentAd] },
  );

  if (!currentAd.poster?.fields.file?.url) throw new Error('Ad without poster');

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
