import { useState, useEffect } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { ITIN, DESTS } from '../data';

export function ItinSection() {
  const [open, setOpen] = useState(1);
  const ref = useFadeIn();

  useEffect(() => {
    const handler = (e) => setOpen(e.detail.day);
    window.addEventListener('open-itin-day', handler);
    return () => window.removeEventListener('open-itin-day', handler);
  }, []);

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
          const isFirstOfDest = ITIN.findIndex((x) => x.di === d.di) === ITIN.indexOf(d);
          return (
            <div
              key={d.day}
              className={`dc${isOpen ? ' open' : ''}`}
              id={isFirstOfDest ? `day-${d.day}` : `day-${d.day}`}
              data-dest={d.di}
            >
              <div className="dc-hd" onClick={() => setOpen(isOpen ? null : d.day)}>
                <span className="dc-n">Day {d.day}</span>
                <div className="dc-info">
                  <div className="dc-title">{d.title}</div>
                  <div className="dc-where">
                    {dest.flag} {dest.name} ·{' '}
                    <a
                      href={dest.hotelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dc-hotel-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {dest.hotel}
                    </a>
                  </div>
                </div>
                <span className="dc-arr">▾</span>
              </div>
              {isOpen && (
                <div className="dc-body">
                  <p className="dc-hotel">
                    🏨{' '}
                    <a href={dest.hotelUrl} target="_blank" rel="noopener noreferrer" className="dc-hotel-link-full">
                      {dest.hotel}
                    </a>{' '}
                    · {dest.nightly}/night
                  </p>
                  <p className="dc-text">{d.desc}</p>
                  <div className="tags">
                    {dest.acts.map((a, ai) => (
                      <a
                        key={a}
                        href={dest.actLinks?.[ai] || `https://www.google.com/search?q=${encodeURIComponent(a + ' ' + dest.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`tag tag-link ${dest.flag === '🇦🇺' ? 'au' : 'nz'}`}
                      >
                        {a} ↗
                      </a>
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
