import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PlatformLogoBadge } from './SocialIcons';

export default function PlatformGrid({ showHeader = true, title = "Supported Platforms", subtitle = "Dedicated high-speed extractors for all popular content networks." }) {
  const platforms = [
    {
      name: 'YouTube Downloader',
      path: '/youtube-downloader',
      platform: 'youtube',
      badge: '4K & 1080p MP4 / MP3',
      description: 'Download standard YouTube videos, Shorts, and 320kbps MP3 audio.',
    },
    {
      name: 'Instagram Downloader',
      path: '/instagram-downloader',
      platform: 'instagram',
      badge: 'Reels & Stories',
      description: 'Save Instagram Reels, IGTV clips, and carousel video posts in full HD.',
    },
    {
      name: 'Pinterest Downloader',
      path: '/pinterest-downloader',
      platform: 'pinterest',
      badge: 'Pins & Idea Pins',
      description: 'Save creative inspiration, DIY tutorials, and animated GIFs from Pinterest.',
    },
    {
      name: 'Facebook Downloader',
      path: '/facebook-downloader',
      platform: 'facebook',
      badge: 'Watch & Reels',
      description: 'Download Facebook Watch clips, viral reels, and public videos in HD.',
    },
    {
      name: 'TikTok Downloader',
      path: '/tiktok-downloader',
      platform: 'tiktok',
      badge: 'No Watermark',
      description: 'Download trending TikTok videos without the bouncing watermark overlay.',
    },
  ];

  return (
    <section id="platforms-grid" className={`w-full max-w-5xl mx-auto px-4 sm:px-6 ${showHeader ? 'py-12' : 'py-6 sm:py-8'}`}>
      {showHeader && (
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-wide drop-shadow-[2px_2px_0px_#000]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm font-bold text-[#EAD5C8] mt-1.5">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {platforms.map((p) => (
          <Link
            key={p.name}
            to={p.path}
            className="neo-card p-5 flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <PlatformLogoBadge platform={p.platform} size="normal" />
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 border-[2px] border-black">
                  {p.badge}
                </span>
              </div>

              <h3 className="font-extrabold text-lg text-black font-heading group-hover:text-[#FF8038] transition-colors">
                {p.name}
              </h3>
              
              <p className="text-xs font-semibold text-slate-600 mt-1.5 leading-relaxed">
                {p.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t-[2px] border-slate-100 flex items-center justify-between text-xs font-black text-black">
              <span>Open Tool</span>
              <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
