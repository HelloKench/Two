import React from 'react';
import { 
  Home, 
  Calculator, 
  Users, 
  Fingerprint, 
  PhoneCall, 
  ShieldCheck,
  Layers
} from 'lucide-react';
import { BiometricUser } from '../services/biometrics';

interface MobileActionDockProps {
  activeSession: BiometricUser | null;
  onOpenVault: () => void;
  onOpenDashboard: () => void;
  onOpenEstimator: () => void;
}

export const MobileActionDock: React.FC<MobileActionDockProps> = ({
  activeSession,
  onOpenVault,
  onOpenDashboard,
  onOpenEstimator,
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside 
      aria-label="Mobile quick navigation dock"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 bg-slate-950/90 dark:bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/90 shadow-[0_-8px_30px_rgba(0,0,0,0.6)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1 items-center justify-around">
        {/* Home */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-400 hover:text-white active:bg-slate-800/80 active:scale-95 transition-all text-center"
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight whitespace-nowrap">Home</span>
        </button>

        {/* Services */}
        <button
          onClick={() => scrollToSection('services')}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-400 hover:text-white active:bg-slate-800/80 active:scale-95 transition-all text-center"
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight whitespace-nowrap">Services</span>
        </button>

        {/* Center Primary Action: Estimator */}
        <button
          onClick={() => {
            scrollToSection('calculators');
            onOpenEstimator();
          }}
          className="flex flex-col items-center justify-center py-1 px-1 -mt-3 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-rose-700 text-white shadow-lg shadow-rose-600/40 border border-rose-400/40 active:scale-90 transition-transform text-center"
        >
          <Calculator className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-bold uppercase tracking-wider whitespace-nowrap">Estimate</span>
        </button>

        {/* Talent Bench */}
        <button
          onClick={() => scrollToSection('talent')}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-400 hover:text-white active:bg-slate-800/80 active:scale-95 transition-all text-center"
        >
          <Users className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight whitespace-nowrap">Talent</span>
        </button>

        {/* Vault / Dashboard */}
        {activeSession ? (
          <button
            onClick={onOpenDashboard}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-emerald-400 hover:text-emerald-300 active:bg-emerald-950/40 active:scale-95 transition-all text-center"
          >
            <ShieldCheck className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-medium tracking-tight whitespace-nowrap truncate max-w-[55px]">Portal</span>
          </button>
        ) : (
          <button
            onClick={onOpenVault}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-rose-400 hover:text-rose-300 active:bg-rose-950/40 active:scale-95 transition-all text-center"
          >
            <Fingerprint className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-medium tracking-tight whitespace-nowrap">Vault</span>
          </button>
        )}
      </div>
    </aside>
  );
};
