import React, { useState } from 'react';
import { ArrowRight, Shield, Globe2, Zap, Award, Sparkles, Video, VideoOff } from 'lucide-react';

interface HeroSectionProps {
  onOpenEstimator: () => void;
  onOpenVault: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenEstimator, onOpenVault }) => {
  const [videoEnabled, setVideoEnabled] = useState(true);

  return (
    <section id="home" className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Layer: Video / Ambient Canvas */}
      {videoEnabled ? (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-20 filter saturate-150 brightness-75 transition-opacity duration-1000"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
        >
          <source src="https://cdn.coverr.co/videos/coverr-business-team-working-together-5176/1080p.mp4" type="video/mp4" />
        </video>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 filter saturate-120"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80")' }}
        />
      )}

      {/* Radial Gradient Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/90 to-slate-950 z-0 pointer-events-none" />

      {/* Ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] lg:w-[650px] h-[280px] sm:h-[400px] bg-rose-600/15 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none animate-soft-glow" />
      <div className="absolute bottom-10 right-5 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-sky-600/10 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
        {/* Top Tag & Video Toggle */}
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md mb-6 sm:mb-8 text-xs sm:text-sm font-medium text-rose-300 shadow-lg shadow-rose-950/20 max-w-full">
          <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping shrink-0" />
          <span className="font-semibold tracking-wide truncate max-w-[200px] sm:max-w-none">Global Capability &amp; Cross-Border Talent</span>
          <span className="text-slate-500 hidden xs:inline">|</span>
          <button
            onClick={() => setVideoEnabled(!videoEnabled)}
            className="hover:text-white flex items-center gap-1 text-[11px] font-mono text-slate-400 py-0.5 px-1 rounded active:scale-95"
            title={videoEnabled ? 'Disable ambient video' : 'Enable ambient video'}
          >
            {videoEnabled ? <Video className="w-3 h-3 text-rose-400" /> : <VideoOff className="w-3 h-3" />}
            <span className="hidden sm:inline">{videoEnabled ? 'Ambient On' : 'Ambient Off'}</span>
          </button>
        </div>

        {/* Fluid Main Headline */}
        <h1 className="fluid-h1 font-extrabold text-white tracking-tight mb-4 sm:mb-6 max-w-4xl mx-auto px-1">
          Empowering <span className="bg-gradient-to-r from-white via-rose-100 to-rose-400 bg-clip-text text-transparent">Global Communication</span> &amp; Talent Excellence
        </h1>

        {/* Fluid Subtitle */}
        <p className="fluid-body text-slate-300 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
          In today’s enterprise landscape, businesses thrive on precision multilingual communication, specialized bilingual talent, and high-impact corporate training. We bridge mission-critical capability gaps worldwide.
        </p>

        {/* Dual Primary Call-to-Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 max-w-lg sm:max-w-none mx-auto">
          <a
            href="#calculators"
            onClick={onOpenEstimator}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-rose-600/30 border border-rose-400/30 transition-all hover:scale-[1.02] active:scale-95 focus-visible:outline-2 focus-visible:outline-rose-400 text-center"
          >
            <span>Instant Quote &amp; Staffing Estimator</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>

          <a
            href="#services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700/80 backdrop-blur-md transition-all hover:border-slate-500 active:scale-95 focus-visible:outline-2 focus-visible:outline-slate-400 text-center"
          >
            <span>Explore 5 Capabilities</span>
          </a>

          <button
            onClick={onOpenVault}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 min-h-[48px] rounded-xl bg-slate-950/60 hover:bg-slate-900/90 text-rose-300 hover:text-rose-200 font-semibold text-sm sm:text-base border border-rose-500/25 backdrop-blur-md transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-rose-400"
          >
            <Shield className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Biometric Client Vault</span>
          </button>
        </div>

        {/* Responsive Trust Metric Grid (2 cols mobile, 4 cols desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80 text-left">
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60 backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-rose-400 mb-1">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 truncate">Turnaround</span>
            </div>
            <div className="text-base sm:text-2xl font-black text-white">48 Hours</div>
            <div className="text-[11px] sm:text-xs text-slate-400 truncate">Pre-screened tech staffing</div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60 backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-sky-400 mb-1">
              <Globe2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 truncate">Global Reach</span>
            </div>
            <div className="text-base sm:text-2xl font-black text-white">15+ Languages</div>
            <div className="text-[11px] sm:text-xs text-slate-400 truncate">Native dual-linguist QA</div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60 backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-purple-400 mb-1">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 truncate">Standard</span>
            </div>
            <div className="text-base sm:text-2xl font-black text-white">ISO 17100</div>
            <div className="text-[11px] sm:text-xs text-slate-400 truncate">Audited translation norms</div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60 backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 truncate">Security</span>
            </div>
            <div className="text-base sm:text-2xl font-black text-white">Passkey Ready</div>
            <div className="text-[11px] sm:text-xs text-slate-400 truncate">Biometric &amp; offline vault</div>
          </div>
        </div>
      </div>
    </section>
  );
};
