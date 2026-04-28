import { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { ITIN, DESTS } from '../data';

export function ItinSection() {
  const [open, setOpen] = useState(1);
  const ref = useFadeIn();

  return (
    <div className="sw" id="itinerary">
      <div className="si fi" ref={ref}>
        <p className="sec-pre">Day by Day</p>
        <h2 className="sec-h">
          The Full <em>Itinerary</em>
        </h2>
        <p className="sec-sub">14 unforgettable days — tap any to read the full story.</p>
        {ITIN.map((d) => {
          const dest = DESTS[d.di];
          const isOpen = open === d.day;
          return (
            <div key={d.day} className={`dc${isOpen ? ' open' : ''}`}>
              <div className="dc-hd" onClick={() => setOpen(isOpen ? null : d.day)}>
                <span className="dc-n">Day {d.day}</span>
                <div className="dc-info">
                  <div className="dc-title">{d.title}</div>
                  <div className="dc-where">
                    {dest.flag} {dest.name} · {dest.hotel}
                  </div>
                </div>
                <span className="dc-arr">▾</span>
              </div>
              {isOpen && (
                <div className="dc-body">
                  <p className="dc-hotel">
                    🏨 {dest.hotel} · {dest.nightly}/night
                  </p>
                  <p className="dc-text">{d.desc}</p>
                  <div className="tags">
                    {dest.acts.map((a) => (
                      <span key={a} className={`tag ${dest.flag === '🇦🇺' ? 'au' : 'nz'}`}>
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
