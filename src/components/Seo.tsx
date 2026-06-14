import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://treelands.happytechnovation.com';
const DEFAULT_IMAGE = `${SITE_URL}/resources/media/forest-hero.jpg`;
const BRAND = 'Treelands Foundation';

/** Per-page SEO: sets a unique <title>, description, canonical and OG/Twitter tags. */
export function Seo({
  title,
  description,
  image = DEFAULT_IMAGE,
}: {
  title: string;
  description: string;
  image?: string;
}) {
  const { pathname } = useLocation();
  const url = `${SITE_URL}${pathname}`;
  const fullTitle = pathname === '/' ? title : `${title} | ${BRAND}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
