import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Globe2, 
  Sliders, 
  TrendingUp, 
  MapPin, 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  CheckCircle,
  Building2,
  Copy,
  Check
} from 'lucide-react';
import { HUBS_DATA } from '../data/wisdomqData';

export const AboutSection: React.FC = () => {
  const [istTime, setIstTime] = useState('');
  const [copiedCity, setCopiedCity] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setIstTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyPhone = (phone: string, city: string) => {
    navigator.clipboard?.writeText(phone);
    setCopiedCity(city);
    setTimeout(() => setCopiedCity(null), 2500);
  };

  const differentiators = [
    {
      icon: Layers,
      title: 'Domain & Technical Expertise',
      desc: 'Deep multi-decade pedigree across cloud architectures, embedded systems, automotive firmware, and enterprise AI stacks combined with certified linguists.',
      accent: 'border-rose-500/30 text-rose-400 bg-rose-500/10'
    },
    {
      icon: Globe2,
      title: 'Global Outlook & CEFR Standard',
      desc: 'Seamless operations tailored to multicultural corporate environments, compliant with European CEFR, Japanese JLPT, and American ATA localization frameworks.',
      accent: 'border-sky-500/30 text-sky-400 bg-sky-500/10'
    },
    {
      icon: Sliders,
      title: 'Agile Customization',
      desc: 'Modular solutions tailored to project size: from single-page urgent patent translation to 50-person specialized offshore bilingual engineering pods.',
      accent: 'border-purple-500/30 text-purple-400 bg-purple-500/10'
    },
    {
      icon: TrendingUp,
      title: 'Quality-Driven & Measurable ROI',
      desc: 'Rigorous dual-linguist review processes, ISO 17100 translation standards, and verifiable corporate KPI scorecards.',
      accent: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 inline-block mb-3">
          Who We Are
        </span>
        <h2 className="fluid-h2 font-extrabold text-white tracking-tight mb-4">
          Bridging Skill Gaps, Enabling Global Collaboration
        </h2>
        <p className="fluid-body text-slate-300">
          WisdomQ Technologies empowers world-leading enterprises through precision capability building, bespoke talent acquisition, and multilingual consulting built to international benchmarks.
        </p>
      </div>

      {/* 4-Pillar Grid (1 col on mobile, 2 col on tablet, 4 col on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
        {differentiators.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between"
            >
              <div>
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border mb-4 sm:mb-5 ${item.accent}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <CheckCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Enterprise Grade</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Delivery Hubs Showcase */}
      <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800/80 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4 shrink-0" />
              <span>Global Delivery Infrastructure</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Dual-Hub Centers of Excellence
            </h3>
          </div>

          <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono self-start sm:self-auto">
            <Clock className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
            <span className="text-slate-400">IST Operations Live:</span>
            <span className="font-bold text-white whitespace-nowrap">{istTime || 'Loading...'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
          {HUBS_DATA.map((hub) => (
            <div
              key={hub.city}
              className="p-5 sm:p-6 rounded-2xl bg-slate-950/60 border border-slate-800/90 hover:border-rose-500/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="text-xs font-mono uppercase font-bold text-rose-400 mb-1">{hub.city} Delivery Hub</div>
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                      {hub.title}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase border border-emerald-500/20 shrink-0">
                    Active
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 mb-5">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{hub.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="text-slate-400">Focus: <strong className="text-slate-200 font-medium">{hub.focus}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${hub.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-400 hover:text-rose-300 text-xs font-mono font-bold border border-slate-800 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                    <span>{hub.phone}</span>
                  </a>

                  <button
                    onClick={() => handleCopyPhone(hub.fullPhone, hub.city)}
                    className="p-2 min-h-[40px] min-w-[40px] rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors flex items-center justify-center"
                    title="Copy full phone number"
                  >
                    {copiedCity === hub.city ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <a
                  href="#contact"
                  className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Direct Desk &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
