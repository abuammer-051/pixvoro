import React from 'react';
import SeoMeta from '../components/SeoMeta';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-slate-800">
      <SeoMeta
        title="Privacy Policy"
        description="Privacy policy and data protection disclosure for Pixvoro users."
        canonicalUrl="https://pixvoro.com/privacy"
      />

      <div className="neo-card p-6 sm:p-10 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black font-heading tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs font-bold text-slate-500">Last updated: September 17, 2026</p>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-black font-heading">1. Zero Personal Data Collected</h2>
          <p className="text-sm font-semibold leading-relaxed text-slate-600">
            Pixvoro does not require registration, login credentials, emails, or personal information. We do not maintain user profiles or store download history.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-black font-heading">2. Ephemeral Processing</h2>
          <p className="text-sm font-semibold leading-relaxed text-slate-600">
            When our server muxes streams or extracts audio, files reside in temporary cache buffers that are permanently erased immediately after your download stream finishes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-black font-heading">3. No Tracking Cookies</h2>
          <p className="text-sm font-semibold leading-relaxed text-slate-600">
            We do not use invasive tracking cookies or third-party behavioral analytics networks.
          </p>
        </section>
      </div>
    </div>
  );
}
