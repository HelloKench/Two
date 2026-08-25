import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Languages, 
  GraduationCap, 
  Brain, 
  LaptopMinimal, 
  ArrowRight, 
  Check, 
  Clock, 
  Layers,
  X,
  ShieldCheck
} from 'lucide-react';
import { WISDOMQ_SERVICES, ServiceItem } from '../data/wisdomqData';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (activeModalService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalService]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Briefcase': return Briefcase;
      case 'Languages': return Languages;
      case 'GraduationCap': return GraduationCap;
      case 'Brain': return Brain;
      case 'LaptopMinimal': return LaptopMinimal;
      default: return Layers;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 inline-block mb-3">
          Our Capabilities
        </span>
        <h2 className="fluid-h2 font-extrabold text-white tracking-tight mb-4">
          Integrated Enterprise Services
        </h2>
        <p className="fluid-body text-slate-300">
          Scalable, high-impact solutions engineered to match dynamic market trajectories, global expansion plans, and technical competencies.
        </p>
      </div>

      {/* Services Responsive CSS Grid (1 col on mobile, 2 col on tablet, 3 col on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {WISDOMQ_SERVICES.map((service, idx) => {
          const Icon = getIcon(service.iconName);
          return (
            <div
              key={service.id}
              className={`p-5 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/50 flex flex-col justify-between group relative overflow-hidden ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Subtle top accent line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 opacity-80"
                style={{ backgroundColor: service.accentColor }}
              />

              <div>
                <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
                  <div 
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-105"
                    style={{ 
                      backgroundColor: `${service.accentColor}18`,
                      borderColor: `${service.accentColor}40`,
                      color: service.accentColor 
                    }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-slate-950/70 border border-slate-800 text-slate-400">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-rose-200 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Key Features List */}
                <div className="space-y-2 mb-5">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" 
                        style={{ backgroundColor: service.accentColor }} 
                      />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 sm:pt-5 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate max-w-[120px] sm:max-w-none">SLA: {service.turnaroundTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="px-3 py-2 min-h-[38px] rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors active:scale-95"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => {
                      onSelectServiceForQuote(service.id);
                      const el = document.getElementById('calculators');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3.5 py-2 min-h-[38px] rounded-xl text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1"
                    style={{ backgroundColor: service.accentColor }}
                  >
                    <span>Estimate</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Details Responsive Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="fixed inset-0" 
            onClick={() => setActiveModalService(null)} 
          />
          <div className="relative z-10 w-full sm:max-w-2xl bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 max-h-[90dvh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-2 duration-300">
            {/* Modal Top */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-rose-400 tracking-wider">
                  {activeModalService.category} Specification
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  {activeModalService.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                className="p-2 min-h-[40px] min-w-[40px] rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-5 space-y-5 text-slate-300 text-xs sm:text-sm leading-relaxed">
              <p className="font-medium text-slate-200">
                {activeModalService.shortDesc}
              </p>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-3">
                  Scope &amp; Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalService.features.map((f, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-2 text-xs">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="text-xs font-mono text-slate-300">Turnaround Guarantee:</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-white font-mono">{activeModalService.turnaroundTime}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalService(null)}
                className="w-full sm:w-auto px-5 py-3 min-h-[44px] rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const sId = activeModalService.id;
                  setActiveModalService(null);
                  onSelectServiceForQuote(sId);
                  const el = document.getElementById('calculators');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Interactive Estimator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
