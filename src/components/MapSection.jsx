import { useEffect, useRef } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { DESTS, ITIN } from '../data';
import 'leaflet/dist/leaflet.css';

function scrollToDestItin(destIndex) {
  const firstDay = ITIN.find((d) => d.di === destIndex);
  if (!firstDay) return;
  const el = document.getElementById(`day-${firstDay.day}`);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top, behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('open-itin-day', { detail: { day: firstDay.day } }));
  }
}

export function MapSection() {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const fadeRef = useFadeIn();

  useEffect(() => {
    if (leafletMapRef.current || !mapRef.current) return;

    let map;

    import('leaflet').then((mod) => {
      const L = mod.default;

      // Suppress default icon asset lookups (we use divIcons only)
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({ iconUrl: '', iconRetinaUrl: '', shadowUrl: '' });

      map = L.map(mapRef.current, {
        center: [-28, 153],
        zoom: 4,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });

      leafletMapRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 12,
      }).addTo(map);

      // Flight path dashed lines
      DESTS.slice(0, -1).forEach((_, i) => {
        const a = DESTS[i];
        const b = DESTS[i + 1];
        L.polyline(
          [[a.lat, a.lng], [b.lat, b.lng]],
          { color: 'rgba(90,175,208,0.45)', weight: 1.8, dashArray: '8 5' }
        ).addTo(map);
      });

      // Destination markers
      DESTS.forEach((dest, i) => {
        const isAU = dest.flag === '🇦🇺';
        const color = isAU ? '#5aafd0' : '#e8c07a';
        const ringColor = isAU ? 'rgba(90,175,208,0.18)' : 'rgba(232,192,122,0.18)';
        const borderColor = isAU ? 'rgba(90,175,208,0.45)' : 'rgba(232,192,122,0.45)';

        const icon = L.divIcon({
          className: 'map-dest-icon',
          html: `<div class="map-dest-pin" title="${dest.name}">
            <div class="mdp-ring" style="border-color:${borderColor};background:${ringColor}"></div>
            <div class="mdp-dot" style="background:${color}"></div>
            <div class="mdp-label" style="color:${color}">${dest.name.split(' ')[0]}</div>
          </div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
          popupAnchor: [0, -24],
        });

        const marker = L.marker([dest.lat, dest.lng], { icon }).addTo(map);

        const popupContent = `
          <div class="map-popup-inner">
            <div class="mpi-flag">${dest.flag} ${dest.country}</div>
            <div class="mpi-name">${dest.name}</div>
            <div class="mpi-hotel">${dest.hotel}</div>
            <div class="mpi-days">Days ${dest.days} · ${dest.nights} nights · ${dest.nightly}/night</div>
            <button class="mpi-btn" onclick="
              window._scrollToDestItin(${i});
              this.closest('.leaflet-popup').querySelector('.leaflet-popup-close-button').click();
            ">View in Itinerary →</button>
          </div>`;

        marker.bindPopup(popupContent, {
          className: 'map-custom-popup',
          maxWidth: 240,
          offset: [0, -10],
        });
      });

      // Expose scroll helper for popup button onclick
      window._scrollToDestItin = scrollToDestItin;
    });

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="sw alt" id="map">
      <div className="si fi" ref={fadeRef}>
        <p className="sec-pre">Route Overview</p>
        <h2 className="sec-h">
          The Journey <em>Map</em>
        </h2>
        <p className="sec-sub">
          14 days, 2 countries, 4 extraordinary destinations. Click any pin to explore — or jump straight to the itinerary.
        </p>
        <div className="map-wrap leaflet-map-wrap">
          <div ref={mapRef} className="leaflet-map-container" />
          <div className="map-legend">
            <div className="map-legend-row">
              <svg width="26" height="8">
                <line x1="0" y1="4" x2="26" y2="4" stroke="rgba(90,175,208,.5)" strokeWidth="1.8" strokeDasharray="8,5" />
              </svg>
              <span>Flight path</span>
            </div>
            <div className="map-legend-row">
              <div className="map-legend-dot au" />
              <span>Australia</span>
            </div>
            <div className="map-legend-row">
              <div className="map-legend-dot nz" />
              <span>New Zealand</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
