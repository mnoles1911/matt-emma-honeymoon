import { useState } from 'react';

async function resizeToDataUrl(file, maxPx = 900) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(maxPx / img.width, maxPx / img.height, 1);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });
}

export function useImageStore(storageKey) {
  const [images, setImages] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
    catch { return {}; }
  });

  const setImage = async (index, file) => {
    const dataUrl = await resizeToDataUrl(file);
    if (!dataUrl) return;
    setImages((prev) => {
      const next = { ...prev, [index]: dataUrl };
      try { localStorage.setItem(storageKey, JSON.stringify(next)); }
      catch { console.warn('LocalStorage full — image not saved across sessions.'); }
      return next;
    });
  };

  return { images, setImage };
}
