import React, { useEffect, useState } from 'react';

const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function fetchWeather(
  signal: AbortSignal,
  setWeather: React.Dispatch<unknown>,
) {
  fetch(
    `https://weerlive.nl/api/weerlive_api_v2.php?key=${VITE_WEATHER_API_KEY}&locatie=52.08718206955104,5.165697854286648`,
    { signal },
  )
    .then((response) =>
      response.json().then((data) => {
        setWeather(data);
      }),
    )
    .catch((error) => {
      if (error.name === 'AbortError') {
        setWeather(
          JSON.parse('{"liveweer": [{ "temp": 0, "image": "bewolt"}]}'),
        );
      }
    });
}

export default function Weather() {
  const [weather, setWeather] = useState(
    JSON.parse('{"liveweer": [{ "temp": 0, "image": "bewolt"}]}'),
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchWeather(controller.signal, setWeather);

    const timerId = setInterval(
      () => {
        fetchWeather(controller.signal, setWeather);
        if (weather == undefined) {
          return <div className="weather-wrapper"></div>;
        }
      },
      // Make the call every 10 minutes
      10 * 60 * 1000,
    );

    return () => {
      clearInterval(timerId);
      controller.abort();
    };
  }, []);

  function getImageSource(img: string) {
    switch (img) {
      case 'mist':
        return 'mist';
      case 'buien':
        return 'rainy';
      case 'regen':
        return 'rainy';
      case 'hagel':
        return 'weather_hail';
      case 'sneeuw':
        return 'rainy';
      case 'bewolkt':
        return 'rainy';
      case 'bliksem':
        return 'thunderstorm';
      case 'onbewolkt':
        return 'sunny';
      case 'nachtmist':
        return 'bedtime';
      case 'wolkennacht':
        return 'bedtime';
      case 'halfbewolkt':
        return 'partly_cloudy_day';
      case 'helderenacht':
        return 'bedtime';
      case 'nachtbewolkt':
        return 'bedtime';
      case 'zwaarbewolkt':
        return 'filter_drama';
      case 'lichtbewolkt':
        return 'partly_cloudy_day';
      case 'halfbewolkt_regen':
        return 'rainy';
      default:
        return 'block';
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
