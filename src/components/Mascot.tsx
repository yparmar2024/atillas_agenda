import '../styles/mascot.css';
export function Mascot({
  state = 'idle',
}: {
  state?: 'idle' | 'walking' | 'studying' | 'celebrating';
}) {
  return (
    <div
      className={`duck duck-${state}`}
      role="img"
      aria-label={`Attila the duck, ${state}`}
    >
      <svg viewBox="0 0 220 210" fill="none">
        <ellipse
          cx="112"
          cy="194"
          rx="65"
          ry="9"
          fill="#263c2e"
          opacity=".13"
        />
        <g className="duck-body">
          <path
            d="M80 174l-13 16h35l5-15M127 174l3 16h35l-19-19"
            fill="#E5A640"
            stroke="#553F35"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M59 108c-13 8-22 5-28-3-3 30 16 64 53 72 39 9 84-9 86-43 1-27-25-41-59-37z"
            fill="#F8F2DB"
            stroke="#553F35"
            strokeWidth="3"
          />
          <path
            d="M86 126c11-8 31-6 39 4-1 16-14 26-30 24"
            fill="#E9E0C5"
            stroke="#553F35"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M112 109c-21-8-28-26-24-47 4-27 25-42 50-37 26 4 36 25 31 49-4 24-24 39-57 35z"
            fill="#F8F2DB"
            stroke="#553F35"
            strokeWidth="3"
          />
          <path
            d="M104 29l-7-14 19 6 8-15 10 18"
            fill="#F8F2DB"
            stroke="#553F35"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M158 66c18-5 33 1 32 9-1 10-23 12-35 6"
            fill="#E5A640"
            stroke="#553F35"
            strokeWidth="3"
          />
          <circle cx="146" cy="56" r="4" fill="#49382F" />
          <circle cx="149" cy="71" r="7" fill="#E9B6A1" opacity=".6" />
          <path
            d="M99 99c13 9 32 11 46 3l-3 17c-17 6-32 1-44-6z"
            fill="#872F43"
          />
          <path d="M114 112l-9 31 16-5 9 8 1-30" fill="#872F43" />
          {state === 'studying' && (
            <g>
              <path
                d="M83 139l30-7 28 12-1 32-29-10-28 4z"
                fill="#577365"
                stroke="#384F44"
                strokeWidth="3"
              />
              <path d="M112 134v31" stroke="#F8F2DB" strokeWidth="2" />
            </g>
          )}
          {state === 'celebrating' && (
            <g fill="#E5A640">
              <path d="M42 35l4 10 11 3-11 4-4 10-3-10-11-4 11-3z" />
              <path d="M182 104l3 8 9 3-9 3-3 8-3-8-8-3 8-3z" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
