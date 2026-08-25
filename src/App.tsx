import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { InteractiveCalculators } from './components/InteractiveCalculators';
import { TalentBench } from './components/TalentBench';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BiometricVaultModal } from './components/BiometricVaultModal';
import { ClientDashboard } from './components/ClientDashboard';
import { OfflineSyncBanner } from './components/OfflineSyncBanner';
import { MobileActionDock } from './components/MobileActionDock';
import { biometricAuth, BiometricUser } from './services/biometrics';
import { TalentProfile } from './data/wisdomqData';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSession, setActiveSession] = useState<BiometricUser | null>(null);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [estimatorInitialTab, setEstimatorInitialTab] = useState<'translation' | 'staffing' | 'coaching'>('translation');
  const [selectedTalentModal, setSelectedTalentModal] = useState<TalentProfile | null>(null);

  // Initialize session & theme
  useEffect(() => {
    const session = biometricAuth.getActiveSession();
    if (session) {
      setActiveSession(session);
    }

    const savedTheme = localStorage.getItem('wisdomq_theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('wisdomq_theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.classList.toggle('light', nextTheme === 'light');
  };

  const handleServiceSelectForQuote = (serviceId: string) => {
    if (serviceId === 'staffing') {
      setEstimatorInitialTab('staffing');
    } else if (serviceId === 'coaching' || serviceId === 'skills') {
      setEstimatorInitialTab('coaching');
    } else {
      setEstimatorInitialTab('translation');
    }
  };

  const handleOpenEstimator = () => {
    const el = document.getElementById('calculators');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Navbar Contract */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        activeSession={activeSession}
        onOpenVault={() => setIsVaultOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      {/* Main Content Surfaces */}
      <main className="w-full overflow-x-hidden">
        <HeroSection
          onOpenEstimator={handleOpenEstimator}
          onOpenVault={() => {
            if (activeSession) {
              setIsDashboardOpen(true);
            } else {
              setIsVaultOpen(true);
            }
          }}
        />

        <AboutSection />

        <ServicesSection onSelectServiceForQuote={handleServiceSelectForQuote} />

        <InteractiveCalculators initialTab={estimatorInitialTab} />

        <TalentBench
          onSelectTalent={(talent) => {
            setSelectedTalentModal(talent);
          }}
        />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile-Friendly Floating Quick Navigation Dock */}
      <MobileActionDock
        activeSession={activeSession}
        onOpenVault={() => setIsVaultOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenEstimator={handleOpenEstimator}
      />

      {/* Persistent Offline Sync & Network Banner */}
      <OfflineSyncBanner />

      {/* Biometric Vault Login / Enrollment Modal */}
      <BiometricVaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        onSuccess={(user) => {
          setActiveSession(user);
          setIsDashboardOpen(true);
        }}
      />

      {/* Authenticated Client & Linguist Dashboard */}
      {isDashboardOpen && activeSession && (
        <ClientDashboard
          user={activeSession}
          onLogout={() => {
            setActiveSession(null);
            setIsDashboardOpen(false);
          }}
          onClose={() => setIsDashboardOpen(false)}
        />
      )}
    </div>
  );
}
