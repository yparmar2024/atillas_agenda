import { useEffect, useRef, useState } from 'react';
import '../styles/mascot.css';
type MascotState = 'idle' | 'walking' | 'studying' | 'celebrating';
export function Mascot({ state = 'idle' }: { state?: MascotState }) {
  const previous = useRef(state);
  const [loweringBook, setLoweringBook] = useState(false);
  useEffect(() => {
    if (previous.current === 'studying' && state === 'celebrating')
      setLoweringBook(true);
    previous.current = state;
    if (state !== 'celebrating') {
      setLoweringBook(false);
      return;
    }
    const timeout = setTimeout(() => setLoweringBook(false), 700);
    return () => clearTimeout(timeout);
  }, [state]);
  return (
    <div
      className={`duck duck-${state} ${loweringBook ? 'duck-book-down' : ''}`}
      role="img"
      aria-label={`Attila the duck, ${state}`}
    >
      <svg
        viewBox="0 0 220 220"
        fill="none"
        stroke="#453b38"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse
          className="duck-shadow"
          cx="109"
          cy="204"
          rx="61"
          ry="8"
          fill="#263c2e"
          opacity=".14"
          stroke="none"
        />
        <g className="duck-body">
          <path
            className="duck-foot duck-foot-left"
            d="M87 175l-15 23 32-1 3-21"
            fill="#ed9c32"
          />
          <path
            className="duck-foot duck-foot-right"
            d="M128 175l1 22 33 1-17-25"
            fill="#ed9c32"
          />
          <path
            d="M65 112l-27-10c-1 17 7 28 20 35-1 27 19 49 51 50 37 1 60-21 58-49-2-25-26-38-55-37z"
            fill="#fffdf5"
          />
          <path d="M72 112q39-20 78 0l8 53q-43 22-91-1z" fill="#a32638" />
          <path d="M91 108q20 17 40-1" stroke="#f4e9e7" />
          <text
            x="113"
            y="140"
            fill="white"
            stroke="none"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            STEVENS
          </text>
          <text
            x="113"
            y="160"
            fill="white"
            stroke="none"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            00
          </text>
          <g className="duck-head">
            <path
              d="M101 108C78 95 76 62 89 42c12-20 42-25 62-13 23 13 26 48 9 68-13 16-39 20-59 11z"
              fill="#fffdf5"
            />
            <path d="M99 31l-7-15 20 8 13-16 6 18" fill="#fffdf5" />
            <g className="duck-eye">
              <ellipse
                cx="143"
                cy="56"
                rx="10"
                ry="13"
                fill="white"
                strokeWidth="2"
              />
              <ellipse
                cx="146"
                cy="59"
                rx="5"
                ry="7"
                fill="#5086aa"
                stroke="none"
              />
              <circle cx="147" cy="60" r="3" fill="#263441" stroke="none" />
              <circle cx="149" cy="57" r="1.5" fill="white" stroke="none" />
            </g>
            <path d="M131 39q9-6 18-1" />
            <path d="M158 72c15-5 35 0 36 9 0 10-24 18-42 8" fill="#efa139" />
            <path d="M157 84q18 6 30-1" strokeWidth="2" />
          </g>
          <path
            className="duck-wing duck-wing-back"
            d="M151 118q25 3 20 24-9 13-23 5"
            fill="#fffdf5"
          />
          <path
            className="duck-wing duck-wing-front"
            d="M78 119c-16-2-22 12-14 25 6 9 18 10 27 4"
            fill="#fffdf5"
          />
        </g>
        {(state === 'studying' || loweringBook) && (
          <g className="duck-book">
            <path d="M74 146l34-7 35 9-2 38-34-9-32 6z" fill="#577365" />
            <path
              d="M79 145l29-6 30 9-1 31-29-8-28 6z"
              fill="#fff6df"
              strokeWidth="2"
            />
            <path d="M108 141v35" strokeWidth="2" />
            <path
              className="duck-page"
              d="M109 143l20 2 7 32-27-6z"
              fill="#f0e5c7"
              strokeWidth="1"
            />
            <path
              d="M85 153l16-3m-16 10 16-3m15-5 14 4m-14 3 14 4"
              strokeWidth="1.5"
              opacity=".5"
            />
          </g>
        )}
        {state === 'celebrating' && (
          <g className="duck-sparkles" fill="#edb94f" stroke="none">
            <path d="M40 47l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" />
            <path d="M181 112l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
            <circle cx="62" cy="30" r="4" />
            <circle cx="181" cy="42" r="3" />
          </g>
        )}
      </svg>
    </div>
  );
}
