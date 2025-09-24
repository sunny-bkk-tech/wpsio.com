import { useEffect } from 'react';

interface JsonLdObject {
  [key: string]: unknown;
}

interface UseSEOOptions {
  title?: string;
  description?: string;
  /** Absolute canonical URL. If omitted, computed from baseUrl + location.pathname */
  canonical?: string;
  /** e.g., "index,follow" or "noindex,nofollow" */
  robots?: string;
  /** Absolute page URL. If omitted, derived from canonical */
  url?: string;
  /** Site brand name for social tags */
  siteName?: string;
  /** Locale like en_US, zh_TW */
  locale?: string;
  /** og:type, defaults to website */
  ogType?: string;
  /** Social share image absolute URL */
  image?: string;
  /** twitter:card value, defaults to summary_large_image if image provided else summary */
  twitterCard?: 'summary' | 'summary_large_image';
  /** Structured data objects to embed as application/ld+json */
  jsonLd?: JsonLdObject | JsonLdObject[];
  /** Base origin to compute canonical when not provided */
  baseUrl?: string;
}

function upsertMetaByName(name: string, content: string | undefined) {
  if (!content) return;
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertMetaByProperty(property: string, content: string | undefined) {
  if (!content) return;
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLinkRel(rel: string, href: string | undefined) {
  if (!href) return;
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeExistingJsonLdMarkers() {
  const nodes = document.querySelectorAll('script[data-managed-by="useSEO"][type="application/ld+json"]');
  nodes.forEach((n) => n.parentElement?.removeChild(n));
}

function injectJsonLd(data: JsonLdObject | JsonLdObject[] | undefined) {
  if (!data) return;
  const items = Array.isArray(data) ? data : [data];
  items.forEach((obj) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-managed-by', 'useSEO');
    script.text = JSON.stringify(obj);
    document.head.appendChild(script);
  });
}

export function useSEO(options: UseSEOOptions) {
  const {
    title,
    description,
    canonical,
    robots,
    url,
    siteName = 'WPS-IO Office',
    locale,
    ogType = 'website',
    image,
    twitterCard,
    jsonLd,
    baseUrl = 'https://www.wpsio.com',
  } = options;

  useEffect(() => {
    // Title and description
    if (title) {
      document.title = title;
    }
    upsertMetaByName('description', description);

    // Robots
    upsertMetaByName('robots', robots);

    // Canonical and URL
    const computedCanonical = canonical || (typeof window !== 'undefined' ? `${baseUrl}${window.location.pathname}` : undefined);
    upsertLinkRel('canonical', computedCanonical);
    const pageUrl = url || computedCanonical;

    // Open Graph
    upsertMetaByProperty('og:title', title);
    upsertMetaByProperty('og:description', description);
    upsertMetaByProperty('og:type', ogType);
    upsertMetaByProperty('og:url', pageUrl);
    upsertMetaByProperty('og:site_name', siteName);
    upsertMetaByProperty('og:image', image);
    if (locale) upsertMetaByProperty('og:locale', locale);

    // Twitter
    const resolvedTwitterCard = twitterCard || (image ? 'summary_large_image' : 'summary');
    upsertMetaByName('twitter:card', resolvedTwitterCard);
    upsertMetaByName('twitter:title', title);
    upsertMetaByName('twitter:description', description);
    upsertMetaByName('twitter:image', image);
    upsertMetaByName('twitter:url', pageUrl);

    // JSON-LD (clear previously managed and re-inject)
    removeExistingJsonLdMarkers();
    injectJsonLd(jsonLd);
  }, [
    title,
    description,
    canonical,
    robots,
    url,
    siteName,
    locale,
    ogType,
    image,
    twitterCard,
    JSON.stringify(jsonLd),
    baseUrl,
  ]);
}


