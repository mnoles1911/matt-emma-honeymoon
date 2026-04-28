import { useState, useEffect } from 'react';
import { TWEAK_DEFAULTS } from './data';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { MapSection } from './components/MapSection';
import { ItinSection } from './components/ItinSection';
import { SpotsSection } from './components/SpotsSection';
import { GallerySection } from './components/GallerySection';
import { FlightsSection } from './components/FlightsSection';
import { SwapSection } from './components/SwapSection';
import { PackingSection } from './components/PackingSection';
import { BucketSection } from './components/BucketSection';
import { BudgetSection } from './components/BudgetSection';
import { TweaksPanel } from './components/TweaksPanel';

export function App() {
  const [tweaks, setTweaksState] = useState(TWEAK_DEFAULTS);
  const [showTweaks, setShowTweaks] = useState(false);

  const setTweak = (k, v) =>
    setTweaksState((prev) => {
      const next = { ...prev, [k]: v };
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*');
      return next;
    });

  useEffect(() => {
    const h = (e) => {
      if (e.data?.type === '__activate_edit_mode') setShowTweaks(true);
      if (e.data?.type === '__deactivate_edit_mode') setShowTweaks(false);
    };
    window.addEventListener('message', h);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', h);
  }, []);

  return (
    <div>
      <Nav names={tweaks.names} showBudget={tweaks.showBudget} />
      <Hero tripDate={tweaks.tripDate} names={tweaks.names} />
      <div className="divider" />
      <MapSection />
      <div className="divider" />
      <ItinSection />
      <div className="divider" />
      <SpotsSection />
      <div className="divider" />
      <GallerySection />
      <div className="divider" />
      <FlightsSection />
      <div className="divider" />
      <SwapSection />
      <div className="divider" />
      <PackingSection />
      <div className="divider" />
      <BucketSection />
      {tweaks.showBudget && (
        <>
          <div className="divider" />
          <BudgetSection />
        </>
      )}
      <footer className="footer">
        <p className="fq">"{tweaks.names} — forever begins in March 2027"</p>
        <p className="fm">Washington DC · Australia · New Zealand · 14 days · A lifetime of memories</p>
      </footer>
      {showTweaks && (
        <TweaksPanel
          tweaks={tweaks}
          setTweak={setTweak}
          onClose={() => {
            setShowTweaks(false);
            window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
          }}
        />
      )}
    </div>
  );
}
