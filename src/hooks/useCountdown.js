import { useState, useEffect } from 'react';

export function useCountdown(date) {
  const [t, setT] = useState({});
  useEffect(() => {
    const tick = () => {
      const diff = new Date(date) - Date.now();
      if (diff <= 0) {
        setT({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setT({
        days: Math.floor(diff / 864e5),
        hours: Math.floor((diff % 864e5) / 36e5),
        mins: Math.floor((diff % 36e5) / 6e4),
        secs: Math.floor((diff % 6e4) / 1e3),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [date]);
  return t;
}
