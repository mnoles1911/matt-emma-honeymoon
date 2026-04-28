import { useFadeIn } from '../hooks/useFadeIn';
import { FLIGHTS } from '../data';

export function FlightsSection() {
  const ref = useFadeIn();
  return (
    <div className="sw alt" id="flights">
      <div className="si fi" ref={ref}>
        <p className="sec-pre">Getting There</p>
        <h2 className="sec-h">
          Flights at a <em>Glance</em>
        </h2>
        <p className="sec-sub">
          All 6 legs — Washington DC origin and return. Book as open-jaw: fly into Cairns, return from Queenstown.
        </p>
        <div className="flights-block">
          <div className="flights-hd">
            <p className="flights-hd-title">Washington DC → Cairns → Queenstown → Washington DC</p>
            <p className="flights-hd-sub">Open-jaw · 6 flights total · 14 nights</p>
          </div>
          {FLIGHTS.map((f, i) => (
            <div key={i} className="flight-row">
              <span className="flight-seg">{f.seg}</span>
              <span className="flight-info">{f.info}</span>
              <span className="flight-cost">{f.cost}</span>
            </div>
          ))}
          <div className="flight-tip">
            💡 <strong style={{ color: 'var(--text)' }}>Book open-jaw ASAP.</strong> IAD (Dulles) has more transpacific
            routing options than DCA. Consider Fiji Airways via Nadi — award-winning cabin and a tropical layover preview.
            Book international 6–9 months out. March/April is shoulder season — lush Daintree, golden Marlborough harvest,
            ideal Queenstown autumn.
          </div>
        </div>
      </div>
    </div>
  );
}
