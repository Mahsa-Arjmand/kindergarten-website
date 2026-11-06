import { useEffect, useRef, useState } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

/**
 * Google Maps embed for the kindergarten address.
 *
 * The Maps JavaScript API is loaded here (not with a hard-coded <script> tag in
 * index.html) so that:
 *  - the API key comes from `VITE_GOOGLE_MAPS_API_KEY` per environment,
 *  - a missing/restricted key can never break the rest of the page,
 *  - failures degrade to a friendly card with a link to Google Maps.
 */

// Prefer the per-environment key; fall back to the key that previously lived
// in index.html so an existing deployment keeps working after this change.
const FALLBACK_MAPS_KEY = 'AIzaSyA5F4B27eg-POJF1a6bMh6U_G8iSW1s3fs';

const MAPS_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() || FALLBACK_MAPS_KEY;

// Advanced markers require a Map ID. DEMO_MAP_ID works out of the box; set
// VITE_GOOGLE_MAPS_MAP_ID to a Map ID from Google Cloud Console for production
// styling (styles are then configured there, not in code).
const MAPS_MAP_ID =
  (import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string | undefined)?.trim() || 'DEMO_MAP_ID';

const DEFAULT_LAT = 36.6707529;
const DEFAULT_LNG = 48.5353899;
const DEFAULT_ADDRESS =
  'مهدکودک هدیه، زنجان، شهرک منظریه، نسیم ۱۰ غربی، خیابان شهید علیرضا حق وردی، قطعه ۱۸۴';

type LoadState = 'idle' | 'loading' | 'ready' | 'error';

let mapsPromise: Promise<void> | null = null;

/** Loads the Maps JavaScript API exactly once per page session. */
const loadGoogleMaps = (): Promise<void> => {
  if (mapsPromise) return mapsPromise;

  if (!MAPS_KEY) {
    mapsPromise = Promise.reject(new Error('VITE_GOOGLE_MAPS_API_KEY is not set'));
    return mapsPromise;
  }

  mapsPromise = (async () => {
    setOptions({
      key: MAPS_KEY,
      v: 'weekly',
      language: 'fa',
      region: 'IR',
      // Sends only the origin as Referer, which keeps key restrictions based on
      // "HTTP referrers" working for hosts that strip the full path.
      authReferrerPolicy: 'origin',
    });
    await importLibrary('maps');
  })();

  return mapsPromise;
};

interface MapLocationProps {
  address?: string;
  height?: string;
  width?: string;
  lat?: number;
  lng?: number;
  className?: string;
  zoom?: number;
}

const MapLocation = ({
  address = DEFAULT_ADDRESS,
  height = '200px',
  width = '100%',
  lat = DEFAULT_LAT,
  lng = DEFAULT_LNG,
  className = '',
  zoom = 16,
}: MapLocationProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<LoadState>('idle');

  // Deep link that works everywhere, even when the JS API is blocked
  // (this is also where the user ends up if the API key is rejected).
  const externalLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  useEffect(() => {
    let cancelled = false;
    const container = mapRef.current;
    if (!container) return;

    setState('loading');

    loadGoogleMaps()
      .then(async () => {
        if (cancelled || !mapRef.current || typeof google === 'undefined') return;

        const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker'
        )) as google.maps.MarkerLibrary;

        if (cancelled || !mapRef.current) return;

        const map = new Map(mapRef.current, {
          center: { lat, lng },
          zoom,
          mapId: MAPS_MAP_ID,
          disableDefaultUI: true,
          zoomControl: true,
          clickableIcons: false,
        });

        new AdvancedMarkerElement({
          map,
          position: { lat, lng },
          title: 'مهدکودک هدیه',
        });

        if (!cancelled) setState('ready');
      })
      .catch((error) => {
        if (cancelled) return;
        console.warn('[map] Google Maps unavailable:', error);
        setState('error');
      });

    return () => {
      cancelled = true;
    };
  }, [lat, lng, zoom]);

  return (
    <div
      style={{ height, width }}
      className={`relative overflow-hidden rounded-xl border border-border-light bg-pink-50 ${className}`}
    >
      {/* The map canvas stays mounted; it is only hidden on failure. */}
      <div
        ref={mapRef}
        className="h-full w-full"
        style={{ visibility: state === 'error' ? 'hidden' : 'visible' }}
        aria-label={`نقشه ${address}`}
      />

      {(state === 'idle' || state === 'loading') && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-pink-50 text-xs text-muted"
          role="status"
          aria-live="polite"
        >
          <span
            aria-hidden="true"
            className="h-6 w-6 animate-spin rounded-full border-2 border-brand-light border-t-brand"
          />
          <span>در حال بارگذاری نقشه…</span>
        </div>
      )}

      {state === 'error' && (
        <a
          href={externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-pink-50 px-4 text-center text-xs text-muted transition hover:bg-brand-soft"
        >
          <span className="font-bold text-ink">موقعیت مهدکودک هدیه</span>
          <span className="leading-5">{address}</span>
          <span className="mt-1 rounded-full bg-brand px-3 py-1.5 font-bold text-white">
            مشاهده روی نقشه
          </span>
        </a>
      )}
    </div>
  );
};

export default MapLocation;
