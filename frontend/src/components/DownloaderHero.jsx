import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clipboard, 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  Check,
  ChevronLeft
} from 'lucide-react';
import { PlatformLogoBadge } from './SocialIcons';
import { fetchVideoInfo } from '../services/api';
import ResultCard from './ResultCard';

export default function DownloaderHero({
  title = "Universal Video Downloader",
  subtitle = "Download now!",
  description = "High-speed media extraction for YouTube, Instagram, Pinterest, Facebook & TikTok.",
  defaultPlaceholder = "Paste video link here...",
  platformContext = "universal",
}) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [pasted, setPasted] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setPasted(true);
        setTimeout(() => setPasted(false), 2000);
      }
    } catch (err) {
      console.warn('Clipboard read failed:', err);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const cleanUrl = url.trim();
    if (!cleanUrl) {
      setError('Please enter or paste a valid video URL first.');
      return;
    }

    setLoading(true);
    setError('');
    setVideoData(null);

    try {
      const data = await fetchVideoInfo(cleanUrl);
      setVideoData(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to fetch video. Please verify the URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="downloader-box" className="py-6 px-4 sm:px-6 w-full max-w-4xl mx-auto">
      
      {/* Back button pill matching screenshot */}
      <div className="mb-4">
        <Link
          to="/"
          className="neo-btn-white inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-black tracking-wide"
        >
          <ChevronLeft className="w-4 h-4 stroke-[3]" />
          <span>Back to all</span>
        </Link>
      </div>

      {/* Main Chunky White Card (Matching Reference Screenshot) */}
      <div className="neo-card p-6 sm:p-10 text-center relative overflow-hidden">
        
        {/* Centered Platform Logo Badge (The exact icon requested by the user!) */}
        <div className="flex justify-center mb-5">
          <PlatformLogoBadge platform={platformContext} size="large" />
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-black font-heading tracking-tight">
          {title}
        </h1>
        <p className="text-sm font-bold text-slate-600 mt-1 mb-6">
          {subtitle}
        </p>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex items-center">
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              placeholder={defaultPlaceholder}
              disabled={loading}
              className="neo-input w-full pr-24 pl-5 py-3.5 text-sm sm:text-base font-bold text-black placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-2.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border-[2px] border-black text-xs font-extrabold text-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              {pasted ? (
                <span className="flex items-center gap-1 text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Pasted
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Clipboard className="w-3.5 h-3.5 stroke-[2.5]" /> Paste
                </span>
              )}
            </button>
          </div>

          {/* Big Green Action Button matching reference screenshot */}
          <button
            type="submit"
            disabled={loading}
            className="neo-btn-green w-full py-3.5 sm:py-4 text-base sm:text-lg font-black tracking-wide flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing Stream...</span>
              </>
            ) : (
              <>
                <span>Start Download</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </>
            )}
          </button>
        </form>

        {/* Error Alert */}
        {error && (
          <div className="mt-5 p-3.5 rounded-xl bg-red-100 border-[2.5px] border-red-600 text-red-800 text-xs sm:text-sm font-bold flex items-center gap-2.5 text-left animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Video Result Card */}
        {videoData && (
          <ResultCard
            videoData={videoData}
            onClear={() => setVideoData(null)}
          />
        )}
      </div>
    </section>
  );
}
