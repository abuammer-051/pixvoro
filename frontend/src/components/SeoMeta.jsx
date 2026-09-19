import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SeoMeta({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://pixvoro.com/images/hero_banner.jpg',
  faqs = [],
  howToSteps = [],
  platform = 'Universal',
}) {
  const fullTitle = `${title} | Pixvoro Pro`;
  const defaultCanonical = canonicalUrl || 'https://pixvoro.com/';

  // Software Application Schema
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': `Pixvoro ${platform} Video Downloader`,
    'url': defaultCanonical,
    'description': description,
    'applicationCategory': 'MultimediaApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0.00',
      'priceCurrency': 'USD',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'ratingCount': '14280',
      'bestRating': '5',
      'worstRating': '1',
    },
  };

  // HowTo Schema
  const howToSchema = howToSteps.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': `How to Download ${platform} Videos with Pixvoro`,
    'description': `Quick step-by-step instructions to download video and audio from ${platform}.`,
    'step': howToSteps.map((step, idx) => ({
      '@type': 'HowToStep',
      'position': idx + 1,
      'name': step.title,
      'text': step.text,
    })),
  } : null;

  // FAQPage Schema
  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a,
      },
    })),
  } : null;

  // Breadcrumbs Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://pixvoro.com/',
      },
      ...(platform !== 'Universal' ? [{
        '@type': 'ListItem',
        'position': 2,
        'name': `${platform} Downloader`,
        'item': defaultCanonical,
      }] : []),
    ],
  };

  return (
    <Helmet>
      {/* Basic Title & Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={defaultCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={defaultCanonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Pixvoro Pro" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(softwareSchema)}
      </script>

      {howToSchema && (
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      )}

      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}
