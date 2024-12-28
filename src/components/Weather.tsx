import React, { useEffect, useState } from 'react';

const WEATHER_API_KEY = import.meta.env.WEATHER_API_KEY;
console.log(WEATHER_API_KEY);

function fetchWeather(
  signal: AbortSignal,
  setWeather: React.Dispatch<unknown>,
) {
  fetch(
    `https://weerlive.nl/api/weerlive_api_v2.php?key=demo&locatie=Amsterdam`,
    { signal },
  ).then((response) =>
    response.json().then((data) => {
      setWeather(data);
    }),
  );
}

export default function Weather() {
  const [weather, setWeather] = useState(
    JSON.parse('{"liveweer": [{"temp": 0, "image": "bewolt"}]}'),
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchWeather(signal, setWeather);

    const timerId = setInterval(
      () => {
        fetchWeather(signal, setWeather);
        if (weather == undefined) {
          return <div className="weather-wrapper"></div>;
        }
      },
      // Make the call every 10 minutes
      10 * 60 * 1000,
    );

    return () => {
      clearInterval(timerId);
      //controller.abort();
    };
  }, []);

  function getImageSource(img: string) {
    switch (img) {
      case 'onbewolkt':
        return 'sunny';
      case 'bliksem':
        return 'thunderstorm';
      case 'regen':
        return 'rainy';
      case 'buien':
        return 'rainy';
      case 'hagel':
        return 'weather_hail';
      case 'mist':
        return 'mist';
      case 'sneeuw':
        return 'rainy';
      case 'bewolkt':
        return 'rainy';
      case 'lichtbewolkt':
        return 'partly_cloudy_day';
      case 'halfbewolkt':
        return 'partly_cloudy_day';
      case 'halfbewolkt_regen':
        return 'rainy';
      case 'zwaarbewolkt':
        return 'filter_drama';
      case 'nachtmist':
        return 'bedtime';
      case 'helderenacht':
        return 'bedtime';
      case 'nachtbewolkt':
        return 'bedtime';
      case 'wolkennacht':
        return 'bedtime';
      default:
        return 'AAAAAAA';
    }
  }

  return (
    <div className="weather-wrapper">
      <span className="material-symbols-outlined weather-icon">
        {getImageSource(weather.liveweer[0].image)}
      </span>
      <span className="weather-text">{weather.liveweer[0].temp + ' °C'}</span>
    </div>
  );
}
