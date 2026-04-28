import { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { DESTS } from '../data';

const SVG_W = 880;
const SVG_H = 400;

const AU_PATH =
  'M 92,220 L 97,162 L 112,110 L 172,78 L 235,50 L 316,36 L 394,36 L 440,50 L 462,72 L 480,112 L 500,158 L 484,207 L 464,240 L 420,256 L 376,260 L 314,252 L 264,250 L 202,244 L 134,236 Z';
const NZ_N = 'M 615,170 L 638,164 L 655,176 L 652,214 L 638,238 L 618,240 L 606,226 L 608,195 Z';
const NZ_S =
  'M 604,248 L 638,242 L 655,258 L 658,292 L 644,322 L 622,338 L 600,330 L 578,308 L 576,282 L 592,258 Z';
const TAS = 'M 440,263 L 453,261 L 456,275 L 443,278 Z';

function getPopupStyle(d) {
  const xp = (d.px / SVG_W) * 100;
  const yp = (d.py / SVG_H) * 100;
  return {
    left: xp > 65 ? 'auto' : `${Math.min(xp + 3, 56)}%`,
    right: xp > 65 ? `${Math.max(100 - xp + 3, 5)}%` : 'auto',
    top: yp > 65 ? `${yp - 44}%` : `${Math.max(yp - 4, 2)}%`,
  };
}

export function MapSection() {
  const [active, setActive] = useState(null);
  const ref = useFadeIn();

  const flightPaths = DESTS.slice(0, -1).map((_, i) => {
    const a = DESTS[i];
    const b = DESTS[i + 1];
    const mx = (a.px + b.px) / 2;
    const my = Math.min(a.py, b.py) - 42;
    return `M ${a.px},${a.py} Q ${mx},${my} ${b.px},${b.py}`;
  });

  return (
    <div className="sw alt" id="map">
      <div className="si fi" ref={ref}>
        <p className="sec-pre">Route Overview</p>
        <h2 className="sec-h">
          The Journey <em>Map</em>
        </h2>
        <p className="sec-sub">14 days, 2 countries, 4 extraordinary hotels. Click any pin to explore.</p>
        <div className="map-wrap">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="map-svg"
            style={{ background: 'linear-gradient(145deg,#091830 0%,#0b2142 100%)' }}
          >
            {[...Array(9)].map((_, i) => (
              <line key={'v' + i} x1={i * 110} y1={0} x2={i * 110} y2={SVG_H} stroke="rgba(255,255,255,.022)" strokeWidth={1} />
            ))}
            {[...Array(5)].map((_, i) => (
              <line key={'h' + i} x1={0} y1={i * 100} x2={SVG_W} y2={i * 100} stroke="rgba(255,255,255,.022)" strokeWidth={1} />
            ))}
            <path d={AU_PATH} fill="#172d47" stroke="#1e3f60" strokeWidth={1.5} />
            <path d={NZ_N} fill="#172d47" stroke="#1e3f60" strokeWidth={1.5} />
            <path d={NZ_S} fill="#172d47" stroke="#1e3f60" strokeWidth={1.5} />
            <path d={TAS} fill="#172d47" stroke="#1e3f60" strokeWidth={1.5} />
            <text x="290" y="172" fill="rgba(255,255,255,.09)" fontSize="22" fontFamily="Georgia,serif" fontStyle="italic" textAnchor="middle">
              Australia
            </text>
            <text x="626" y="296" fill="rgba(255,255,255,.09)" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic" textAnchor="middle">
              New Zealand
            </text>
            {flightPaths.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="rgba(90,175,208,.28)" strokeWidth={1.5} strokeDasharray="7,5" />
            ))}
            {DESTS.map((d) => (
              <g key={d.id} className="pgrp" onClick={() => setActive(active?.id === d.id ? null : d)}>
                <circle cx={d.px} cy={d.py} r={16} fill={active?.id === d.id ? 'rgba(201,148,74,.2)' : 'rgba(90,175,208,.12)'} />
                <circle
                  cx={d.px}
                  cy={d.py}
                  r={active?.id === d.id ? 6 : 4}
                  fill={active?.id === d.id ? '#c9944a' : '#5aafd0'}
                  style={{ transition: 'r .2s' }}
                />
                <line x1={d.px} y1={d.py - 5} x2={d.px} y2={d.py - 21} stroke={active?.id === d.id ? '#c9944a' : '#5aafd0'} strokeWidth={1.5} />
                <text
                  x={d.px}
                  y={d.py - 27}
                  fill={active?.id === d.id ? '#e8c07a' : 'rgba(210,235,255,.8)'}
                  fontSize="8"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                  fontWeight="600"
                >
                  D{d.days}
                </text>
              </g>
            ))}
          </svg>
          {active && (
            <div className="mpopup" style={getPopupStyle(active)}>
              <p className="mpopup-pre">
                {active.flag} {active.country} · Days {active.days}
              </p>
              <p className="mpopup-name">{active.name}</p>
              <p className="mpopup-sub">{active.hotel}</p>
              <p className="mpopup-price">
                {active.nightly}/night · {active.nights} nights
              </p>
            </div>
          )}
          <div style={{ position: 'absolute', bottom: 14, right: 14, display: 'flex', flexDirection: 'column', gap: 7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10, color: 'var(--muted)' }}>
              <svg width={26} height={8}>
                <line x1={0} y1={4} x2={26} y2={4} stroke="rgba(90,175,208,.5)" strokeWidth={1.5} strokeDasharray="6,4" />
              </svg>
              Flight path
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10, color: 'var(--muted)' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)' }} />
              Destination
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
