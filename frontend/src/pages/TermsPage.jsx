import React from 'react';
import SeoMeta from '../components/SeoMeta';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-slate-800">
      <SeoMeta
        title="Terms of Service"
        description="Terms of Service and conditions of use for Pixvoro video downloading services."
        canonicalUrl="https://pixvoro.com/terms"
      />

      <div className="neo-card p-6 sm:p-10 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black font-heading tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs font-bold text-slate-500">Last updated: September 17, 2026</p>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-black font-heading">1. Acceptance of Terms</h2>
          <p className="text-sm font-semibold leading-relaxed text-slate-600">
            By accessing or using Pixvoro ("the Service"), you agree to comply with and be bound by these Terms of Service. If you do not agree, please discontinue use.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-black font-heading">2. Permitted Fair Use</h2>
          <p className="text-sm font-semibold leading-relaxed text-slate-600">
            Pixvoro is provided as a format conversion tool for personal offline archival, educational review, and backup of publicly accessible media. Users are responsible for complying with the terms of third-party hosts and applicable copyright laws.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-black font-heading">3. Third-Party Platforms</h2>
          <p className="text-sm font-semibold leading-relaxed text-slate-600">
            Pixvoro is an independent utility and is not affiliated, endorsed, or associated with YouTube, Google, Meta, Instagram, Facebook, Pinterest, or TikTok.
          </p>
        </section>
      </div>
    </div>
  );
}
