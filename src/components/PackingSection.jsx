import { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { PACKING } from '../data';

const ALL_ITEMS = Object.values(PACKING).flat();

export function PackingSection() {
  const [checked, setChecked] = useState({});
  const ref = useFadeIn();
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div className="sw alt" id="packing">
      <div className="si fi" ref={ref}>
        <p className="sec-pre">Preparation</p>
        <h2 className="sec-h">
          Packing <em>List</em>
        </h2>
        <p className="sec-sub">Everything for 14 days across rainforest, reef, vineyard, and mountain.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: '32px 40px' }}>
          {Object.entries(PACKING).map(([cat, items]) => (
            <div key={cat}>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 15,
                  color: 'var(--gold2)',
                  marginBottom: 10,
                  paddingBottom: 8,
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {cat}
              </h3>
              {items.map((item) => {
                const k = cat + item;
                return (
                  <div key={item} className={`crow${checked[k] ? ' done' : ''}`} onClick={() => setChecked((c) => ({ ...c, [k]: !c[k] }))}>
                    <input type="checkbox" checked={!!checked[k]} onChange={() => {}} />
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <p
          style={{
            marginTop: 24,
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 15,
            color: done === ALL_ITEMS.length ? 'var(--gold2)' : 'var(--muted)',
          }}
        >
          {done} / {ALL_ITEMS.length} items packed{done === ALL_ITEMS.length ? " — you're ready! ✈️" : ''}
        </p>
      </div>
    </div>
  );
}
