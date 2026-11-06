import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Site loading indicators.
 *
 *  SiteLoader      — full-screen splash on first paint. It also removes the
 *                    static splash from index.html, so the user never stares at
 *                    a blank white page while the JS bundle downloads.
 *  RouteProgress   — thin bar at the top of the viewport while the router moves
 *                    between pages (non-blocking).
 */

const MIN_VISIBLE_MS = 450;
const FADE_OUT_MS = 300;

export const hideBootLoader = () => {
  const loader = document.getElementById('app-boot-loader');
  if (!loader || loader.classList.contains('is-hidden')) return;
  loader.classList.add('is-hidden');
  window.setTimeout(() => loader.remove(), FADE_OUT_MS + 100);
};

export const SiteLoader = () => {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  // First React commit — swap the static HTML splash for the React one.
  useEffect(() => {
    hideBootLoader();
    const timer = window.setTimeout(() => setLeaving(true), MIN_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(() => setVisible(false), FADE_OUT_MS);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="در حال بارگذاری سایت"
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-[#fff7fb] transition-opacity duration-300 ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="boot-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div
        aria-hidden="true"
        className="h-9 w-9 animate-spin rounded-full border-[3px] border-[#f3e0ea] border-t-brand"
      />
      <p className="px-4 text-center text-[13px] font-bold text-muted">
        کودکستان هدیه — در حال بارگذاری…
      </p>
    </div>
  );
};

export const RouteProgress = () => {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Skip the very first render: SiteLoader already covers the boot.
    if (first.current) {
      first.current = false;
      return;
    }
    setActive(true);
    const timer = window.setTimeout(() => setActive(false), 600);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="route-progress fixed inset-x-0 top-0 z-[70] h-[3px] bg-brand"
    />
  );
};

const SiteLoaderBundle = () => (
  <>
    <SiteLoader />
    <RouteProgress />
  </>
);

export default SiteLoaderBundle;
