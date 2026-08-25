import React, { useState, useEffect } from 'react';
import { 
  Fingerprint, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Key, 
  Smartphone, 
  AlertCircle,
  ScanFace
} from 'lucide-react';
import { biometricAuth, BiometricUser } from '../services/biometrics';

interface BiometricVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: BiometricUser) => void;
}

export const BiometricVaultModal: React.FC<BiometricVaultModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlatformSupported, setIsPlatformSupported] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Registration fields
  const [name, setName] = useState('Enterprise Partner');
  const [email, setEmail] = useState('director@enterprise-client.com');
  const [company, setCompany] = useState('Global Systems Corp');
  const [role, setRole] = useState<BiometricUser['role']>('Enterprise Client');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      biometricAuth.isPlatformAuthenticatorAvailable().then(avail => {
        setIsPlatformSupported(avail);
      });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBiometricAuth = async () => {
    setIsScanning(true);
    setErrorMessage('');
    setScanProgress(15);

    const interval = setInterval(() => {
      setScanProgress(p => (p >= 90 ? 90 : p + 25));
    }, 120);

    try {
      if (mode === 'login') {
        const res = await biometricAuth.authenticateBiometric(email);
        clearInterval(interval);
        setScanProgress(100);
        if (res.success && res.user) {
          setTimeout(() => {
            setIsScanning(false);
            onSuccess(res.user!);
            onClose();
          }, 350);
        } else {
          setIsScanning(false);
          setErrorMessage(res.error || 'Authentication challenge failed.');
        }
      } else {
        const res = await biometricAuth.registerBiometricPasskey(name, email, role, company);
        clearInterval(interval);
        setScanProgress(100);
        if (res.success && res.user) {
          setTimeout(() => {
            setIsScanning(false);
            onSuccess(res.user!);
            onClose();
          }, 350);
        } else {
          setIsScanning(false);
          setErrorMessage(res.error || 'Failed to register Passkey.');
        }
      }
    } catch (err) {
      clearInterval(interval);
      setIsScanning(false);
      setErrorMessage(err instanceof Error ? err.message : 'Biometric sensor error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={isScanning ? undefined : onClose} 
      />

      <div className="relative z-10 bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-3xl max-w-md w-full p-5 sm:p-8 max-h-[92dvh] overflow-y-auto shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-2 duration-300">
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-rose-600/20 blur-3xl rounded-full pointer-events-none" />

        <button
          onClick={onClose}
          disabled={isScanning}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 min-h-[40px] min-w-[40px] rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-slate-950 border border-rose-500/30 text-rose-500 shadow-lg shadow-rose-950/40 mb-3">
            <Fingerprint className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            WisdomQ Biometric Vault
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            FIDO2 / WebAuthn Passkey Hardware Security Enclave
          </p>
        </div>

        {/* Tab Toggle Login / Register */}
        <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2.5 min-h-[40px] text-xs font-semibold rounded-lg transition-all ${
              mode === 'login' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Passkey Login
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2.5 min-h-[40px] text-xs font-semibold rounded-lg transition-all ${
              mode === 'register' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Register Device Key
          </button>
        </div>

        {/* Hardware Status Banner */}
        <div className="mb-5 p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>Biometric Hardware:</span>
          </span>
          <span className={`font-bold ${isPlatformSupported ? 'text-emerald-400' : 'text-sky-400'}`}>
            {isPlatformSupported ? 'Touch ID / Face ID Active' : 'FIDO2 Emulation Active'}
          </span>
        </div>

        {/* Form Fields */}
        <div className="space-y-3.5 mb-6">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1">
                  Full Name / Title
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1">
                  Access Classification
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as BiometricUser['role'])}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none min-h-[44px]"
                >
                  <option value="Enterprise Client">Enterprise Client (Full Dashboard)</option>
                  <option value="Certified Linguist">Certified Linguist (Translation Portal)</option>
                  <option value="Talent Candidate">Talent Candidate (Requisition Dossier)</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1">
              {mode === 'login' ? 'Registered User Email' : 'Passkey Bound Email'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none min-h-[44px]"
            />
          </div>
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/70 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Biometric Scanning Animation State */}
        {isScanning && (
          <div className="mb-5 p-4 rounded-2xl bg-slate-950 border border-rose-500/50 text-center space-y-2 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-rose-400">
              <ScanFace className="w-5 h-5 animate-bounce" />
              <span>Prompting Biometric Hardware Sensor...</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-rose-500 h-full transition-all duration-200"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              Touch ID / Face ID / Android Biometric Prompt
            </div>
          </div>
        )}

        {/* Main Action Button */}
        <button
          type="button"
          onClick={handleBiometricAuth}
          disabled={isScanning}
          className="w-full py-3.5 px-5 min-h-[48px] rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm shadow-xl shadow-rose-600/30 border border-rose-400/30 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Fingerprint className="w-5 h-5" />
          <span>
            {mode === 'login' ? 'Authenticate with Passkey / Face ID' : 'Enroll Biometric Hardware Key'}
          </span>
        </button>

        <div className="mt-4 text-center">
          <p className="text-[11px] text-slate-500">
            Encrypted with WebAuthn ES256 &bull; Zero Server Passwords
          </p>
        </div>
      </div>
    </div>
  );
};
