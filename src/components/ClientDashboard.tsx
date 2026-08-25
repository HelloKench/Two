import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  User, 
  Briefcase, 
  Languages, 
  Download, 
  LogOut, 
  Clock, 
  FileText, 
  HardDrive, 
  CheckCircle2, 
  PlusCircle,
  X,
  ExternalLink,
  Key,
  Smartphone,
  Lock
} from 'lucide-react';
import { BiometricUser, biometricAuth } from '../services/biometrics';
import { syncEngine } from '../services/dbSync';

interface ClientDashboardProps {
  user: BiometricUser;
  onLogout: () => void;
  onClose: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  user,
  onLogout,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'documents' | 'security'>('pipeline');
  const [newTicketText, setNewTicketText] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const activeProjects = [
    {
      id: 'PRJ-8819',
      title: 'Automotive SOP French Translation (42,000 words)',
      category: 'Localization',
      progress: 85,
      leadLinguist: 'Camille Dubois (DALF C2)',
      slaRemaining: '18 Hours',
      status: 'Dual-Review Phase'
    },
    {
      id: 'PRJ-9042',
      title: 'Bilingual Japanese Cloud Pod Deployment (2 Engineers)',
      category: 'Staffing',
      progress: 95,
      leadLinguist: 'Hiroshi T. (JLPT N1)',
      slaRemaining: 'Interview Complete',
      status: 'Onboarding 48h'
    },
    {
      id: 'PRJ-7712',
      title: 'Executive IELTS Band 8.0 Corporate Track (Cohort A)',
      category: 'Coaching',
      progress: 60,
      leadLinguist: 'Senior British Council Certified Examiner',
      slaRemaining: 'Week 4 of 6',
      status: 'Mock 3 Complete'
    }
  ];

  const cachedDocuments = [
    {
      name: 'WisdomQ_Master_Services_Agreement_2026.pdf',
      size: '2.4 MB',
      type: 'Legal Contract',
      offlineCached: true,
      lastSync: 'Today, 10:14 AM'
    },
    {
      name: 'ISO_17100_Translation_Certificate_Standard.pdf',
      size: '1.1 MB',
      type: 'Compliance',
      offlineCached: true,
      lastSync: 'Yesterday'
    },
    {
      name: 'Bilingual_Talent_Dossier_Candidate_Camille.pdf',
      size: '3.8 MB',
      type: 'NDA Talent File',
      offlineCached: true,
      lastSync: '2 days ago'
    }
  ];

  const handleDispatchTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketText.trim()) return;

    await syncEngine.enqueue('contact_ticket', {
      userEmail: user.email,
      userName: user.name,
      ticketBody: newTicketText,
      priority: 'high',
      submittedAt: Date.now()
    }, 'support');

    setTicketSent(true);
    setNewTicketText('');
    setTimeout(() => setTicketSent(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/90 rounded-t-3xl sm:rounded-3xl max-w-4xl w-full max-h-[95dvh] sm:max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Dashboard Top Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3 sm:gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-0.5 shadow-md flex items-center justify-center text-white shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="text-base sm:text-xl font-bold text-white tracking-tight">{user.name}</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] sm:text-[10px] font-mono font-bold border border-emerald-500/20 whitespace-nowrap">
                  Authenticated
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-mono truncate max-w-[240px] sm:max-w-none">
                {user.company || 'Enterprise Client'} &bull; {user.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                biometricAuth.logout();
                onLogout();
              }}
              className="px-3 py-2 min-h-[38px] rounded-xl bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 min-h-[38px] min-w-[38px] rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Scrollable on small viewports) */}
        <div className="flex px-4 sm:px-6 pt-3 border-b border-slate-800 bg-slate-950/50 gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'pipeline'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4 shrink-0" />
            <span>Active Pipeline ({activeProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'documents'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Vault Documents (Offline Ready)</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-4 h-4 shrink-0" />
            <span>Hardware Passkeys</span>
          </button>
        </div>

        {/* Dashboard Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: PIPELINE */}
          {activeTab === 'pipeline' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400">
                  Real-time SLA Tracking
                </h4>
                <span className="text-xs text-emerald-400 font-mono">3 Engagements on Schedule</span>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {activeProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-800/40 mr-2">
                          {project.id}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {project.category}
                        </span>
                        <h5 className="text-sm sm:text-base font-bold text-white mt-1">
                          {project.title}
                        </h5>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800/40 inline-block">
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                        <span>Milestone Progress</span>
                        <span className="text-white font-bold">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-rose-500 to-rose-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-850 gap-2">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        <span>Lead: <strong className="text-slate-200">{project.leadLinguist}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-rose-400 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>SLA Window: {project.slaRemaining}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instant Priority Escalation Ticket Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800/90 mt-6">
                <h5 className="text-xs font-mono font-bold uppercase text-slate-300 mb-2 flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-rose-400" />
                  <span>Transmit Priority Escalation or Scope Change</span>
                </h5>
                <form onSubmit={handleDispatchTicket} className="space-y-3">
                  <textarea
                    rows={2}
                    value={newTicketText}
                    onChange={(e) => setNewTicketText(e.target.value)}
                    placeholder="Describe expedited request or additional candidate requirement..."
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                  {ticketSent && (
                    <p className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Escalation queued and dispatched to account director.</span>
                    </p>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2.5 min-h-[40px] rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
                  >
                    Transmit Escalation
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400">
                  Encrypted Offline Document Cache
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>Available Offline in IndexedDB</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {cachedDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-wrap items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-400 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white tracking-tight">{doc.name}</h5>
                        <p className="text-xs text-slate-400 font-mono">
                          {doc.type} &bull; {doc.size} &bull; Synced {doc.lastSync}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Opening secure cached file: ${doc.name}`)}
                      className="px-3.5 py-2 min-h-[38px] rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-rose-400" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HARDWARE SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-400">
                Active FIDO2 Hardware Credentials
              </h4>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="font-bold text-white">Registered Device Key:</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">{user.credentialId ? 'Hardware Enclave Bound' : 'Virtual Passkey'}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Bound Identifier:</span>
                  <strong className="text-white font-mono">{user.email}</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Cryptographic Standard:</span>
                  <strong className="text-white font-mono">WebAuthn ES256 / FIDO2</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Last Authenticated:</span>
                  <strong className="text-white font-mono">{new Date(user.lastLogin).toLocaleTimeString()}</strong>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  All communications and document transfers inside the WisdomQ Enterprise Portal are protected by end-to-end passkey challenge-response validation.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
