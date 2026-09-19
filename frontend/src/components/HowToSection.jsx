import React from 'react';
import { Copy, Sparkles, DownloadCloud } from 'lucide-react';

export default function HowToSection({ platformName = "Any Video" }) {
  const steps = [
    {
      step: '1',
      title: 'Copy Video Link',
      desc: `Open ${platformName} app or site, find the video or reel, and copy its link from the Share button.`,
      badgeBg: 'bg-black text-white',
    },
    {
      step: '2',
      title: 'Paste in Search Bar',
      desc: 'Paste the copied URL into the Pixvoro input bar above. The engine parses all video formats.',
      badgeBg: 'bg-[#FF8038] text-black',
    },
    {
      step: '3',
      title: 'Download MP4 or MP3',
      desc: 'Pick your preferred quality (1080p, 720p, 4K, or 320kbps MP3) and click "Start Download" to save.',
      badgeBg: 'bg-[#00A843] text-white',
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-wide drop-shadow-[2px_2px_0px_#000]">
          How It Works & Supported Platforms
        </h2>
        <p className="text-xs sm:text-sm font-bold text-[#EAD5C8] mt-1.5">
          Fast 3-step download process. No account or software installation required.
        </p>
      </div>

      {/* 3 Step Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {steps.map((item) => (
          <div
            key={item.step}
            className="neo-card p-6 relative flex flex-col justify-between"
          >
            {/* Number badge sticker */}
            <div className={`w-10 h-10 rounded-full border-[3px] border-black shadow-[2px_2px_0px_#000] font-heading font-black text-lg flex items-center justify-center mb-4 ${item.badgeBg}`}>
              {item.step}
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-black mb-1.5 font-heading">
                {item.title}
              </h3>
              <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
