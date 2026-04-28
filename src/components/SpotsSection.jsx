import { useRef } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { useImageStore } from '../hooks/useImageStore';
import { DESTS } from '../data';

function UploadBtn({ onFile }) {
  const inputRef = useRef(null);
  return (
    <>
      <button
        className="img-upload-btn"
        title="Upload your own photo"
        onClick={() => inputRef.current?.click()}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        Replace photo
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => { if (e.target.files?.[0]) onFile(e.target.files[0]); e.target.value = ''; }}
      />
    </>
  );
}

export function SpotsSection() {
  const ref = useFadeIn();
  const { images, setImage } = useImageStore('hotel-images');

  return (
    <div className="sw alt" id="destinations">
      <div className="si fi" ref={ref}>
        <p className="sec-pre">Where You're Staying</p>
        <h2 className="sec-h">
          The Four <em>Hotels</em>
        </h2>
        <p className="sec-sub">From ancient rainforest to coral sea to vineyard to mountain adventure.</p>
        <div className="spots">
          {DESTS.map((d, i) => (
            <div key={d.id} className="scard">
              <div className="scard-img">
                <img
                  src={images[i] || d.img}
                  alt={d.name}
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="scard-days-badge">Days {d.days}</span>
                <div className="scard-img-overlay">
                  <UploadBtn onFile={(file) => setImage(i, file)} />
                </div>
              </div>
              <div className="scard-body">
                <p className="scard-pre">
                  {d.flag} {d.country}
                </p>
                <p className="scard-name">{d.name}</p>
                <a
                  href={d.hotelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scard-hotel scard-hotel-link"
                >
                  {d.hotel} ↗
                </a>
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
