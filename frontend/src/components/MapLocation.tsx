import { useEffect, useRef, useState } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

/**
 * Google Maps embed for the kindergarten address.
 *
 * The Maps JavaScript API is loaded here — never with a hard-coded <script> tag
 * in index.html — so that:
 *  - the API key comes from `VITE_GOOGLE_MAPS_API_KEY` per environment,
 *  - a missing / referrer-restricted key can never break the rest of the page,
 *  - failures fall back to a keyless Google Maps iframe, then to a plain link.
 *
 * Note: loading the SDK with a plain <script> tag (as this project used to do)
 * produces the console warnings "loaded directly without loading=async" and
 * "google.maps.Marker is deprecated"; both are avoided here.
 */

// Prefer the per-environment key; fall back to the key that previously lived in
// index.html so an existing deployment keeps working after this change.
const FALLBACK_MAPS_KEY = 'AIzaSyA5F4B27eg-POJF1a6bMh6U_G8iSW1s3fs';

const MAPS_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() || FALLBACK_MAPS_KEY;

// Advanced markers require a Map ID. DEMO_MAP_ID works out of the box; set
// VITE_GOOGLE_MAPS_MAP_ID to a Map ID from Google Cloud Console for production
// styling (styles are configured there, not in code).
const MAPS_MAP_ID =
  (import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string | undefined)?.trim() || 'DEMO_MAP_ID';

const DEFAULT_LAT = 36.6707529;
const DEFAULT_LNG = 48.5353899;
const DEFAULT_ADDRESS =
  'مهدکودک هدیه، زنجان، شهرک منظریه، نسیم ۱۰ غربی، خیابان شهید علیرضا حق وردی، قطعه ۱۸۴';

const LOAD_TIMEOUT_MS = 12000;
const AUTH_FAILURE_EVENT = 'hedieh:maps-auth-failure';

type LoadState = 'idle' | 'loading' | 'ready' | 'error';

declare global {
  interface Window {
    /** Called by the Maps API when an API key / billing problem occurs. */
    gm_authFailure?: () => void;
  }
}

/** Rejects the pending `importLibrary()` when the Maps API reports an error. */
let rejectPendingLoad: ((error: Error) => void) | null = null;

function withErrorRejection<T>(promise: Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let settled = false;

    const timer = window.setTimeout(() => {
      finish(() => reject(new Error('Google Maps load timed out')));
    }, LOAD_TIMEOUT_MS);

    function finish(action: () => void) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      rejectPendingLoad = null;
      action();
    }

    // The Maps JS API resolves its bootstrap promise through
    // `google.maps.__ib__`. Google's documented pattern for turning
    // `gm_authFailure` into a rejection is to reset `__ib__`; doing it a step
    // earlier lets us reject our own awaiting promise as well.
    const g = window.google as unknown as
      | { __ib__?: () => Promise<unknown>; maps?: { __ib__?: () => Promise<unknown> } }
      | undefined;
    const bootstrap = g?.maps?.__ib__ ?? g?.__ib__;

    if (typeof bootstrap === 'function') {
      const originalBootstrap = bootstrap.bind(g?.maps ?? g);
      const patched = () =>
        originalBootstrap().then(
          (value) => {
            finish(() => resolve(value as T));
            return value;
          },
          (error: unknown) => {
            finish(() => reject(error instanceof Error ? error : new Error(String(error))));
            throw error;
          }
        );
      // No load is in flight yet, so replacing it only affects our own load.
      if (g?.maps) g.maps.__ib__ = patched;
      else if (g) g.__ib__ = patched;
    }

    rejectPendingLoad = (error) => finish(() => reject(error));

    promise.then(
      (value) => finish(() => resolve(value)),
      (error) => finish(() => reject(error))
    );
  });
}

/** Installs a single global handler for key/billing failures. */
const installAuthFailureHandler = () => {
  if (window.gm_authFailure) return;

  window.gm_authFailure = () => {
    const error = new Error(
      'Google Maps rejected this API key (RefererDeniedMapError / auth failure). ' +
        'Add the current domain to the key restrictions in Google Cloud Console.'
    );
    console.warn('[map]', error.message);
    rejectPendingLoad?.(error);
    window.dispatchEvent(new CustomEvent(AUTH_FAILURE_EVENT, { detail: error }));
  };
};

let mapsPromise: Promise<void> | null = null;

const doLoadGoogleMaps = (): Promise<void> => {
  installAuthFailureHandler();

  if (!MAPS_KEY) {
    return Promise.reject(new Error('VITE_GOOGLE_MAPS_API_KEY is not set'));
  }

  // Don't re-inject the script if it is already on the page (e.g. loaded by
  // another integration, or after a hot reload).
  if (typeof google !== 'undefined' && typeof google.maps?.importLibrary === 'function') {
    return Promise.resolve();
  }

  setOptions({
    key: MAPS_KEY,
    v: 'weekly',
    language: 'fa',
    region: 'IR',
    // Sends only the origin as Referer, which keeps "HTTP referrers" key
    // restrictions working on hosts that strip the full path.
    authReferrerPolicy: 'origin',
    // Loads the SDK asynchronously (best practice); not in the loader typings.
    loading: 'async',
  } as Parameters<typeof setOptions>[0]);

  return withErrorRejection(importLibrary('maps')).then(() => undefined);
};

/** Loads the Maps JavaScript API exactly once per page session. */
const loadGoogleMaps = (): Promise<void> => {
  if (!mapsPromise) {
    mapsPromise = doLoadGoogleMaps();
  }
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

  // Keyless embed: renders a real map even when the JS API key is rejected.
  const embedSrc = `https://maps.google.com/maps?q=${lat},${lng}&hl=fa&z=${zoom}&output=embed`;
  const externalLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  useEffect(() => {
    let cancelled = false;
    if (!mapRef.current) return;

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
        console.warn('[map] Google Maps unavailable, using embed fallback:', error);
        setState('error');
      });

    // Key/billing failures can also arrive after the map was drawn.
    const handleAuthFailure = () => {
      if (!cancelled) setState('error');
    };
    window.addEventListener(AUTH_FAILURE_EVENT, handleAuthFailure);

    return () => {
      cancelled = true;
      window.removeEventListener(AUTH_FAILURE_EVENT, handleAuthFailure);
    };
  }, [lat, lng, zoom]);

  return (
    <div
      style={{ height, width }}
      className={`relative overflow-hidden rounded-xl border border-border-light bg-pink-50 ${className}`}
    >
      {/* The SDK canvas stays mounted; it is only hidden when we fall back. */}
      <div
        ref={mapRef}
        className="h-full w-full"
        style={{ visibility: state === 'ready' ? 'visible' : 'hidden' }}
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
        <div className="absolute inset-0 bg-pink-50">
          <iframe
            title={`نقشه ${address}`}
            src={embedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 left-2 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-brand shadow transition hover:bg-brand hover:text-white"
          >
            مشاهده روی نقشه
          </a>
        </div>
      )}
    </div>
  );
};

export default MapLocation;
