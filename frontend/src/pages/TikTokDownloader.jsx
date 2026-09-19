import React from 'react';
import SeoMeta from '../components/SeoMeta';
import DownloaderHero from '../components/DownloaderHero';
import HowToSection from '../components/HowToSection';
import PlatformGrid from '../components/PlatformGrid';
import FaqSection from '../components/FaqSection';

export default function TikTokDownloader() {
  const howToSteps = [
    {
      title: 'Copy TikTok Link',
      text: 'Open the TikTok app, tap Share on the video, and choose Copy Link.',
    },
    {
      title: 'Paste into Pixvoro',
      text: 'Paste the copied TikTok URL into the search bar above.',
    },
    {
      title: 'Download Without Watermark',
      text: 'Click Start Download to save the clean MP4 video without any watermark.',
    },
  ];

  const tiktokFaqs = [
    {
      q: 'Does Pixvoro remove the TikTok watermark?',
      a: 'Yes! Our backend fetches the raw un-watermarked source video directly so you get a completely clean MP4 file without logos.',
    },
    {
      q: 'Can I extract the audio or sound from a TikTok video?',
      a: 'Yes. Switch to the Audio tab to download just the trending TikTok sound or song in 320kbps MP3 format.',
    },
  ];

  return (
    <>
      <SeoMeta
        title="TikTok Video Downloader - Download TikTok Without Watermark in HD MP4"
        description="Free TikTok Video Downloader without watermark. Download TikTok videos in HD MP4 and convert TikTok sounds to 320kbps MP3. Fast, free, no watermark."
        canonicalUrl="https://pixvoro.com/tiktok-downloader"
        faqs={tiktokFaqs}
        howToSteps={howToSteps}
        platform="TikTok"
      />

      <DownloaderHero
        title="TikTok Downloader"
        subtitle="Download Videos Without Watermark"
        description="Download your favorite TikTok videos in clean, full HD MP4 without the bouncing watermark overlay."
        defaultPlaceholder="Paste TikTok link here (e.g. https://www.tiktok.com/@... or vt.tiktok.com/...)"
        platformContext="tiktok"
      />

      <HowToSection platformName="TikTok Videos" />
      <PlatformGrid />
      <FaqSection faqs={tiktokFaqs} platformName="TikTok Downloader" />
    </>
  );
}
