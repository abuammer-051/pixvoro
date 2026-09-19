import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection({ faqs = [], platformName = "Pixvoro" }) {
  const [openIndex, setOpenIndex] = useState(0);

  const defaultFaqs = [
    {
      q: `Is ${platformName} completely free to use?`,
      a: 'Yes! Pixvoro is 100% free with no charges, accounts, or daily quotas. You can download as many videos and songs as you want.',
    },
    {
      q: 'Do 1080p and 4K YouTube downloads have sound?',
      a: 'Yes! YouTube serves high-res video and audio separately. Pixvoro automatically merges the video and audio streams using FFmpeg into a single high-quality MP4 file.',
    },
    {
      q: 'Where are downloaded files saved on my device?',
      a: 'On PC and Mac, files go into your Downloads folder. On iPhone/iPad, files are saved in the Files app / Safari Downloads and can be saved to your Camera Roll. On Android, files appear in your Downloads folder and Gallery.',
    },
    {
      q: 'Can I convert videos to MP3 audio?',
      a: 'Yes. Switch to the Audio tab on the result card to save in studio-grade 320kbps or standard 128kbps MP3 format.',
    },
    {
      q: 'Are any personal logs or download copies stored?',
      a: 'No. Pixvoro operates with a zero-logs policy. All temporary processing buffers are purged immediately after the file transfer completes.',
    },
  ];

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section id="faq-section" className="py-12 px-4 sm:px-6 w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-wide drop-shadow-[2px_2px_0px_#000]">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm font-bold text-[#EAD5C8] mt-1.5">
          Everything you need to know about downloading videos and audio.
        </p>
      </div>

      <div className="space-y-4">
        {displayFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              className="neo-card overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
              >
                <span className="text-sm sm:text-base font-extrabold text-black flex items-center gap-3 pr-3">
                  <HelpCircle className="w-5 h-5 text-[#FF8038] flex-shrink-0" />
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full border-[2.5px] border-black flex items-center justify-center transition-transform ${isOpen ? 'rotate-180 bg-[#FF8038] text-white' : 'bg-slate-100 text-black'}`}>
                  <ChevronDown className="w-4 h-4 stroke-[3]" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-6 sm:px-6 pt-0 text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed border-t-[2px] border-slate-100 mt-1">
                  <p className="pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
