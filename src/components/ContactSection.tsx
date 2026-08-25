import React, { useState } from 'react';
import { 
  UserCheck, 
  Briefcase, 
  ShieldCheck, 
  TrendingUp, 
  CreditCard, 
  Headphones, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  Clock, 
  HardDrive,
  RefreshCw,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { DEPARTMENT_CONTACTS, HUBS_DATA } from '../data/wisdomqData';
import { syncEngine, QueuedRequest } from '../services/dbSync';

export const ContactSection: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('sales');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReq, setSubmittedReq] = useState<QueuedRequest | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'UserCheck': return UserCheck;
      case 'Briefcase': return Briefcase;
      case 'ShieldCheck': return ShieldCheck;
      case 'TrendingUp': return TrendingUp;
      case 'CreditCard': return CreditCard;
      case 'Headphones': return Headphones;
      case 'Mail': return Mail;
      default: return Mail;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setIsSubmitting(true);
    try {
      const req = await syncEngine.enqueue(
        'contact_ticket',
        {
          name: name || 'Enterprise Partner',
          email,
          phone,
          subject: subject || `Inquiry to ${selectedDept}`,
          message,
          department: selectedDept,
          timestamp: Date.now()
        },
        selectedDept
      );

      setSubmittedReq(req);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 inline-block mb-3">
          Direct Routing
        </span>
        <h2 className="fluid-h2 font-extrabold text-white tracking-tight mb-4">
          Connect With WisdomQ Specialized Desks
        </h2>
        <p className="fluid-body text-slate-300">
          Reach our dedicated department leads directly for expedited response times, verified SLAs, and confidential proposal dispatches.
        </p>
      </div>

      {/* 7-Department Responsive CSS Grid (1 col on mobile, 2 col on sm, 3 col on lg, 4 col on xl) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 mb-12 sm:mb-16">
        {DEPARTMENT_CONTACTS.map((dept) => {
          const Icon = getIcon(dept.icon);
          const isSelected = selectedDept === dept.id;

          return (
            <div
              key={dept.id}
              onClick={() => setSelectedDept(dept.id)}
              className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-xl transition-all cursor-pointer flex flex-col justify-between group min-h-[160px] ${
                isSelected
                  ? 'bg-rose-950/40 border-rose-500 text-white shadow-lg shadow-rose-950/30 -translate-y-1'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90 text-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-colors ${
                    isSelected 
                      ? 'bg-rose-600 text-white border-rose-400' 
                      : 'bg-slate-950 text-rose-400 border-slate-800 group-hover:border-rose-500/40'
                  }`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-slate-400">
                    {dept.sla}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white tracking-tight mb-1">
                  {dept.department}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {dept.purpose}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <a
                  href={`mailto:${dept.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors truncate max-w-[150px] py-1"
                >
                  {dept.email}
                </a>
                <span className="text-[10px] font-mono text-slate-500">
                  {isSelected ? 'Selected' : 'Select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Contact & Offline Form Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-12 sm:mb-16">
        {/* Form Column */}
        <div className="lg:col-span-7 p-5 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Submit Priority Transmission
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Targeting: <strong className="text-rose-400 uppercase font-mono">{selectedDept}</strong> desk &bull; Works offline
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800/40">
              <HardDrive className="w-3.5 h-3.5" />
              <span>Offline Ready</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1.5">
                  Your Name / Organization
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova / Global Tech"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1.5">
                  Official Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. elena@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1.5">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1.5">
                  Target Department
                </label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-3 text-sm text-white focus:border-rose-500 focus:outline-none min-h-[44px]"
                >
                  {DEPARTMENT_CONTACTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.department} ({d.sla})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1.5">
                Subject / Requisition Title
              </label>
              <input
                type="text"
                placeholder="e.g. Urgent French Technical SOP Localization - 35k Words"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1.5">
                Requirement Details &amp; Specifications
              </label>
              <textarea
                required
                rows={4}
                placeholder="Please outline timeline, project volume, language requirements, or candidate profile preferences..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
              />
            </div>

            {submittedReq && (
              <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-200 animate-in fade-in space-y-1">
                <div className="flex items-center gap-2 font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Transmission Encrypted &amp; Registered</span>
                </div>
                <p className="text-[11px] text-emerald-300/90">
                  Official Tracking ID: <strong className="font-mono text-white">{submittedReq.trackingNumber}</strong>.
                  {syncEngine.isOnline
                    ? ' Dispatched to department head with guaranteed SLA.'
                    : ' Stored safely in local IndexedDB. Will auto-sync when network returns.'}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 min-h-[48px] rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>Transmit Priority Requisition</span>
            </button>
          </form>
        </div>

        {/* Direct Hotline & Regional Hubs Column */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="p-5 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl shadow-2xl flex-1 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-rose-400 tracking-wider mb-2 block">
                Instant Telephone Hotlines
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
                Talk to Regional Operations Desk
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Our Bangalore and Chennai operations centers maintain round-the-clock telephone lines for real-time escalations, urgent NDA execution, and immediate linguist deployment.
              </p>

              <div className="space-y-3.5">
                {HUBS_DATA.map((hub) => (
                  <div
                    key={hub.city}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 transition-all flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-xs font-mono uppercase font-bold text-slate-400">{hub.city} Center</div>
                      <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">{hub.fullPhone}</div>
                      <div className="text-[10px] text-slate-500">Local Dial: {hub.phone}</div>
                    </div>

                    <a
                      href={`tel:${hub.phone}`}
                      className="p-3 min-h-[44px] min-w-[44px] rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20 transition-transform active:scale-95 flex items-center justify-center"
                      title={`Call ${hub.city} Center`}
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-slate-400 space-y-2 font-mono">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Working Hours: 24/7 Global Enterprise Support</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>NDA &amp; Security: ISO 27001 &amp; ISO 17100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
