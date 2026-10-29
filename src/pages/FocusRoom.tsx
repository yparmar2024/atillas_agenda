import { useState } from 'react';
import { Sparkles, Sun, Moon, Pause, Play, RotateCcw } from 'lucide-react';
import { Mascot } from '../components/Mascot';
import { appConfig, sessionReward } from '../config';
import type { TimerState } from '../hooks/useTimer';
import '../styles/focus.css';
type Props = {
  timer: TimerState;
  night: boolean;
  onToggleNight: () => void;
  celebrate: boolean;
};
export function FocusRoom({ timer, night, onToggleNight, celebrate }: Props) {
  const [custom, setCustom] = useState(false);
  const [minutes, setMinutes] = useState('');
  const { duration, seconds, running, sessions, toggle, reset, addDuration } =
    timer;
  return (
    <div className="page focus-page">
      <div className="page-heading">
        <h1>Focus room</h1>
        <p>Choose a session and give one task your attention.</p>
      </div>
      <section className={`focus-scene ${night ? 'night' : ''}`}>
        <div className="scene-sun" />
        <div className="cloud cloud-one" />
        <div className="cloud cloud-two" />
        <div className="hill hill-back" />
        <div className="hill hill-front" />
        <div className="scene-controls">
          <span>Meadow</span>
          <button
            aria-label={night ? 'Switch to daytime' : 'Switch to evening'}
            onClick={onToggleNight}
          >
            {night ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        <div className="timer-card">
          <span className="eyebrow">
            {running ? 'Session in progress' : 'Ready when you are'}
          </span>
          <div className="presets">
            {appConfig.timerPresets.map((n) => (
              <button key={n} onClick={() => addDuration(n)}>
                {`${n} min`}
              </button>
            ))}
            <button
              onClick={() => setCustom((open) => !open)}
              className={custom ? 'selected' : ''}
              aria-expanded={custom}
            >
              Custom
            </button>
          </div>
          {custom && (
            <form
              className="custom-timer"
              onSubmit={(event) => {
                event.preventDefault();
                if (
                  !/^[0-9]+$/.test(minutes) ||
                  Number(minutes) < 1 ||
                  Number(minutes) > 180
                )
                  return;
                addDuration(Number(minutes));
                setMinutes('');
                setCustom(false);
              }}
            >
              <label>
                <span className="sr-only">Custom minutes (1–180)</span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]+"
                  maxLength={3}
                  placeholder="1–180"
                  autoFocus
                  required
                  aria-describedby="custom-time-hint"
                  value={minutes}
                  onChange={(event) => setMinutes(event.target.value)}
                />
                <span>min</span>
              </label>
              <button
                type="submit"
                disabled={
                  !/^[0-9]+$/.test(minutes) ||
                  Number(minutes) < 1 ||
                  Number(minutes) > 180
                }
              >
                Add time
              </button>
              <small id="custom-time-hint">
                Add 1–180 minutes to your session.
              </small>
            </form>
          )}
          <div
            className="time"
            role="timer"
            aria-label={`${Math.floor(seconds / 60)} minutes ${seconds % 60} seconds`}
          >
            {String(Math.floor(seconds / 60)).padStart(2, '0')}
            <span>:</span>
            {String(seconds % 60).padStart(2, '0')}
          </div>
          <p>
            {running
              ? 'You focus. Attila will keep you company.'
              : 'Add minutes to build your session.'}
          </p>
          <div className="timer-actions">
            <button
              className="primary"
              onClick={toggle}
              disabled={seconds === 0}
            >
              {running ? <Pause size={17} /> : <Play size={17} />}{' '}
              {running ? 'Pause session' : 'Start session'}
            </button>
            <button className="reset" aria-label="Reset timer" onClick={reset}>
              <RotateCcw size={19} />
            </button>
          </div>
        </div>
        <div className={`scene-duck ${running && !celebrate ? 'roaming' : ''}`}>
          <Mascot
            state={celebrate ? 'celebrating' : running ? 'walking' : 'idle'}
          />
        </div>
        <div className="grass grass-one">✳</div>
        <div className="grass grass-two">✳</div>
      </section>
      <div className="focus-bottom">
        <span>
          <Sparkles size={17} />{' '}
          {duration
            ? `Finish this session to earn ${sessionReward(duration * 60)} points.`
            : 'Earn 1 point per completed minute.'}
        </span>
        <span>{sessions} sessions completed this visit</span>
      </div>
    </div>
  );
}
