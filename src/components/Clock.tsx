import { useEffect, useState } from 'react';

export default function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // refresh clock every second
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // at cleanup, clear interval
    return () => clearInterval(timerId);
  }, []);

  const formattedDate = date.toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return <span className="clock">{formattedDate}</span>;
}
