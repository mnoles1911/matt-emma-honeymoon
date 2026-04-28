import { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { BUCKET } from '../data';

export function BucketSection() {
  const [checked, setChecked] = useState({});
  const ref = useFadeIn();
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div className="sw" id="bucket">
      <div className="si fi" ref={ref}>
        <p className="sec-pre">Adventures</p>
        <h2 className="sec-h">
          Bucket <em>List</em>
        </h2>
        <p className="sec-sub">Check these off as you go — then compare notes after!</p>
        <div className="cgrid">
          {BUCKET.map((item) => (
            <div
              key={item}
              className={`crow${checked[item] ? ' done' : ''}`}
              onClick={() => setChecked((c) => ({ ...c, [item]: !c[item] }))}
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
