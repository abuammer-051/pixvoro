import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  Smartphone, 
  Music, 
  Infinity 
} from 'lucide-react';

export default function FeaturesGrid() {
  const features = [
    {
      icon: Infinity,
      title: '100% Free & Unlimited',
      description: 'Download as many videos, stories, and songs as you want without paywalls, subscriptions, or daily limits.',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Sparkles,
      title: 'No Watermarks or Overlays',
      description: 'Enjoy original crisp media without promotional watermarks, stamps, or degraded visual artifacts.',
      gradient: 'from-cyan-500 to-teal-500',
    },
    {
      icon: Zap,
      title: 'Ultra-High Speed Processing',
      description: 'Powered by yt-dlp 2026 engine and multi-threaded streams for instantaneous conversion and fast downloads.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Music,
      title: 'HQ MP3 Audio Extraction',
      description: 'Convert any video directly to 320kbps MP3 audio with crystal clear highs and punchy basslines.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Smartphone,
      title: 'Cross-Device Compatible',
      description: 'Works seamlessly on iPhones, iPads, Android smartphones, Windows PCs, Chromebooks, and Macs.',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      icon: ShieldCheck,
      title: 'Private & Secure Delivery',
      description: 'Zero personal data stored. Temporary processing buffers are wiped immediately after your file download finishes.',
      gradient: 'from-indigo-500 to-cyan-500',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          Why Choose Pixvoro Pro
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 font-heading">
          Engineered for Speed, Quality & Privacy
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Experience the most advanced web-based media downloader without intrusive ads, malware, or slowdowns.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div 
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-[#0D1322]/80 border border-white/10 glass-panel-hover"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                <Icon className="w-6 h-6 text-white stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
