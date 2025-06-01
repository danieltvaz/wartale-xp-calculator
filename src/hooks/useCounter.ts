import { useCallback, useEffect, useRef, useState } from "react";

import sound from "../assets/audio/alert.wav";

const alertSound = new Audio(sound);

export default function useCounter(seconds: number = 60) {
  const [count, setCount] = useState(seconds);
  const intervalRef = useRef(0);

  const startCounter = useCallback(() => {
    (intervalRef as any).current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
  }, [intervalRef]);

  const clearCounter = useCallback(() => {
    clearInterval(intervalRef.current);
    setCount(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!count) clearCounter();
  }, [count, clearCounter]);

  useEffect(() => {
    if (!count) {
      alertSound.play();
    }
  }, [count]);

  return { startCounter, count, clearCounter };
}
