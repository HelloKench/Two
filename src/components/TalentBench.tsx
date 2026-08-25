import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Star, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Filter, 
  Check,
  X,
  FileCheck,
  Building2
} from 'lucide-react';
import { TALENT_BENCH, TalentProfile } from '../data/wisdomqData';
import { syncEngine } from '../services/dbSync';

interface TalentBenchProps {
  onSelectTalent: (talent: TalentProfile) => void;
}

export const TalentBench: React.FC<TalentBenchProps> = ({ onSelectTalent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedTalentModal, setSelectedTalentModal] = useState<TalentProfile | null>(null);
  const [ndaRequestSuccess, setNdaRequestSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (selectedTalentModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedTalentModal]);

  const languages = ['All', 'Japanese', 'French', 'German', 'Spanish', 'Mandarin'];

  const filteredTalents = TALENT_BENCH.filter((talent) => {
    const matchesSearch = 
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.technicalSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLang = 
      selectedLanguage === 'All' || 
      talent.primaryLanguage.toLowerCase().includes(selectedLanguage.toLowerCase()) ||
      talent.secondaryLanguage.toLowerCase().includes(selectedLanguage.toLowerCase());

    return matchesSearch && matchesLang;
  });

  const handleRequestNda = async (talent: TalentProfile) => {
    await syncEngine.enqueue('nda_request', {
      talentId: talent.id,
      talentName: talent.name,
      talentRole: talent.role,
      requestedAt: Date.now()
    }, 'recruitment');

    setNdaRequestSuccess(talent.id);
    setTimeout(() => {
      onSelectTalent(talent);
    }, 400);
  };

  return (
    <section id="talent" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 inline-block mb-3">
            Pre-Screened Roster
          </span>
          <h2 className="fluid-h2 font-extrabold text-white tracking-tight">
            Verified Global Talent Bench
          </h2>
          <p className="fluid-body text-slate-300 max-w-2xl mt-2">
            Explore ready-to-deploy bilingual engineers, certified domain linguists, and prompt developers pre-vetted to ISO &amp; CEFR frameworks.
          </p>
        </div>

        {/* Global bench badge */}
        <div className="flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 shrink-0 self-start md:self-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-xs font-mono text-slate-300">
            <strong className="text-white font-bold">120+</strong> Bilingual Specialists on Standby
          </span>
        </div>
      </div>

      {/* Search & Language Filters (Swipeable on mobile) */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl mb-8 flex flex-col md:flex-row gap-3.5 sm:gap-4 items-stretch md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search role, skills, cloud..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none min-h-[44px]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs font-mono text-slate-400 mr-1 shrink-0 hidden sm:inline">Language:</span>
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3.5 py-2 min-h-[38px] rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                selectedLanguage === lang
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Talent Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredTalents.map((talent) => (
          <div
            key={talent.id}
            className="p-5 sm:p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="text-[11px] font-mono font-bold text-rose-400 uppercase tracking-wide">
                    {talent.fluencyLevel}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                    {talent.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">{talent.role}</p>
                </div>

                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold font-mono shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{talent.rating}</span>
                </div>
              </div>

              {/* Language pairings */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 mb-4 space-y-1 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Primary:</span>
                  <strong className="text-white font-medium">{talent.primaryLanguage}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Secondary:</span>
                  <strong className="text-white font-medium">{talent.secondaryLanguage}</strong>
                </div>
              </div>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {talent.technicalSkills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 text-[11px] font-mono border border-slate-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Details & Action */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-0.5 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{talent.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-emerald-400 font-mono font-medium">{talent.availability}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedTalentModal(talent)}
                  className="px-3 py-2 min-h-[38px] rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => handleRequestNda(talent)}
                  className="px-3.5 py-2 min-h-[38px] rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>{ndaRequestSuccess === talent.id ? 'Requested' : 'NDA Dossier'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Talent Profile Responsive Modal */}
      {selectedTalentModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="fixed inset-0" 
            onClick={() => setSelectedTalentModal(null)} 
          />
          <div className="relative z-10 w-full sm:max-w-xl bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 max-h-[90dvh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-2 duration-300">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-rose-400 tracking-wider">
                  Candidate Dossier #{selectedTalentModal.id}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  {selectedTalentModal.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium">{selectedTalentModal.role}</p>
              </div>
              <button
                onClick={() => setSelectedTalentModal(null)}
                className="p-2 min-h-[40px] min-w-[40px] rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">Language Fluency</div>
                  <div className="font-bold text-white mt-0.5">{selectedTalentModal.fluencyLevel}</div>
                  <div className="text-xs text-slate-400">{selectedTalentModal.primaryLanguage} / {selectedTalentModal.secondaryLanguage}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">Experience</div>
                  <div className="font-bold text-white mt-0.5">{selectedTalentModal.yearsExperience} Years Enterprise</div>
                  <div className="text-xs text-emerald-400">{selectedTalentModal.availability}</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                  Technical Core Competencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTalentModal.technicalSkills.map((s, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-white">Full NDA Background Verification Complete</div>
                  <div className="text-slate-400 text-[11px]">Identity, CEFR/JLPT certificates, and enterprise references pre-audited.</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setSelectedTalentModal(null)}
                className="w-full sm:w-auto px-5 py-3 min-h-[44px] rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const t = selectedTalentModal;
                  setSelectedTalentModal(null);
                  handleRequestNda(t);
                }}
                className="w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Request Formal Candidate Dossier</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
