import { useFadeIn } from '../hooks/useFadeIn';
import { SWAPS } from '../data';

export function SwapSection() {
  const ref = useFadeIn();
  return (
    <div className="sw" id="swaps">
      <div className="si fi" ref={ref}>
        <p className="sec-pre">Flexibility</p>
        <h2 className="sec-h">
          Activity <em>Swap Menu</em>
        </h2>
        <p className="sec-sub">
          Alternatives to trade in and out — each replaces or adds to a specific slot in the itinerary.
        </p>
        {SWAPS.map((region) => (
          <div key={region.region}>
            <p className="swap-region-lbl">{region.region}</p>
            <div className="swap-grid">
              {region.items.map((item) => (
                <div key={item.name} className="swap-card">
                  <p className="swap-name">{item.name}</p>
                  <p className="swap-desc">{item.desc}</p>
                  <p className="swap-replaces">{item.replaces}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
