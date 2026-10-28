import { useState, useEffect, useRef } from 'react';

export function useTimer(onComplete: (seconds: number) => void) {
  const [duration, setDuration] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [end, setEnd] = useState<number | null>(null);
  const [sessions, setSessions] = useState(0);
  const completed = useRef(false);
  useEffect(() => {
    if (!running || end === null) return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setSeconds(left);
      if (left === 0 && !completed.current) {
        completed.current = true;
        setRunning(false);
        setEnd(null);
        setSessions((s) => s + 1);
        onComplete(duration * 60);
        setDuration(0);
      }
    };
    tick();
    const timer = setInterval(tick, 250);
    return () => clearInterval(timer);
  }, [running, end, duration, onComplete]);
  const toggle = () => {
    if (running) {
      setSeconds(
        Math.max(0, Math.ceil(((end ?? Date.now()) - Date.now()) / 1000)),
      );
      setRunning(false);
      setEnd(null);
    } else if (seconds > 0) {
      setEnd(Date.now() + seconds * 1000);
      setRunning(true);
    }
  };
  const reset = () => {
    setRunning(false);
    setEnd(null);
    setDuration(0);
    setSeconds(0);
  };
  const addDuration = (minutes: number) => {
    if (!Number.isInteger(minutes) || minutes < 1 || minutes > 180) return;
    completed.current = false;
    setDuration((current) => current + minutes);
    setSeconds((current) => current + minutes * 60);
    if (running) setEnd((current) => (current ?? Date.now()) + minutes * 60000);
  };
  return { duration, seconds, running, sessions, toggle, reset, addDuration };
}
export type TimerState = ReturnType<typeof useTimer>;
