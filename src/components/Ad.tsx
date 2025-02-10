import { type Ad, useAdsQuery } from '../store/api';
import { StateMachineSlideProps, useTimer } from '../StateMachine';
import { nextState, useAppDispatch } from '../store';
import { useCallback, useEffect, useRef } from 'react';
import ContentWithPoster from './ContentWithPoster';

export default function Ad({ current }: StateMachineSlideProps) {
  const { data: ads, isSuccess } = useAdsQuery();

  if (!isSuccess) return <></>;

  //  TODO: Maybe this case isnt necessary anymore
  if (ads.length <= 0)
    return (
      <div className="list-with-poster">
        <div className="list-wrapper" />
        <img
          src={'https://public.svsticky.nl/.hidden/Backup-Ad.png'}
          className="poster"
        />
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

  // If the video ad swaps out for another video ad, then reset the player.
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    videoRef?.current?.load();
  }, [currentAd, videoRef]);

  return (
    <video className="video-ad" onEnded={onEnded} autoPlay muted ref={videoRef}>
      <source
        src={currentAd.poster.fields.file.url}
        type={currentAd.poster.fields.file.contentType}
      />
    </video>
  );
}

function ImageAd({ currentAd }: { currentAd: Ad['fields'] }) {
  const dependencies = [currentAd];
  useTimer(
    currentAd.duration
      ? { duration: currentAd.duration * 1000, dependencies }
      : { dependencies },
  );

  if (!currentAd.poster?.fields.file?.url) throw new Error('Ad without poster');

  if (currentAd.fullscreen)
    return (
      <img
        src={`https:${currentAd.poster.fields.file.url}`}
        className="fullscreen-ad"
      />
    );

  return (
    <ContentWithPoster posterSrc={`https:${currentAd.poster.fields.file.url}`}>
      <ul className="advertisement">
        <h1>{currentAd.title}</h1>
        <p>{currentAd.description}</p>
      </ul>
    </ContentWithPoster>
  );
}
