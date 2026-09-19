import React from 'react';
import SeoMeta from '../components/SeoMeta';
import DownloaderHero from '../components/DownloaderHero';
import HowToSection from '../components/HowToSection';
import PlatformGrid from '../components/PlatformGrid';
import FaqSection from '../components/FaqSection';

export default function YouTubeDownloader() {
  const howToSteps = [
    {
      title: 'Copy YouTube Video Link',
      text: 'Open YouTube, go to any video or Short, click Share and Copy link.',
    },
    {
      title: 'Paste YouTube URL',
      text: 'Paste your YouTube link into the search bar above. Pixvoro parses all resolutions.',
    },
    {
      title: 'Save MP4 or MP3',
      text: 'Choose 4K, 1080p Full HD (with merged sound), 720p, or 320kbps MP3 and click Start Download.',
    },
  ];

  const youtubeFaqs = [
    {
      q: 'Can I download YouTube Shorts in HD?',
      a: 'Yes! Simply copy the link of any YouTube Short and paste it above to download the vertical video in full 1080p HD with sound.',
    },
    {
      q: 'Do 1080p and 4K YouTube videos include sound?',
      a: 'Yes! YouTube serves video and audio on separate streams. Pixvoro merges both streams into a single MP4 file automatically.',
    },
    {
      q: 'Can I convert YouTube videos to 320kbps MP3 audio?',
      a: 'Yes, select the Audio tab on the result card to download crystal-clear 320kbps MP3 audio directly.',
    },
  ];

  return (
    <>
      <SeoMeta
        title="YouTube Video Downloader - 1080p, 4K & MP3 Converter Online"
        description="Free YouTube Video Downloader. Download YouTube videos, Shorts, and convert to 320kbps MP3 in full 1080p and 4K HD with audio. Fast, free, no software required."
        canonicalUrl="https://pixvoro.com/youtube-downloader"
        faqs={youtubeFaqs}
        howToSteps={howToSteps}
        platform="YouTube"
      />

      <DownloaderHero
        title="YouTube Downloader"
        subtitle="Save Videos, Shorts & 320kbps MP3s"
        description="Download YouTube videos and Shorts in 1080p Full HD with synchronized sound and 4K UHD."
        defaultPlaceholder="Paste YouTube URL here (e.g. https://www.youtube.com/watch?v=... or /shorts/...)"
        platformContext="youtube"
      />

      <HowToSection platformName="YouTube Videos & Shorts" />
      <PlatformGrid />
      <FaqSection faqs={youtubeFaqs} platformName="YouTube Downloader" />
    </>
  );
}
