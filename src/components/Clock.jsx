// this file renders a clock to the UI (such as 12.53)
// inspired by https://medium.com/programming-essentials/how-to-create-a-digital-clock-with-react-hooks-aa30f76cfe3f

import { useEffect, useState } from "react";

export default function Clock() {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    // refresh clock every second
    const timerId = setInterval(refreshClock, 1000);

    // at cleanup, clear interval
    return () => clearInterval(timerId);
  }, []);

  const formattedDate = date.toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="clock-wrapper">
      <span className="clock">{formattedDate}</span>
    </div>
  );
}
