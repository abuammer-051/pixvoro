import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 text-center">
      <div className="neo-card p-6 sm:p-8 space-y-5">
        
        {/* Brand & Platform Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link to="/" className="neo-btn-white px-3 py-1 text-xs font-black">All-in-One</Link>
          <Link to="/youtube-downloader" className="neo-btn-white px-3 py-1 text-xs font-black">YouTube</Link>
          <Link to="/instagram-downloader" className="neo-btn-white px-3 py-1 text-xs font-black">Instagram</Link>
          <Link to="/pinterest-downloader" className="neo-btn-white px-3 py-1 text-xs font-black">Pinterest</Link>
          <Link to="/facebook-downloader" className="neo-btn-white px-3 py-1 text-xs font-black">Facebook</Link>
          <Link to="/tiktok-downloader" className="neo-btn-white px-3 py-1 text-xs font-black">TikTok</Link>
        </div>

        {/* Legal Disclaimer */}
        <p className="text-[11px] font-semibold text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Pixvoro is an independent media utility and is not affiliated with Google, YouTube, Meta, Instagram, Facebook, Pinterest, or ByteDance TikTok. All trademarks belong to their respective owners. Content downloaded is for personal offline fair use only.
        </p>

        {/* Bottom Bar */}
        <div className="pt-4 border-t-[2px] border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-black">
          <span>© {currentYear} Pixvoro. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
