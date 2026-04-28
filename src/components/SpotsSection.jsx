import { useFadeIn } from '../hooks/useFadeIn';
import { DESTS } from '../data';

export function SpotsSection() {
  const ref = useFadeIn();
  return (
    <div className="sw alt" id="destinations">
      <div className="si fi" ref={ref}>
        <p className="sec-pre">Where You're Staying</p>
        <h2 className="sec-h">
          The Four <em>Hotels</em>
        </h2>
        <p className="sec-sub">From ancient rainforest to coral sea to vineyard to mountain adventure.</p>
        <div className="spots">
          {DESTS.map((d) => (
            <div key={d.id} className="scard">
              <div className="scard-img">
                <img src={d.img} alt={d.name} loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />
                <span
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: 'rgba(9,21,34,.88)',
                    borderRadius: 3,
                    padding: '3px 8px',
                    fontSize: 10,
                    color: 'var(--gold2)',
                    letterSpacing: '.06em',
                  }}
                >
                  Days {d.days}
                </span>
              </div>
              <div className="scard-body">
                <p className="scard-pre">
                  {d.flag} {d.country}
                </p>
                <p className="scard-name">{d.name}</p>
                <p className="scard-hotel">{d.hotel}</p>
                <p className="scard-desc">{d.desc.slice(0, 120)}…</p>
                <p className="scard-price">
                  {d.nightly} <span style={{ fontSize: 11, color: 'var(--muted)' }}>/ night</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
