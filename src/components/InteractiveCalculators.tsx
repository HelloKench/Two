import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Languages, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  HardDrive, 
  Sparkles,
  ArrowRight,
  RefreshCw,
  Zap,
  DollarSign
} from 'lucide-react';
import { syncEngine, QueuedRequest } from '../services/dbSync';

interface CalculatorsProps {
  initialTab?: 'translation' | 'staffing' | 'coaching';
}

export const InteractiveCalculators: React.FC<CalculatorsProps> = ({ initialTab = 'translation' }) => {
  const [activeTab, setActiveTab] = useState<'translation' | 'staffing' | 'coaching'>(initialTab);

  // Translation Estimator State
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Japanese');
  const [docType, setDocType] = useState<'technical' | 'legal' | 'general' | 'software'>('technical');
  const [wordCount, setWordCount] = useState<number>(2500);
  const [certified, setCertified] = useState<boolean>(true);
  const [expedited, setExpedited] = useState<boolean>(false);
  const [contactEmail, setContactEmail] = useState('');

  // Staffing Estimator State
  const [staffingRole, setStaffingRole] = useState('Bilingual Cloud Architect');
  const [staffingLang, setStaffingLang] = useState('Japanese / English');
  const [teamSize, setTeamSize] = useState<number>(2);
  const [contractMonths, setContractMonths] = useState<number>(6);

  // Coaching Pathway State
  const [examType, setExamType] = useState<'IELTS' | 'DELF_DALF' | 'JLPT' | 'GOETHE'>('IELTS');
  const [currentLevel, setCurrentLevel] = useState('Band 5.5 / B1 Intermediate');
  const [targetLevel, setTargetLevel] = useState('Band 7.5+ / C1 Advanced');

  // Submission / Offline Sync Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<QueuedRequest | null>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Pricing math calculations
  const calculateTranslationQuote = () => {
    let ratePerWord = 0.12; // Base USD
    if (docType === 'technical') ratePerWord = 0.16;
    if (docType === 'legal') ratePerWord = 0.18;
    if (docType === 'software') ratePerWord = 0.15;

    if (['Japanese', 'Mandarin', 'Arabic', 'Korean'].includes(targetLang)) {
      ratePerWord *= 1.25;
    }

    let total = wordCount * ratePerWord;
    if (certified) total += 45;
    if (expedited) total *= 1.35;

    let slaHours = Math.max(24, Math.ceil(wordCount / 2000) * 24);
    if (expedited) slaHours = Math.max(12, Math.floor(slaHours / 2));

    return {
      estimatedCostUSD: Math.round(total),
      estimatedCostINR: Math.round(total * 86),
      slaHours,
      ratePerWord: ratePerWord.toFixed(2)
    };
  };

  const calculateStaffingEstimate = () => {
    let baseMonthlyRateUSD = 4200;
    if (staffingRole.includes('Cloud') || staffingRole.includes('AI')) baseMonthlyRateUSD = 5800;
    if (staffingRole.includes('Embedded')) baseMonthlyRateUSD = 5200;

    const totalEstimate = baseMonthlyRateUSD * teamSize * contractMonths;
    const deploymentSla = teamSize <= 2 ? '48 Hours' : '5 Business Days';

    return {
      monthlyPerSpecialistUSD: baseMonthlyRateUSD,
      totalEstimateUSD: totalEstimate,
      deploymentSla,
      preScreenedMatches: Math.max(3, teamSize * 2)
    };
  };

  const calculateCoachingPathway = () => {
    let recommendedWeeks = 8;
    let liveMockHours = 24;
    let mockInterviews = 6;

    if (targetLevel.includes('C1') || targetLevel.includes('7.5') || targetLevel.includes('N1')) {
      recommendedWeeks = 12;
      liveMockHours = 40;
      mockInterviews = 10;
    }

    return {
      recommendedWeeks,
      liveMockHours,
      mockInterviews,
      batchType: 'Small Cohort (Max 6) or 1-on-1 Executive'
    };
  };

  const handleSaveQuoteOffline = async (type: QueuedRequest['type']) => {
    setIsSubmitting(true);
    try {
      let payload: Record<string, unknown> = {};

      if (type === 'translation_quote') {
        const quote = calculateTranslationQuote();
        payload = {
          sourceLang,
          targetLang,
          docType,
          wordCount,
          certified,
          expedited,
          email: contactEmail || 'user-offline@portal.com',
          ...quote
        };
      } else if (type === 'staffing_request') {
        const estimate = calculateStaffingEstimate();
        payload = {
          staffingRole,
          staffingLang,
          teamSize,
          contractMonths,
          email: contactEmail || 'user-offline@portal.com',
          ...estimate
        };
      } else {
        const coaching = calculateCoachingPathway();
        payload = {
          examType,
          currentLevel,
          targetLevel,
          email: contactEmail || 'user-offline@portal.com',
          ...coaching
        };
      }

      const req = await syncEngine.enqueue(type, payload, 'sales');
      setLastSubmission(req);
    } finally {
      setIsSubmitting(false);
    }
  };

  const transQuote = calculateTranslationQuote();
  const staffEstimate = calculateStaffingEstimate();
  const coachingPath = calculateCoachingPathway();

  return (
    <section id="calculators" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 inline-block mb-3">
          Interactive Estimation Engine
        </span>
        <h2 className="fluid-h2 font-extrabold text-white tracking-tight mb-4">
          Transparent SLA &amp; Pricing Calculators
        </h2>
        <p className="fluid-body text-slate-300">
          Configure real-time translation turnarounds, staffing capacity simulations, and language certification pathways with instant offline-resilient submission.
        </p>
      </div>

      {/* Selector Tabs (Scrollable on small screens, neatly centered) */}
      <div className="flex items-center justify-start sm:justify-center p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 max-w-xl mx-auto mb-8 sm:mb-10 overflow-x-auto no-scrollbar gap-1">
        <button
          onClick={() => { setActiveTab('translation'); setLastSubmission(null); }}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 sm:px-4 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'translation'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Languages className="w-4 h-4 shrink-0" />
          <span>Translation SLA</span>
        </button>

        <button
          onClick={() => { setActiveTab('staffing'); setLastSubmission(null); }}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 sm:px-4 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'staffing'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4 shrink-0" />
          <span>Staffing Matcher</span>
        </button>

        <button
          onClick={() => { setActiveTab('coaching'); setLastSubmission(null); }}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 sm:px-4 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'coaching'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <GraduationCap className="w-4 h-4 shrink-0" />
          <span>Exam Coaching</span>
        </button>
      </div>

      {/* Main Container Card */}
      <div className="p-5 sm:p-8 lg:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl shadow-2xl">
        {/* TAB 1: TRANSLATION CALCULATOR */}
        {activeTab === 'translation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                    Source Language
                  </label>
                  <select
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:border-rose-500 focus:outline-none min-h-[44px]"
                  >
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Mandarin">Mandarin Chinese</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                    Target Language
                  </label>
                  <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:border-rose-500 focus:outline-none min-h-[44px]"
                  >
                    <option value="Japanese">Japanese (JLPT N1 Dual-Linguist)</option>
                    <option value="French">French (CEFR C2 Certified)</option>
                    <option value="German">German (Technical DIN/ISO)</option>
                    <option value="Mandarin">Mandarin (Simplified/Traditional)</option>
                    <option value="Spanish">Spanish (LatAm &amp; Castilian)</option>
                    <option value="Arabic">Arabic (Modern Standard)</option>
                  </select>
                </div>
              </div>

              {/* Document Type Selection */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                  Document / Content Classification
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'technical', label: 'Technical' },
                    { id: 'legal', label: 'Legal & SOPs' },
                    { id: 'software', label: 'Software/Code' },
                    { id: 'general', label: 'Corporate General' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setDocType(type.id as typeof docType)}
                      className={`p-3 min-h-[44px] rounded-xl text-xs font-semibold border transition-all text-center flex items-center justify-center ${
                        docType === type.id
                          ? 'bg-rose-600/20 border-rose-500 text-rose-300 shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Word Count Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono font-bold uppercase text-slate-400">
                    Estimated Word Count
                  </label>
                  <span className="text-sm font-mono font-bold text-rose-400">
                    {wordCount.toLocaleString()} Words
                  </span>
                </div>
                <input
                  type="range"
                  min="250"
                  max="50000"
                  step="250"
                  value={wordCount}
                  onChange={(e) => setWordCount(parseInt(e.target.value))}
                  className="w-full accent-rose-500 h-2 bg-slate-950 rounded-lg cursor-pointer py-2"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>250 words</span>
                  <span>10k</span>
                  <span>25k</span>
                  <span>50,000+ words</span>
                </div>
              </div>

              {/* Add-on toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-center justify-between p-3.5 min-h-[44px] rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">ISO 17100 Certification</div>
                      <div className="text-[10px] text-slate-400">Audited Certificate included</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={certified}
                    onChange={(e) => setCertified(e.target.checked)}
                    className="w-4 h-4 accent-rose-500 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 min-h-[44px] rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700">
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">Expedited Turnaround</div>
                      <div className="text-[10px] text-slate-400">50% faster delivery window</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={expedited}
                    onChange={(e) => setExpedited(e.target.checked)}
                    className="w-4 h-4 accent-rose-500 rounded"
                  />
                </label>
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1.5">
                  Official Email for Formal Proposal Dispatch
                </label>
                <input
                  type="email"
                  placeholder="name@enterprise-client.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            {/* Quote Output Summary Card */}
            <div className="lg:col-span-5 p-5 sm:p-7 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <span className="text-xs font-mono uppercase font-bold text-slate-400">
                    Live Calculation
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 text-[10px] font-mono font-bold">
                    Dual-Currency
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Estimated Cost (USD)</div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                      ${transQuote.estimatedCostUSD.toLocaleString()}
                    </div>
                    <div className="text-xs font-mono text-emerald-400 mt-1">
                      ≈ ₹{transQuote.estimatedCostINR.toLocaleString()} INR (excl. GST)
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Guaranteed SLA:</span>
                      <strong className="text-white font-mono">{transQuote.slaHours} Hours</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Effective Rate/Word:</span>
                      <strong className="text-white font-mono">${transQuote.ratePerWord} USD</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pairing:</span>
                      <strong className="text-white font-mono">{sourceLang} &rarr; {targetLang}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {lastSubmission && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-200 animate-in fade-in">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Transmission Locked: {lastSubmission.trackingNumber}</span>
                    </div>
                    <p className="text-[11px] opacity-90">
                      {syncEngine.isOnline 
                        ? 'Dispatched to WisdomQ Sales Desk with active SLA guarantee.' 
                        : 'Saved offline in IndexedDB. Will auto-sync when network reconnects.'}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleSaveQuoteOffline('translation_quote')}
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-5 min-h-[44px] rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <HardDrive className="w-4 h-4" />
                  )}
                  <span>Lock In Quote &amp; Dispatch Proposal</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STAFFING MATCHER */}
        {activeTab === 'staffing' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                    Target Role / Profile
                  </label>
                  <select
                    value={staffingRole}
                    onChange={(e) => setStaffingRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:border-rose-500 focus:outline-none min-h-[44px]"
                  >
                    <option value="Bilingual Cloud Architect">Bilingual Cloud Architect</option>
                    <option value="Technical German Automotive Translator">Technical German Automotive Translator</option>
                    <option value="French Enterprise IT Support Lead">French Enterprise IT Support Lead</option>
                    <option value="Bilingual AI Prompt Engineer (Japanese/English)">Bilingual AI Prompt Engineer (Japanese)</option>
                    <option value="Embedded Systems Specialist (Mandarin)">Embedded Systems Specialist (Mandarin)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                    Language Capability
                  </label>
                  <select
                    value={staffingLang}
                    onChange={(e) => setStaffingLang(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:border-rose-500 focus:outline-none min-h-[44px]"
                  >
                    <option value="Japanese / English (JLPT N1/N2)">Japanese / English (JLPT N1/N2)</option>
                    <option value="French / English (CEFR C1/C2)">French / English (CEFR C1/C2)</option>
                    <option value="German / English (Goethe C1)">German / English (Goethe C1)</option>
                    <option value="Mandarin / English (HSK 6)">Mandarin / English (HSK 6)</option>
                    <option value="Spanish / English (DELE C1)">Spanish / English (DELE C1)</option>
                  </select>
                </div>
              </div>

              {/* Team Size & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-mono font-bold uppercase text-slate-400">Headcount Needed</label>
                    <span className="text-sm font-mono font-bold text-rose-400">{teamSize} Specialist(s)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={teamSize}
                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                    className="w-full accent-rose-500 h-2 bg-slate-950 rounded-lg cursor-pointer py-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-mono font-bold uppercase text-slate-400">Engagement Duration</label>
                    <span className="text-sm font-mono font-bold text-rose-400">{contractMonths} Months</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={contractMonths}
                    onChange={(e) => setContractMonths(parseInt(e.target.value))}
                    className="w-full accent-rose-500 h-2 bg-slate-950 rounded-lg cursor-pointer py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1.5">
                  Work Email for Pre-Screened Candidate Dossiers
                </label>
                <input
                  type="email"
                  placeholder="talent-lead@enterprise.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            {/* Staffing Output Summary */}
            <div className="lg:col-span-5 p-5 sm:p-7 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <span className="text-xs font-mono uppercase font-bold text-slate-400">
                    Deployment Simulation
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                    Bench Ready
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Estimated Budget ({contractMonths} Mos)</div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                      ${staffEstimate.totalEstimateUSD.toLocaleString()}
                    </div>
                    <div className="text-xs font-mono text-slate-400 mt-1">
                      ${staffEstimate.monthlyPerSpecialistUSD.toLocaleString()} / mo per specialist
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Deployment SLA:</span>
                      <strong className="text-emerald-400 font-mono">{staffEstimate.deploymentSla}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pre-Screened Profiles:</span>
                      <strong className="text-white font-mono">{staffEstimate.preScreenedMatches} Verified Matches</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">NDA Status:</span>
                      <strong className="text-white font-mono">Pre-executed</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {lastSubmission && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-200 animate-in fade-in">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Requisition Queued: {lastSubmission.trackingNumber}</span>
                    </div>
                    <p className="text-[11px] opacity-90">
                      Dispatched to Talent Acquisition Desk with candidate profiles.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleSaveQuoteOffline('staffing_request')}
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-5 min-h-[44px] rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <HardDrive className="w-4 h-4" />
                  )}
                  <span>Request Candidate Dossiers (NDA Protected)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COACHING PATHWAY */}
        {activeTab === 'coaching' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                    Target Examination
                  </label>
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value as typeof examType)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:border-rose-500 focus:outline-none min-h-[44px]"
                  >
                    <option value="IELTS">IELTS Academic / General</option>
                    <option value="DELF_DALF">DELF / DALF (French)</option>
                    <option value="JLPT">JLPT N1 / N2 (Japanese)</option>
                    <option value="GOETHE">Goethe-Zertifikat (German)</option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                    Current Baseline Level
                  </label>
                  <select
                    value={currentLevel}
                    onChange={(e) => setCurrentLevel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:border-rose-500 focus:outline-none min-h-[44px]"
                  >
                    <option value="Band 5.5 / B1 Intermediate">Band 5.5 / B1 Intermediate</option>
                    <option value="Band 6.5 / B2 Operational">Band 6.5 / B2 Operational</option>
                    <option value="A2 Beginner Foundations">A2 Beginner Foundations</option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                    Target Corporate Score
                  </label>
                  <select
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:border-rose-500 focus:outline-none min-h-[44px]"
                  >
                    <option value="Band 7.5+ / C1 Advanced">Band 7.5+ / C1 Advanced</option>
                    <option value="Band 8.5 / C2 Mastery">Band 8.5 / C2 Mastery</option>
                    <option value="JLPT N1 / Business Fluent">JLPT N1 / Business Fluent</option>
                    <option value="DALF C1 / Executive Level">DALF C1 / Executive Level</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1.5">
                  Corporate / Candidate Contact Email
                </label>
                <input
                  type="email"
                  placeholder="hr-learning@enterprise.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            {/* Coaching Output Summary */}
            <div className="lg:col-span-5 p-5 sm:p-7 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <span className="text-xs font-mono uppercase font-bold text-slate-400">
                    Curriculum Blueprint
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-mono font-bold">
                    Official Examiners
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Recommended Duration</div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                      {coachingPath.recommendedWeeks} Weeks
                    </div>
                    <div className="text-xs font-mono text-slate-400 mt-1">
                      {coachingPath.batchType}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Live 1-on-1 / Masterclass:</span>
                      <strong className="text-white font-mono">{coachingPath.liveMockHours} Hours</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Simulated Mock Exams:</span>
                      <strong className="text-white font-mono">{coachingPath.mockInterviews} Full-length Mocks</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Diagnostic Assessment:</span>
                      <strong className="text-emerald-400 font-mono">Complimentary</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {lastSubmission && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-200 animate-in fade-in">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Coaching Requisition Saved: {lastSubmission.trackingNumber}</span>
                    </div>
                    <p className="text-[11px] opacity-90">
                      Dispatched to Education &amp; Corporate Training division.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleSaveQuoteOffline('coaching_pathway')}
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-5 min-h-[44px] rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <HardDrive className="w-4 h-4" />
                  )}
                  <span>Book Diagnostic &amp; Enroll Cohort</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
