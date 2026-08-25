import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Fingerprint, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Wifi, 
  WifiOff, 
  Sparkles,
  User,
  ChevronRight,
  PhoneCall,
  MapPin,
  Clock
} from 'lucide-react';
import { BiometricUser } from '../services/biometrics';
import { syncEngine } from '../services/dbSync';
import { HUBS_DATA } from '../data/wisdomqData';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  activeSession: BiometricUser | null;
  onOpenVault: () => void;
  onOpenDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  activeSession,
  onOpenVault,
  onOpenDashboard
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(syncEngine.isOnline);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const unsubscribe = syncEngine.subscribe((online, pending) => {
      setIsOnline(online);
      setPendingSyncCount(pending);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Estimators', href: '#calculators' },
    { label: 'Talent Bench', href: '#talent' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 sm:py-3.5 backdrop-blur-xl border-b shadow-lg shadow-black/20 ' +
              (theme === 'dark'
                ? 'bg-slate-950/90 border-slate-800/80 text-white'
                : 'bg-white/90 border-slate-200 text-slate-900')
            : 'py-3 sm:py-5 bg-slate-950/40 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none border-b border-white/5 lg:border-transparent ' +
              (theme === 'dark' ? 'text-white' : 'text-slate-900')
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Zone 1: Brand Title (Single text element with glowing emblem) */}
          <a 
            href="#home" 
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 focus-visible:outline-2 focus-visible:outline-rose-500 rounded-lg group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 p-0.5 shadow-md shadow-rose-500/30 flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-rose-500">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse text-rose-400" />
              </div>
            </div>
            <span className="font-extrabold text-base sm:text-xl tracking-tight text-white dark:text-white drop-shadow-sm flex items-center gap-1">
              Wisdom<span className="text-rose-500">Q</span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400 font-mono hidden xs:inline-block pl-1 border-l border-slate-700/60 ml-1">
                Tech
              </span>
            </span>
          </a>

          {/* Zone 2: Desktop Navigation Links (Single-line nowrap items) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-md hover:bg-white/5 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-rose-500"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (Biometric Vault, Offline/Online Indicator, Theme Toggle, Mobile Toggle) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Online/Offline Status Pill */}
            <div 
              title={isOnline ? (pendingSyncCount > 0 ? `${pendingSyncCount} changes syncing in background` : 'Online & Connected') : 'Offline Mode Active - Data queues locally in IndexedDB'}
              className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium border transition-colors ${
                isOnline 
                  ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40' 
                  : 'bg-amber-950/60 text-amber-300 border-amber-800/60 animate-pulse'
              }`}
            >
              {isOnline ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <Wifi className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Online</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <WifiOff className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Offline</span>
                </>
              )}
              {pendingSyncCount > 0 && (
                <span className="bg-amber-500/20 text-amber-300 px-1 py-0.2 rounded-full text-[9px] font-bold">
                  {pendingSyncCount}
                </span>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Light and Dark Theme"
              className="p-2 min-h-[40px] min-w-[40px] rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-slate-800/80 transition-all flex items-center justify-center focus-visible:outline-2 focus-visible:outline-rose-500"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Biometric Portal Action (Desktop / Tablet) */}
            {activeSession ? (
              <button
                onClick={onOpenDashboard}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-emerald-900/30 border border-emerald-400/30 transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-emerald-400"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
                <span className="truncate max-w-[100px] sm:max-w-[140px]">{activeSession.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                onClick={onOpenVault}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-rose-600/30 border border-rose-400/30 transition-all active:scale-95 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-rose-400"
              >
                <Fingerprint className="w-4 h-4 text-rose-200" />
                <span>Client Vault</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 min-h-[40px] min-w-[40px] rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-slate-800 transition-colors flex items-center justify-center focus-visible:outline-2 focus-visible:outline-rose-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu & Overlay Backdrop */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-start">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="relative z-10 w-full max-h-[92dvh] overflow-y-auto bg-slate-950/98 border-b border-slate-800 shadow-2xl p-5 pt-20 animate-in slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Navigation Menu</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 text-base font-semibold text-slate-200 hover:text-rose-400 hover:bg-slate-900/90 rounded-xl transition-colors min-h-[44px]"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              ))}
            </div>

            {/* Quick Regional Hotlines within Mobile Menu */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-400 block px-1">
                Instant Telephone Hotlines
              </span>
              <div className="grid grid-cols-2 gap-2">
                {HUBS_DATA.map((hub) => (
                  <a
                    key={hub.city}
                    href={`tel:${hub.phone}`}
                    className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/50 flex flex-col transition-colors min-h-[44px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-white uppercase">{hub.city} Hub</span>
                      <PhoneCall className="w-3 h-3 text-rose-400" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-0.5">{hub.phone}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-4 mt-4 border-t border-slate-800 flex flex-col gap-2">
              {activeSession ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDashboard();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 min-h-[44px] bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-950/40"
                >
                  <User className="w-4 h-4" />
                  <span>Open Client Dashboard ({activeSession.name.split(' ')[0]})</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenVault();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 min-h-[44px] bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-rose-950/40"
                >
                  <Fingerprint className="w-4 h-4" />
                  <span>Authenticate Biometric Vault</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
