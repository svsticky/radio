import { useWeatherQuery } from '../store/api';

const iconMap = new Map([
  ['mist', 'foggy'],
  ['buien', 'rainy'],
  ['regen', 'rainy'],
  ['sneeuw', 'weather_snowy'],
  ['bewolkt', 'cloud'],
  ['onbewolkt', 'sunny'],
  ['nachtmist', 'foggy'],
  ['hagel', 'weather_hail'],
  ['wolkennacht', 'partly_cloudy_night'],
  ['bliksem', 'thunderstorm'],
  ['helderenacht', 'bedtime'],
  ['nachtbewolkt', 'partly_cloudy_night'],
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

  if (!isSuccess || weather.liveweer[0].temp === undefined)
    return (
      <div className="weather">
        <span className="icon fetch-fail material-symbols-outlined">
          cloud_alert
        </span>
      </div>
    );

  return (
    <div className="weather">
      <span className="icon material-symbols-outlined">
        {getIconName(weather.liveweer[0].image)}
      </span>
      <span className="temperature">{weather.liveweer[0].temp + ' °C'}</span>
    </div>
  );
}
