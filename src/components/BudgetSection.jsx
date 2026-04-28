import { useFadeIn } from '../hooks/useFadeIn';
import { BUDGET } from '../data';

const fmt = (n) => '$' + n.toLocaleString();

export function BudgetSection() {
  const ref = useFadeIn();
  const totalLow = BUDGET.reduce((s, b) => s + b.low, 0);
  const totalHigh = BUDGET.reduce((s, b) => s + b.high, 0);
  const maxVal = Math.max(...BUDGET.map((b) => b.high));

  return (
    <div className="sw alt" id="budget">
      <div className="si fi" ref={ref}>
        <p className="sec-pre">Trip Finances</p>
        <h2 className="sec-h">
          Budget <em>Overview</em>
        </h2>
        <p className="sec-sub">Estimated costs for two people. Ranges reflect booking timing and choices.</p>
        <div
          style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden' }}
        >
          <table className="btable">
            <thead>
              <tr>
                <th>Category</th>
                <th>Low</th>
                <th>High</th>
                <th style={{ width: '24%' }}>Scale</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {BUDGET.map((b) => (
                <tr key={b.cat}>
                  <td style={{ color: 'var(--text)' }}>{b.cat}</td>
                  <td style={{ color: 'var(--accent)', fontFamily: 'monospace' }}>{fmt(b.low)}</td>
                  <td style={{ color: 'var(--muted)', fontFamily: 'monospace' }}>{fmt(b.high)}</td>
                  <td>
                    <div className="bbar-bg">
                      <div
                        className="bbar"
                        style={{
                          width: `${(b.high / maxVal) * 100}%`,
                          background: b.cat.includes('qualia') ? 'var(--gold)' : 'var(--accent)',
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ color: 'var(--muted)', fontSize: 11 }}>{b.note}</td>
                </tr>
              ))}
              <tr style={{ borderTop: '2px solid var(--border)' }}>
                <td style={{ color: 'var(--gold2)', fontWeight: 600, fontSize: 14 }}>Total (2 people)</td>
                <td style={{ color: 'var(--gold)', fontFamily: 'monospace', fontWeight: 700 }}>{fmt(totalLow)}</td>
                <td style={{ color: 'var(--gold2)', fontFamily: 'monospace', fontWeight: 700 }}>{fmt(totalHigh)}</td>
                <td />
                <td style={{ fontSize: 11, color: 'var(--muted)' }}>Excl. honeymoon extras</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 14, fontSize: 12, color: 'var(--muted)' }}>
          💡 Book international flights and qualia early — both are time-sensitive and represent the largest share of total cost.
        </p>
      </div>
    </div>
  );
}
