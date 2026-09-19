import React from 'react';
import SeoMeta from '../components/SeoMeta';
import PlatformGrid from '../components/PlatformGrid';

export default function HomePage() {
  return (
    <>
      <SeoMeta
        title="Pixvoro - Free Video Downloader for YouTube, Instagram, Pinterest, Facebook & TikTok"
        description="Download HD videos and MP3 audio from YouTube, Instagram, Pinterest, Facebook, and TikTok in 1080p, 4K UHD, and 320kbps MP3. 100% free, fast, and no watermark."
        canonicalUrl="https://pixvoro.com/"
        platform="Universal"
      />

      {/* Services Grid starting immediately */}
      <PlatformGrid showHeader={false} />
    </>
  );
}
