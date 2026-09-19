import React from 'react';
import SeoMeta from '../components/SeoMeta';
import DownloaderHero from '../components/DownloaderHero';
import HowToSection from '../components/HowToSection';
import PlatformGrid from '../components/PlatformGrid';
import FaqSection from '../components/FaqSection';

export default function PinterestDownloader() {
  const howToSteps = [
    {
      title: 'Copy Pinterest Pin Link',
      text: 'Open the Pinterest app or website, locate the video pin, tap Share, and select Copy Link.',
    },
    {
      title: 'Paste into Pixvoro',
      text: 'Paste the pin.it or pinterest.com link into the downloader search field above.',
    },
    {
      title: 'Save Pinterest Video MP4',
      text: 'Pixvoro resolves the underlying HD video stream. Click Start Download to save the file.',
    },
  ];

  const pinterestFaqs = [
    {
      q: 'Does Pixvoro support shortened pin.it URLs?',
      a: 'Yes! Our backend automatically resolves shortened Pinterest links (e.g. https://pin.it/...) to the full destination pin.',
    },
    {
      q: 'Can I download Pinterest Idea Pins and animated GIFs?',
      a: 'Yes. All video pins, motion graphics, and animated clips on Pinterest are convertible to high-compatibility MP4 format.',
    },
  ];

  return (
    <>
      <SeoMeta
        title="Pinterest Video Downloader - Download Pinterest Videos & Pins in HD MP4"
        description="Free Pinterest Video Downloader online. Download video pins, Idea Pins, and GIFs from Pinterest in 1080p and 720p HD MP4. Fast, free, no login needed."
        canonicalUrl="https://pixvoro.com/pinterest-downloader"
        faqs={pinterestFaqs}
        howToSteps={howToSteps}
        platform="Pinterest"
      />

      <DownloaderHero
        title="Pinterest Downloader"
        subtitle="Save Video Pins & Creative Tutorials"
        description="Save your favorite Pinterest design ideas, DIY crafts, and recipe video pins in crystal-clear MP4 format."
        defaultPlaceholder="Paste Pinterest link here (e.g. https://pin.it/... or pinterest.com/pin/...)"
        platformContext="pinterest"
      />

      <HowToSection platformName="Pinterest Video Pins" />
      <PlatformGrid />
      <FaqSection faqs={pinterestFaqs} platformName="Pinterest Downloader" />
    </>
  );
}
