import React from 'react';
import { Gauge, Check, Shield, Cpu, Zap, Radio } from 'lucide-react';

export default function QualitySection() {
  const highlights = [
    {
      icon: Gauge,
      title: 'Ultra HD 4K & 1080p 60fps',
      desc: 'Preserve exact cinematic frame rates and colors with native MP4 encoding up to 3840x2160.',
    },
    {
      icon: Radio,
      title: '320kbps Studio Audio',
      desc: 'Extract pristine sound tracks, vocals, podcasts, and music clips with lossless audio conversion.',
    },
    {
      icon: Cpu,
      title: 'Real-Time FFmpeg Merging',
      desc: 'High-speed multi-threaded stream muxing seamlessly combines separate video and audio tracks.',
    },
    {
      icon: Zap,
      title: 'Instant CDN Delivery',
      desc: 'Zero queue waits. Downloads stream straight to your device at your maximum internet bandwidth.',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          Uncompromised Fidelity
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 font-heading">
          Ultra HD Video Quality & Fast Conversion
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Our advanced server pipeline handles complex SABR and DASH streams with automated FFmpeg audio-video merging for maximum clarity.
        </p>
      </div>

      {/* Horizontal Section Image (imagegen-frontend-web format) */}
      <div className="max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-950/30 group">
        <img 
          src="/images/quality_speed_banner.jpg" 
          alt="Ultra HD video quality and high-bitrate MP3 conversion banner"
          className="w-full h-auto object-cover max-h-[380px] group-hover:scale-[1.01] transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Quality Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-[#0D1322]/80 border border-white/10 glass-panel-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
