import { useTimer } from '../StateMachine';

export default function SnowHeight() {
  useTimer();
  return (
    <>
      <img src="/snow_mountain.jpeg" id="snowHeightBg" />
      <img
        src={import.meta.env.VITE_SNOW_HEIGHT_URL}
        id="snowHeight"
        alt="Snow height meter"
      />
    </>
  );
}
