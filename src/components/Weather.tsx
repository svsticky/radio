import React, { useEffect, useState } from 'react';

const WEATHER_API_KEY = import.meta.env.WEATHER_API_KEY;
console.log(WEATHER_API_KEY);

function fetchWeather(
  signal: AbortSignal,
  setWeather: React.Dispatch<unknown>,
) {
  fetch(
    `https://weerlive.nl/api/weerlive_api_v2.php?key=demo&locatie=Amsterdam`, // TODO Add lat,lon coords of sticky
    { signal },
  ).then((response) =>
    response.json().then((data) => {
      setWeather(data);
    }),
  );
}

export default function Weather() {
  const [weather, setWeather] = useState(
    JSON.parse('{"liveweer": [{"temp": 0, "image": "bewolkt"}]}'),
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
      controller.abort();
    };
  }, []);

  function getImageSource() {
    switch (weather.liveweer[0].image) {
      case 'onbewolkt':
        return 'https://raw.githubusercontent.com/jackd248/weather-iconic/refs/heads/master/sources/SVG/sun.svg';
      case 'bliksem':
        return 'https://raw.githubusercontent.com/jackd248/weather-iconic/refs/heads/master/sources/SVG/lightning.svg';
      case 'regen':
        return 'https://raw.githubusercontent.com/jackd248/weather-iconic/refs/heads/master/sources/SVG/cloud-rain-single.svg';
      case 'buien':
        return 'https://raw.githubusercontent.com/jackd248/weather-iconic/refs/heads/master/sources/SVG/cloud-rain.svg';
      case 'hagel':
        return 'https://raw.githubusercontent.com/jackd248/weather-iconic/refs/heads/master/sources/SVG/hail.svg';
      case 'mist':
        return 'https://raw.githubusercontent.com/jackd248/weather-iconic/refs/heads/master/sources/SVG/fog.svg';
      case 'sneeuw':
        return 'https://raw.githubusercontent.com/jackd248/weather-iconic/refs/heads/master/sources/SVG/cloud-snow.svg';
      case 'bewolkt':
        return 'https://raw.githubusercontent.com/jackd248/weather-iconic/refs/heads/master/sources/SVG/cloud.svg';
      case 'lichtbewolkt':
        return 'https://raw.githubusercontent.com/jackd248/weather-iconic/refs/heads/master/sources/SVG/sun-cloud.svg';
      case 'halfbewolkt':
        return 'https://raw.githubusercontent.com/jackd248/weather-iconic/refs/heads/master/sources/SVG/sun-cloud.svg';
      case 'halfbewolkt_regen':
        return 'https://raw.githubusercontent.com/jackd248/weather-iconic/refs/heads/master/sources/SVG/sun-cloud-rain.svg';
      case 'zwaarbewolkt':
        return 'https://raw.githubusercontent.com/jackd248/weather-iconic/refs/heads/master/sources/SVG/clouds.svg';
      case 'nachtmist':
        return 'https://raw.githubusercontent.com/jackd248/weather-iconic/refs/heads/master/sources/SVG/moon-fog.svg';
      case 'helderenacht':
        return 'https://raw.githubusercontent.com/jackd248/weather-iconic/refs/heads/master/sources/SVG/moon.svg';
      case 'nachtbewolkt':
        return 'https://raw.githubusercontent.com/jackd248/weather-iconic/refs/heads/master/sources/SVG/moon-cloud.svg';
      default:
        return '';
    }
  }

  return (
    <div className="weather-wrapper">
      <img
        src={getImageSource()}
        height={'47px'}
        alt={'Weather Icon'}
        className="weather-icon"
      ></img>
      <span className="weather-text">{weather.liveweer[0].temp + '°C'}</span>
    </div>
  );
}
