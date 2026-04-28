import { useState, useRef } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { useImageStore } from '../hooks/useImageStore';
import { GALLERY_PHOTOS } from '../data';

function GalleryUploadOverlay({ onFile }) {
  const inputRef = useRef(null);
  return (
    <div className="gcell-upload-overlay">
      <button
        className="gcell-upload-btn"
        title="Upload your own photo"
        onClick={() => inputRef.current?.click()}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => { if (e.target.files?.[0]) onFile(e.target.files[0]); e.target.value = ''; }}
      />
    </div>
  );
}

export function GallerySection() {
  const ref = useFadeIn();
  const [loaded, setLoaded] = useState({});
  const [errored, setErrored] = useState({});
  const { images, setImage } = useImageStore('gallery-images');

  return (
    <div className="sw" id="gallery">
      <div className="si fi" ref={ref}>
        <p className="sec-pre">Memories to Make</p>
        <h2 className="sec-h">
          Photo <em>Gallery</em>
        </h2>
        <p className="sec-sub">Placeholder shots from every stop — hover any photo and click the upload icon to swap in your own.</p>
        <div className="gallery">
          {GALLERY_PHOTOS.map((p, i) => {
            const customSrc = images[i];
            const src = customSrc || p.url;
            const isLoaded = loaded[i];
            const isErrored = !customSrc && errored[i];
            return (
              <div key={i} className="gcell">
                {!isLoaded && !isErrored && <div className="gcell-loading">Loading…</div>}
                {!isErrored && (
                  <img
                    src={src}
                    alt={p.label}
                    loading="lazy"
                    style={{ opacity: isLoaded ? 1 : 0 }}
                    onLoad={() => setLoaded((l) => ({ ...l, [i]: true }))}
                    onError={() => { if (!customSrc) setErrored((e) => ({ ...e, [i]: true })); }}
                  />
                )}
                {isErrored && (
                  <div className="ph-img" style={{ height: '100%' }}>
                    <span style={{ position: 'relative', zIndex: 1, padding: '7px 10px', fontSize: 10, fontFamily: 'monospace', color: 'var(--muted)' }}>
                      {p.label}
                    </span>
                  </div>
                )}
                <div className="gcell-label">{p.label}</div>
                <GalleryUploadOverlay onFile={(file) => { setImage(i, file); setLoaded((l) => ({ ...l, [i]: true })); setErrored((e) => ({ ...e, [i]: false })); }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
