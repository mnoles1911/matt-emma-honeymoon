import { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { GALLERY_PHOTOS } from '../data';

export function GallerySection() {
  const ref = useFadeIn();
  const [loaded, setLoaded] = useState({});
  const [errored, setErrored] = useState({});

  return (
    <div className="sw" id="gallery">
      <div className="si fi" ref={ref}>
        <p className="sec-pre">Memories to Make</p>
        <h2 className="sec-h">
          Photo <em>Gallery</em>
        </h2>
        <p className="sec-sub">Moments from every stop on the route — swap in your own photos when you're back.</p>
        <div className="gallery">
          {GALLERY_PHOTOS.map((p, i) => (
            <div key={i} className="gcell">
              {!loaded[i] && !errored[i] && <div className="gcell-loading">Loading…</div>}
              {!errored[i] && (
                <img
                  src={p.url}
                  alt={p.label}
                  loading="lazy"
                  style={{ opacity: loaded[i] ? 1 : 0 }}
                  onLoad={() => setLoaded((l) => ({ ...l, [i]: true }))}
                  onError={() => setErrored((e) => ({ ...e, [i]: true }))}
                />
              )}
              {errored[i] && (
                <div className="ph-img" style={{ height: '100%' }}>
                  <span style={{ position: 'relative', zIndex: 1, padding: '7px 10px', fontSize: 10, fontFamily: 'monospace', color: 'var(--muted)' }}>
                    {p.label}
                  </span>
                </div>
              )}
              <div className="gcell-label">{p.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
