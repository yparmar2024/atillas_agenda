import { useState, useEffect } from 'react';
import { appConfig } from '../config';
export function useTimer(onComplete: () => void) {
  const [duration, setDuration] = useState(appConfig.timerPresets[0]);
  const [seconds, setSeconds] = useState(appConfig.timerPresets[0] * 60);
  const [running, setRunning] = useState(false);
  const [end, setEnd] = useState<number | null>(null);
  const [sessions, setSessions] = useState(0);
  useEffect(() => {
    if (!running || end === null) return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setSeconds(left);
      if (left === 0) {
        setRunning(false);
        setEnd(null);
        setSessions((s) => s + 1);
        onComplete();
      }
    };
    tick();
    const timer = setInterval(tick, 250);
    return () => clearInterval(timer);
  }, [running, end, onComplete]);
  const toggle = () => {
    if (running) {
      setSeconds(
        Math.max(0, Math.ceil(((end ?? Date.now()) - Date.now()) / 1000)),
      );
      setRunning(false);
      setEnd(null);
    } else {
      const s = seconds || duration * 60;
      setSeconds(s);
      setEnd(Date.now() + s * 1000);
      setRunning(true);
    }
  };
  const reset = () => {
    setRunning(false);
    setEnd(null);
    setSeconds(duration * 60);
  };

  const selectDuration = (minutes: number) => {
    setDuration(minutes);
    setSeconds(minutes * 60);
    setRunning(false);
    setEnd(null);
  };
  return {
    duration,
    seconds,
    running,
    sessions,
    toggle,
    reset,
    selectDuration,
  };
}
export type TimerState = ReturnType<typeof useTimer>;
