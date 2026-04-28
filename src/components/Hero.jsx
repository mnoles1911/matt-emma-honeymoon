import { Stars } from './Stars';
import { useCountdown } from '../hooks/useCountdown';

function goTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 68, behavior: 'smooth' });
}

export function Hero({ tripDate, names }) {
  const t = useCountdown(tripDate);
  return (
    <section className="hero" id="top">
      <div className="hero-bg" />
      <Stars />
      <p className="hero-pre">✈ A once-in-a-lifetime honeymoon</p>
      <h1 className="hero-name">
        <em>{names}</em>
      </h1>
      <p className="hero-route">Australia &amp; New Zealand · 14 Days · March 2027</p>
      <div className="countdown">
        {[['days', 'Days'], ['hours', 'Hrs'], ['mins', 'Min'], ['secs', 'Sec']].map(([k, l], i) => (
          <span key={k} style={{ display: 'contents' }}>
            {i > 0 && <span className="cd-sep">·</span>}
            <div className="cd-unit">
              <div className="cd-num">{String(t[k] ?? '—').padStart(2, '0')}</div>
              <div className="cd-lbl">{l}</div>
            </div>
          </span>
        ))}
      </div>
      <div className="hero-cta">
        <button className="btn-p" onClick={() => goTo('itinerary')}>
          View Itinerary
        </button>
        <button className="btn-g" onClick={() => goTo('map')}>
          Explore the Map
        </button>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 34,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          color: 'var(--muted)',
          fontSize: 10,
          letterSpacing: '.16em',
          textTransform: 'uppercase',
          zIndex: 2,
        }}
        onClick={() => goTo('map')}
      >
        <div style={{ width: 1, height: 34, background: 'linear-gradient(to bottom,var(--border),transparent)' }} />
        Scroll
      </div>
    </section>
  );
}
