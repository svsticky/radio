import { useEffect /*useState*/ } from 'react';

function fetchWeather(signal) {
  fetch(
    'https://weerlive.nl/api/weerlive_api_v2.php?key=demo&locatie=Amsterdam',
    { signal },
  )
    .then((response) => response.json())
    .then((data) => setWeather(data));
}

export default function Weather() {
  // const [weather, setWeather] = useState(""); // TODO fetch https://weerlive.nl/api/weerlive_api_v2.php?key=demo&locatie=Amsterdam

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchWeather(signal);

    // refresh weather every 5 minutes
    const timerId = setInterval(
      () => {
        fetchWeather(signal);
      },
      5 * 60 * 1000,
    );

    // at cleanup, clear interval
    return () => {
      clearInterval(timerId);
      //      controller.abort();
    };
  }, []);

  const formattedWeather = weather;

  return (
    <div className="weather-wrapper">
      <img
        src={
          '/home/horseman/Pictures/Screenshots/Screenshot_20241028_115011.png'
        }
        alt={'icon'}
      ></img>
      <span className="weather">{formattedWeather}</span>
    </div>
  );
}
