"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Counts down to a rolling target time-of-day (default: next midnight),
 * so the Flash Deals countdown always shows a believable "ends tonight"
 * timer without needing a hard-coded date that would eventually expire.
 */
export function useCountdown(hoursFromNow = 8): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date();
    target.setHours(target.getHours() + hoursFromNow, 0, 0, 0);

    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [hoursFromNow]);

  return timeLeft;
}
