import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import YouTubeDownloader from './pages/YouTubeDownloader';
import InstagramDownloader from './pages/InstagramDownloader';
import PinterestDownloader from './pages/PinterestDownloader';
import FacebookDownloader from './pages/FacebookDownloader';
import TikTokDownloader from './pages/TikTokDownloader';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <ScrollToTop />
      
      {/* Left Orange Sidebar (matching reference image) */}
      <Sidebar 
        mobileOpen={mobileMenuOpen} 
        setMobileOpen={setMobileMenuOpen} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onToggleMobileMenu={() => setMobileMenuOpen(true)} />
        
        <main className="flex-grow px-2 sm:px-4 py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/youtube-downloader" element={<YouTubeDownloader />} />
            <Route path="/instagram-downloader" element={<InstagramDownloader />} />
            <Route path="/pinterest-downloader" element={<PinterestDownloader />} />
            <Route path="/facebook-downloader" element={<FacebookDownloader />} />
            <Route path="/tiktok-downloader" element={<TikTokDownloader />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}
