import { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { BUCKET } from '../data';

function loadChecked() {
  try { return JSON.parse(localStorage.getItem('bucket-checked') || '{}'); }
  catch { return {}; }
}

export function BucketSection() {
  const [checked, setChecked] = useState(loadChecked);
  const ref = useFadeIn();
  const done = Object.values(checked).filter(Boolean).length;

  const toggle = (item) => {
    setChecked((c) => {
      const next = { ...c, [item]: !c[item] };
      try { localStorage.setItem('bucket-checked', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  return (
    <div className="sw" id="bucket">
      <div className="si fi" ref={ref}>
        <p className="sec-pre">Adventures</p>
        <h2 className="sec-h">
          Bucket <em>List</em>
        </h2>
        <p className="sec-sub">Check these off as you go — your progress is saved automatically.</p>
        <div className="cgrid">
          {BUCKET.map((item) => (
            <div
              key={item}
              className={`crow${checked[item] ? ' done' : ''}`}
              onClick={() => toggle(item)}
            >
              <input type="checkbox" checked={!!checked[item]} onChange={() => {}} />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 28, fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--gold2)' }}>
          {done} of {BUCKET.length} adventures completed{done > 0 ? ' ✨' : ''}
        </p>
      </div>
    </div>
  );
}
