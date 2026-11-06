import type { Plugin } from 'vite';
import { loadEnv } from 'vite';
import {
  LOGO_PATH,
  LOGO_SIZE,
  SITE_ALT_NAME,
  SITE_LOCALE,
  SITE_NAME,
  noindexPrefixes,
  publicRoutes,
} from './src/seo/routes.ts';

/**
 * Build-time SEO for a client-rendered React app.
 *
 * Crawlers and link-preview bots (WhatsApp, Telegram, Instagram, X, ...) often
 * do not run JavaScript, so a single index.html with one title for every URL
 * is a big SEO handicap. This plugin:
 *   1. injects title / description / canonical / Open Graph / Twitter /
 *      JSON-LD into index.html (between the `seo:start` / `seo:end` markers),
 *   2. emits one static copy of index.html per public route
 *      (e.g. dist/about/index.html) with that route's own tags,
 *   3. emits sitemap.xml and robots.txt.
 *
 * Configuration (frontend/.env or CI env vars):
 *   VITE_SITE_URL         required for canonical/OG URLs and the sitemap
 *   VITE_BUSINESS_PHONE   optional, e.g. +982112345678
 *   VITE_BUSINESS_EMAIL   optional
 *   VITE_BUSINESS_STREET  optional street address
 *   VITE_BUSINESS_CITY    optional, e.g. تهران
 */

interface SiteEnv {
  siteUrl: string;
  phone: string;
  email: string;
  street: string;
  city: string;
}

interface HeadRoute {
  path: string;
  title: string;
  description: string;
}

const BLOCK_RE = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/;

const esc = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function buildJsonLd(env: SiteEnv, description: string): string {
  const base = env.siteUrl;

  const organization: Record<string, unknown> = {
    '@type': ['ChildCare', 'Preschool'],
    name: SITE_NAME,
    alternateName: SITE_ALT_NAME,
    description,
    inLanguage: 'fa-IR',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '07:00',
        closes: '18:00',
      },
    ],
  };

  if (base) {
    organization['@id'] = `${base}/#organization`;
    organization.url = `${base}/`;
    organization.logo = {
      '@type': 'ImageObject',
      url: `${base}${LOGO_PATH}`,
      width: LOGO_SIZE,
      height: LOGO_SIZE,
    };
    organization.image = `${base}${LOGO_PATH}`;
  }
  if (env.phone) organization.telephone = env.phone;
  if (env.email) organization.email = env.email;
  if (env.street || env.city) {
    organization.address = {
      '@type': 'PostalAddress',
      ...(env.street ? { streetAddress: env.street } : {}),
      ...(env.city ? { addressLocality: env.city } : {}),
      addressCountry: 'IR',
    };
  }

  const graph: Record<string, unknown>[] = [organization];
  if (base) {
    graph.push({
      '@type': 'WebSite',
      '@id': `${base}/#website`,
      url: `${base}/`,
      name: SITE_NAME,
      alternateName: SITE_ALT_NAME,
      inLanguage: 'fa-IR',
      publisher: { '@id': `${base}/#organization` },
    });
  }

  // Escape "<" so the JSON can never close the <script> tag early.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
    /</g,
    '\\u003c',
  );
}

function renderHead(route: HeadRoute, env: SiteEnv): string {
  const base = env.siteUrl;
  const url = base ? `${base}${route.path === '/' ? '/' : route.path}` : '';
  const image = base ? `${base}${LOGO_PATH}` : '';
  const title = esc(route.title);
  const description = esc(route.description);

  const lines = [
    '<!-- seo:start -->',
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
  ];
  if (url) lines.push(`<link rel="canonical" href="${esc(url)}" />`);
  lines.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="${SITE_LOCALE}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
  );
  if (url) lines.push(`<meta property="og:url" content="${esc(url)}" />`);
  if (image) {
    lines.push(
      `<meta property="og:image" content="${esc(image)}" />`,
      `<meta property="og:image:width" content="${LOGO_SIZE}" />`,
      `<meta property="og:image:height" content="${LOGO_SIZE}" />`,
      `<meta property="og:image:alt" content="${esc(SITE_NAME)}" />`,
    );
  }
  lines.push(
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
  );
  if (image) lines.push(`<meta name="twitter:image" content="${esc(image)}" />`);
  lines.push(
    `<script type="application/ld+json">${buildJsonLd(env, publicRoutes[0].description)}</script>`,
    '<!-- seo:end -->',
  );
  return lines.join('\n    ');
}

function buildSitemap(env: SiteEnv): string {
  const urls = publicRoutes
    .map((r) => `  <url><loc>${esc(`${env.siteUrl}${r.path === '/' ? '/' : r.path}`)}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobots(env: SiteEnv): string {
  const lines = ['User-agent: *', 'Allow: /'];
  for (const prefix of noindexPrefixes) lines.push(`Disallow: ${prefix}`);
  if (env.siteUrl) lines.push('', `Sitemap: ${env.siteUrl}/sitemap.xml`);
  return `${lines.join('\n')}\n`;
}

export default function seoPlugin(): Plugin {
  let env: SiteEnv = { siteUrl: '', phone: '', email: '', street: '', city: '' };
  let isBuild = false;

  return {
    name: 'hediyeh-seo',
    enforce: 'post',

    configResolved(config) {
      isBuild = config.command === 'build';
      const e = loadEnv(config.mode, config.envDir || config.root, 'VITE_');
      env = {
        siteUrl: (e.VITE_SITE_URL ?? '').trim().replace(/\/+$/, ''),
        phone: (e.VITE_BUSINESS_PHONE ?? '').trim(),
        email: (e.VITE_BUSINESS_EMAIL ?? '').trim(),
        street: (e.VITE_BUSINESS_STREET ?? '').trim(),
        city: (e.VITE_BUSINESS_CITY ?? '').trim(),
      };
      if (isBuild && !env.siteUrl) {
        config.logger.warn(
          '\n[seo] VITE_SITE_URL is not set. Canonical URLs, Open Graph image/URL and sitemap.xml ' +
            'were skipped. Set it to your real domain (e.g. https://example.ir) and rebuild.\n',
        );
      }
    },

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(BLOCK_RE, () => renderHead(publicRoutes[0], env));
      },
    },

    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        if (!isBuild) return;

        const indexAsset = bundle['index.html'];
        if (indexAsset && indexAsset.type === 'asset') {
          const html = String(indexAsset.source);
          for (const route of publicRoutes) {
            if (route.path === '/') continue;
            this.emitFile({
              type: 'asset',
              fileName: `${route.path.slice(1)}/index.html`,
              source: html.replace(BLOCK_RE, () => renderHead(route, env)),
            });
          }
        } else {
          this.warn('[seo] index.html not found in the bundle; per-route HTML was not generated.');
        }

        if (env.siteUrl) {
          this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap(env) });
        }
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobots(env) });
      },
    },
  };
}
