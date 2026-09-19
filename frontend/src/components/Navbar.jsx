import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function Navbar({ onToggleMobileMenu }) {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between">
      {/* Mobile Brand & Hamburger */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={onToggleMobileMenu}
          className="p-2.5 rounded-xl bg-[#FF8038] border-[3px] border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-black stroke-[3]" />
        </button>
        <Link to="/" className="font-extrabold text-2xl tracking-tight text-white font-heading drop-shadow-[2px_2px_0px_#000]">
          Pixvoro
        </Link>
      </div>

      {/* Desktop Top Title */}
      <div className="hidden lg:block">
        <h2 className="text-3xl font-extrabold text-white font-heading tracking-wide drop-shadow-[3px_3px_0px_#000]">
          Pixvoro Suite
        </h2>
      </div>

      {/* Right Action: Help / FAQ pill button */}
      <div className="flex items-center gap-3">
        <a
          href="#faq-section"
          className="neo-btn-white px-5 py-2 text-xs font-black uppercase tracking-wider inline-flex items-center gap-2"
        >
          Help / FAQ
        </a>
      </div>
    </header>
  );
}
