import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  DEFAULT_SITE_URL,
  LOGO_PATH,
  LOGO_SIZE,
  SITE_LOCALE,
  SITE_NAME,
  adminSeo,
  findRoute,
  isNoindexPath,
  normalizePath,
  notFoundSeo,
} from './routes';

const SITE_URL = (((import.meta.env.VITE_SITE_URL as string | undefined) ?? '').trim() || DEFAULT_SITE_URL).replace(/\/+$/, '');

type MetaKey = { attr: 'name' | 'property'; key: string };

function setMeta({ attr, key }: MetaKey, content: string | null) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (content === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (href === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Keeps <title>, description, canonical, robots, Open Graph and Twitter tags
 * in sync with the current route. Mount once inside <Router>.
 * The same values are baked into static HTML at build time (vite-seo-plugin.ts),
 * so crawlers that do not run JavaScript see them too.
 */
const RouteSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = normalizePath(pathname);
    const route = findRoute(path);
    const noindex = isNoindexPath(path) || !route;
    const seo = route ?? (isNoindexPath(path) ? adminSeo : notFoundSeo);

    document.documentElement.lang = 'fa';
    document.documentElement.dir = 'rtl';
    document.title = seo.title;

    setMeta({ attr: 'name', key: 'description' }, seo.description);
    setMeta({ attr: 'name', key: 'robots' }, noindex ? 'noindex,nofollow' : null);

    const url = !noindex && SITE_URL ? `${SITE_URL}${path === '/' ? '/' : path}` : null;
    setCanonical(url);

    setMeta({ attr: 'property', key: 'og:type' }, 'website');
    setMeta({ attr: 'property', key: 'og:site_name' }, SITE_NAME);
    setMeta({ attr: 'property', key: 'og:locale' }, SITE_LOCALE);
    setMeta({ attr: 'property', key: 'og:title' }, seo.title);
    setMeta({ attr: 'property', key: 'og:description' }, seo.description);
    setMeta({ attr: 'property', key: 'og:url' }, url);

    const image = SITE_URL ? `${SITE_URL}${LOGO_PATH}` : null;
    setMeta({ attr: 'property', key: 'og:image' }, image);
    setMeta({ attr: 'property', key: 'og:image:width' }, image ? String(LOGO_SIZE) : null);
    setMeta({ attr: 'property', key: 'og:image:height' }, image ? String(LOGO_SIZE) : null);
    setMeta({ attr: 'property', key: 'og:image:alt' }, image ? SITE_NAME : null);

    setMeta({ attr: 'name', key: 'twitter:card' }, 'summary');
    setMeta({ attr: 'name', key: 'twitter:title' }, seo.title);
    setMeta({ attr: 'name', key: 'twitter:description' }, seo.description);
    setMeta({ attr: 'name', key: 'twitter:image' }, image);
  }, [pathname]);

  return null;
};

export default RouteSeo;
