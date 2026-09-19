import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  HelpCircle, 
  FileText, 
  Shield, 
  DownloadCloud,
  ChevronLeft
} from 'lucide-react';
import { 
  YoutubeIcon, 
  InstagramIcon, 
  FacebookIcon, 
  PinterestIcon, 
  TikTokIcon 
} from './SocialIcons';

export default function Sidebar({ mobileOpen = false, setMobileOpen = () => {} }) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'YouTube', path: '/youtube-downloader', icon: YoutubeIcon },
    { name: 'Instagram', path: '/instagram-downloader', icon: InstagramIcon },
    { name: 'Pinterest', path: '/pinterest-downloader', icon: PinterestIcon },
    { name: 'Facebook', path: '/facebook-downloader', icon: FacebookIcon },
    { name: 'TikTok', path: '/tiktok-downloader', icon: TikTokIcon },
  ];

  const content = (
    <div className="w-64 p-4 flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Brand Sticker Logo */}
        <Link 
          to="/"
          className="block w-full bg-white text-black font-extrabold text-2xl tracking-tight text-center py-2.5 px-4 rounded-2xl border-[3.5px] border-black shadow-[4px_4px_0px_#000] hover:scale-105 active:scale-95 transition-all"
        >
          Pixvoro
        </Link>

        {/* Small collapse / divider indicator */}
        <div className="flex justify-center py-1">
          <div className="w-12 h-6 bg-white rounded-full border-[2.5px] border-black shadow-[2px_2px_0px_#000] flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 text-black stroke-[3]" />
          </div>
        </div>

        {/* Navigation Pills */}
        <nav className="space-y-2.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl border-[3px] border-black text-sm font-extrabold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#111111] text-white shadow-[4px_4px_0px_#000] translate-x-1'
                    : 'bg-white text-black shadow-[4px_4px_0px_#000] hover:bg-slate-50 hover:translate-x-0.5'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Secondary Links */}
      <div className="pt-4 border-t-[2.5px] border-black/20 space-y-2">
        <a
          href="#faq-section"
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/90 text-black border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-xs font-bold hover:bg-white transition-all"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Help / FAQs</span>
        </a>

        <div className="flex items-center gap-2">
          <Link
            to="/terms"
            className="flex-1 text-center py-1.5 rounded-lg bg-black/10 border-[2px] border-black text-[11px] font-bold text-black hover:bg-white transition-all"
          >
            Terms
          </Link>
          <Link
            to="/privacy"
            className="flex-1 text-center py-1.5 rounded-lg bg-black/10 border-[2px] border-black text-[11px] font-bold text-black hover:bg-white transition-all"
          >
            Privacy
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0 p-4 sticky top-4 h-[calc(100vh-2rem)]">
        <div className="neo-panel-orange h-full overflow-y-auto">
          {content}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex">
          <div className="neo-panel-orange m-4 max-w-[280px] w-full relative animate-in slide-in-from-left duration-200">
            {content}
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
