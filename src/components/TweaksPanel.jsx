export function TweaksPanel({ tweaks, setTweak, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 275,
        background: '#182840',
        border: '1px solid #1d3450',
        borderRadius: 12,
        padding: '16px 18px',
        boxShadow: '0 10px 48px rgba(0,0,0,.65)',
        zIndex: 9999,
        fontFamily: 'var(--sans)',
        fontSize: 13,
        color: '#ddeeff',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontWeight: 600, letterSpacing: '.06em' }}>Tweaks</span>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#5e7a96', cursor: 'pointer', fontSize: 22, lineHeight: 1, padding: 0 }}
        >
          ×
        </button>
      </div>
      <label style={{ fontSize: 10, color: '#5e7a96', letterSpacing: '.13em', textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>
        Departure Date
      </label>
      <input
        type="date"
        value={tweaks.tripDate}
        onChange={(e) => setTweak('tripDate', e.target.value)}
        style={{
          width: '100%',
          background: '#091522',
          border: '1px solid #1d3450',
          borderRadius: 6,
          padding: '7px 10px',
          color: '#ddeeff',
          fontFamily: 'var(--sans)',
          fontSize: 13,
          marginBottom: 13,
        }}
      />
      <label style={{ fontSize: 10, color: '#5e7a96', letterSpacing: '.13em', textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>
        Names
      </label>
      <input
        type="text"
        value={tweaks.names}
        onChange={(e) => setTweak('names', e.target.value)}
        style={{
          width: '100%',
          background: '#091522',
          border: '1px solid #1d3450',
          borderRadius: 6,
          padding: '7px 10px',
          color: '#ddeeff',
          fontFamily: 'var(--sans)',
          fontSize: 13,
          marginBottom: 13,
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ fontSize: 10, color: '#5e7a96', letterSpacing: '.13em', textTransform: 'uppercase' }}>Show Budget</label>
        <input
          type="checkbox"
          checked={tweaks.showBudget}
          onChange={(e) => setTweak('showBudget', e.target.checked)}
          style={{ accentColor: 'var(--accent)', width: 16, height: 16, cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}
