import { useCallback, useEffect, useRef, useState } from "react";

export default function useCounter(seconds: number = 60) {
  const [count, setCount] = useState(seconds);
  const intervalRef = useRef(0);

  const startCounter = useCallback(() => {
    (intervalRef as any).current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
  }, [intervalRef]);

  function clearCounter() {
    clearInterval(intervalRef.current);
    setCount(seconds);
  }

  useEffect(() => {
    if (!count) clearCounter();
  }, [count]);

  return { startCounter, count, clearCounter };
}
