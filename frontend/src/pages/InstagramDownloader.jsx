import React from 'react';
import SeoMeta from '../components/SeoMeta';
import DownloaderHero from '../components/DownloaderHero';
import HowToSection from '../components/HowToSection';
import PlatformGrid from '../components/PlatformGrid';
import FaqSection from '../components/FaqSection';

export default function InstagramDownloader() {
  const howToSteps = [
    {
      title: 'Copy Instagram Link',
      text: 'Open the Instagram app or site, tap the Share icon on any Reel or post, and click Copy link.',
    },
    {
      title: 'Paste into Pixvoro',
      text: 'Paste the link into the search bar above. Pixvoro verifies the stream source.',
    },
    {
      title: 'Save to Camera Roll',
      text: 'Click Start Download to save the video with original audio directly to your phone or PC.',
    },
  ];

  const instaFaqs = [
    {
      q: 'Can I download Instagram Reels in full HD 1080p?',
      a: 'Yes! Pixvoro downloads Instagram Reels in their original uploaded resolution and framerate, with audio.',
    },
    {
      q: 'Do I need to log into my Instagram account?',
      a: 'No. Pixvoro operates completely anonymously without needing your login credentials.',
    },
    {
      q: 'How do I save the video to my iPhone camera roll?',
      a: 'After clicking Download on Safari, tap the download icon in Safari, open the file, tap Share, and choose "Save Video".',
    },
  ];

  return (
    <>
      <SeoMeta
        title="Instagram Video Downloader - Download Instagram Reels, Stories & Posts in HD"
        description="Free Instagram Video Downloader online. Download Instagram Reels, video posts, and stories in full HD MP4 with audio. Works on iPhone, Android, and PC."
        canonicalUrl="https://pixvoro.com/instagram-downloader"
        faqs={instaFaqs}
        howToSteps={howToSteps}
        platform="Instagram"
      />

      <DownloaderHero
        title="Instagram Downloader"
        subtitle="Save Reels, Stories & Video Posts"
        description="Save your favorite Instagram Reels and video posts in pristine HD MP4 quality. Fast, anonymous, and free."
        defaultPlaceholder="Paste Instagram link here (e.g. https://www.instagram.com/reel/...)"
        platformContext="instagram"
      />

      <HowToSection platformName="Instagram Reels & Videos" />
      <PlatformGrid />
      <FaqSection faqs={instaFaqs} platformName="Instagram Downloader" />
    </>
  );
}
