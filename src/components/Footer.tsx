import React from 'react';
import { ArrowUp, Sparkles, Shield, Globe, Smartphone, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/95 pt-12 pb-28 sm:pb-12 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-rose-700 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center text-rose-500">
                <Sparkles className="w-4 h-4 text-rose-400" />
              </div>
            </div>
            <span className="font-extrabold text-base text-white tracking-tight">
              Wisdom<span className="text-rose-500">Q</span> Technologies
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono">
            <span className="inline-flex items-center gap-1 text-slate-300">
              <Shield className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>ISO 17100:2015</span>
            </span>
            <span className="text-slate-600 hidden xs:inline">&bull;</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>CEFR &amp; JLPT Standard</span>
            </span>
            <span className="text-slate-600 hidden xs:inline">&bull;</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>iOS &amp; Android PWA Ready</span>
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 min-h-[40px] rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-2 text-xs font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Tier */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© 2026 WisdomQ Technologies. All Rights Reserved. Global Communication &amp; Talent Excellence.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#about" className="hover:text-slate-300 transition-colors">About</a>
            <a href="#services" className="hover:text-slate-300 transition-colors">Services</a>
            <a href="#calculators" className="hover:text-slate-300 transition-colors">SLA Estimator</a>
            <a href="#talent" className="hover:text-slate-300 transition-colors">Talent Bench</a>
            <a href="#contact" className="hover:text-slate-300 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
