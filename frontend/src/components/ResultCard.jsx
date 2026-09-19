import React, { useState } from 'react';
import { 
  Film, 
  Music, 
  Download, 
  Loader2, 
  Clock, 
  User, 
  X,
  CheckCircle2
} from 'lucide-react';
import { triggerDownload } from '../services/api';

export default function ResultCard({ videoData, onClear }) {
  const [activeTab, setActiveTab] = useState('video'); // 'video' | 'audio'
  const [downloadingFormatId, setDownloadingFormatId] = useState(null);

  if (!videoData) return null;

  const handleDownload = (format) => {
    setDownloadingFormatId(format.id);
    try {
      triggerDownload(
        videoData.original_url, 
        format.id, 
        format.is_audio, 
        `${videoData.title}.${format.ext}`
      );
      setTimeout(() => {
        setDownloadingFormatId(null);
      }, 4000);
    } catch (err) {
      console.error('Download error:', err);
      setDownloadingFormatId(null);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t-[3px] border-black text-left animate-in fade-in">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="neo-btn-white px-3 py-1 text-xs font-black uppercase inline-flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Ready to Save
        </span>
        <button
          onClick={onClear}
          className="neo-btn-white px-3 py-1 text-xs font-bold inline-flex items-center gap-1 text-slate-700 hover:text-black"
        >
          <X className="w-3.5 h-3.5 stroke-[3]" /> Clear
        </button>
      </div>

      {/* Video Details Box */}
      <div className="flex flex-col sm:flex-row gap-5 items-start mb-6 p-4 rounded-2xl bg-slate-50 border-[3px] border-black shadow-[4px_4px_0px_#000]">
        
        {/* Thumbnail */}
        <div className="w-full sm:w-52 aspect-video rounded-xl overflow-hidden border-[2.5px] border-black shadow-[3px_3px_0px_#000] flex-shrink-0 bg-black relative">
          {videoData.thumbnail ? (
            <img 
              src={videoData.thumbnail} 
              alt={videoData.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <Film className="w-8 h-8" />
            </div>
          )}
          {videoData.duration_str && (
            <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-black border border-white">
              {videoData.duration_str}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-extrabold text-base sm:text-lg text-black line-clamp-2 leading-tight">
            {videoData.title}
          </h3>
          <div className="flex items-center gap-3 mt-2 text-xs font-bold text-slate-600">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-black" /> {videoData.uploader}
            </span>
            {videoData.duration_str && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-black" /> {videoData.duration_str}
              </span>
            )}
          </div>

          {/* Video / Audio Switcher Pills */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3.5 py-1.5 rounded-full border-[2.5px] border-black text-xs font-black transition-all ${
                activeTab === 'video'
                  ? 'bg-black text-white shadow-[3px_3px_0px_#000]'
                  : 'bg-white text-black hover:bg-slate-100 shadow-[2px_2px_0px_#000]'
              }`}
            >
              Video (MP4)
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`px-3.5 py-1.5 rounded-full border-[2.5px] border-black text-xs font-black transition-all ${
                activeTab === 'audio'
                  ? 'bg-black text-white shadow-[3px_3px_0px_#000]'
                  : 'bg-white text-black hover:bg-slate-100 shadow-[2px_2px_0px_#000]'
              }`}
            >
              Audio (MP3)
            </button>
          </div>
        </div>
      </div>

      {/* Formats Grid */}
      <div className="space-y-2.5">
        <p className="text-xs font-black uppercase tracking-wider text-black">
          Select Output Format:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(activeTab === 'video' ? videoData.video_options : videoData.audio_options)?.map((format) => {
            const isDownloading = downloadingFormatId === format.id;
            return (
              <div
                key={format.id}
                className="p-3.5 rounded-2xl bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000] flex items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-black">{format.label}</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-slate-100 border border-black">
                      {format.badge}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 mt-0.5 block">
                    {format.ext.toUpperCase()} • {format.approx_size || 'Auto Size'}
                  </span>
                </div>

                <button
                  onClick={() => handleDownload(format)}
                  disabled={isDownloading}
                  className="neo-btn-green px-4 py-2 text-xs font-black flex items-center gap-1.5 flex-shrink-0"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
