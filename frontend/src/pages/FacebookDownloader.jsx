import React from 'react';
import SeoMeta from '../components/SeoMeta';
import DownloaderHero from '../components/DownloaderHero';
import HowToSection from '../components/HowToSection';
import PlatformGrid from '../components/PlatformGrid';
import FaqSection from '../components/FaqSection';

export default function FacebookDownloader() {
  const howToSteps = [
    {
      title: 'Copy Facebook Video Link',
      text: 'On Facebook, click Share on any public video or reel, and click Copy link.',
    },
    {
      title: 'Paste into Pixvoro',
      text: 'Paste the Facebook or fb.watch link into the search bar above.',
    },
    {
      title: 'Download Full HD MP4',
      text: 'Choose HD (1080p or 720p) or SD quality and click Start Download to save.',
    },
  ];

  const facebookFaqs = [
    {
      q: 'Can I download Facebook Reels in HD?',
      a: 'Yes! Facebook Reels are fully supported. You can download vertical videos in maximum 1080p resolution with synchronized audio.',
    },
    {
      q: 'Does it support fb.watch links and Facebook Live replays?',
      a: 'Yes. Replays of completed Facebook Live streams, Watch clips, and public group videos can all be downloaded.',
    },
  ];

  return (
    <>
      <SeoMeta
        title="Facebook Video Downloader - Download FB Videos & Reels in 1080p HD"
        description="Free Facebook Video Downloader online. Download Facebook videos, Reels, and Watch clips in 1080p Full HD MP4 with audio. 100% free, fast, and no software required."
        canonicalUrl="https://pixvoro.com/facebook-downloader"
        faqs={facebookFaqs}
        howToSteps={howToSteps}
        platform="Facebook"
      />

      <DownloaderHero
        title="Facebook Downloader"
        subtitle="Save Watch Shows & Viral Reels"
        description="Download Facebook videos, viral Reels, Watch shows, and public community clips with superior clarity."
        defaultPlaceholder="Paste Facebook URL here (e.g. https://www.facebook.com/watch/?v=...)"
        platformContext="facebook"
      />

      <HowToSection platformName="Facebook Videos & Reels" />
      <PlatformGrid />
      <FaqSection faqs={facebookFaqs} platformName="Facebook Downloader" />
    </>
  );
}
