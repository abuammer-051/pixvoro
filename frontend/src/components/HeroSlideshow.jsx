import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Sparkles, Film, Music } from 'lucide-react';

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/images/hero_slide_1.jpg',
      badge: '✦ High-Definition Media Archiving',
      badgeColor: 'bg-[#FF8038] text-black',
      title: 'Save The Moments That Inspire You',
      subtitle: 'Download aesthetic Pinterest pins, Instagram reels, and YouTube videos in original 4K UHD & 320kbps MP3 sound.',
      tag1: '1080p & 4K Quality',
      tag2: '320kbps Studio Audio',
      actionText: 'Choose Platform ↓',
    },
    {
      id: 2,
      image: '/images/hero_slide_2.jpg',
      badge: '✦ Universal Multi-Platform Engine',
      badgeColor: 'bg-[#00A843] text-white',
      title: 'Your Personal Creative Vault, Offline',
      subtitle: 'Preserve travel clips, creative DIY crafts, speeches, and viral shorts with zero watermarks or lossy compression.',
      tag1: 'No Watermarks',
      tag2: '100% Free & Unlimited',
      actionText: 'Select Platform ↓',
    },
  ];

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const scrollToPlatforms = (e) => {
    e.preventDefault();
    const el = document.getElementById('platforms-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-2 pb-6">
      <div className="relative neo-card overflow-hidden min-h-[380px] sm:min-h-[440px] flex items-end">
        
        {/* Slide Background Images */}
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
              />
              {/* Rich legible overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />
            </div>
          );
        })}

        {/* Content Container (Layered above background) */}
        <div className="relative z-20 w-full p-6 sm:p-10 text-white flex flex-col justify-end">
          
          {/* Top Pill Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-xs font-black tracking-wide ${slides[currentSlide].badgeColor}`}>
              {slides[currentSlide].badge}
            </span>
          </div>

          {/* Slide Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight text-white leading-tight drop-shadow-[2px_2px_0px_#000]">
            {slides[currentSlide].title}
          </h1>

          {/* Subtitle */}
          <p className="mt-2 text-xs sm:text-sm md:text-base font-bold text-slate-200 max-w-2xl leading-relaxed drop-shadow-[1px_1px_0px_#000]">
            {slides[currentSlide].subtitle}
          </p>

          {/* Quick Feature Badges & Action Link */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/20">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white text-black border-[2px] border-black text-xs font-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-black" />
                {slides[currentSlide].tag1}
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-black border-[2px] border-black text-xs font-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-black" />
                {slides[currentSlide].tag2}
              </span>
            </div>

            <a
              href="#platforms-grid"
              onClick={scrollToPlatforms}
              className="neo-btn-green px-5 py-2 text-xs sm:text-sm font-black inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{slides[currentSlide].actionText}</span>
            </a>
          </div>

        </div>

        {/* Slideshow Arrow Controls */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="neo-btn-white w-9 h-9 flex items-center justify-center border-[2.5px] border-black shadow-[2.5px_2.5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-black stroke-[3]" />
          </button>
          <button
            onClick={handleNext}
            className="neo-btn-white w-9 h-9 flex items-center justify-center border-[2.5px] border-black shadow-[2.5px_2.5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-black stroke-[3]" />
          </button>
        </div>

        {/* Slide Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full border-[1.5px] border-black transition-all ${
                idx === currentSlide 
                  ? 'w-7 bg-[#FF8038] shadow-[1px_1px_0px_#000]' 
                  : 'w-2.5 bg-white/70 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
