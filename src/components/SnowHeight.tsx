import { useTimer } from '../StateMachine';

export default function SnowHeight() {
  useTimer();
  return (
    <>
      <img src="/snow_mountain.jpeg" className="snowHeightBg" />
      <iframe
        src={import.meta.env.VITE_SNOW_HEIGHT_URL}
        id="snowHeight"
        className="snowHeight"
      />
    </>
  );
}
