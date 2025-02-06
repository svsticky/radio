import { useWeatherQuery } from '../store/api';

const iconMap = new Map([
  ['mist', 'mist'],
  ['buien', 'rainy'],
  ['regen', 'rainy'],
  ['sneeuw', 'rainy'],
  ['bewolkt', 'rainy'],
  ['onbewolkt', 'sunny'],
  ['nachtmist', 'bedtime'],
  ['hagel', 'weather_hail'],
  ['wolkennacht', 'bedtime'],
  ['bliksem', 'thunderstorm'],
  ['helderenacht', 'bedtime'],
  ['nachtbewolkt', 'bedtime'],
  ['halfbewolkt_regen', 'rainy'],
  ['zwaarbewolkt', 'filter_drama'],
  ['halfbewolkt', 'partly_cloudy_day'],
  ['lichtbewolkt', 'partly_cloudy_day'],
]);

function getIconName(image: string) {
  return iconMap.get(image) || 'block';
}

export default function Weather() {
  const { data: weather, isSuccess } = useWeatherQuery(undefined, {
    pollingInterval: 600000, // 10 * 60 * 1000, 10 minutes
  });

  if (!isSuccess) return <></>;

  return (
    <div className="weather">
      <span className="material-symbols-outlined weather-icon">
        {getIconName(weather.liveweer[0].image)}
      </span>
      <span className="weather-text">{weather.liveweer[0].temp + ' °C'}</span>
    </div>
  );
}
