import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, AlertCircle, HardDrive } from 'lucide-react';
import { syncEngine, QueuedRequest } from '../services/dbSync';

export const OfflineSyncBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState(syncEngine.isOnline);
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedRecently, setSyncedRecently] = useState(false);

  useEffect(() => {
    const unsubscribe = syncEngine.subscribe((online, pending) => {
      setIsOnline(online);
      setPendingCount(pending);

      if (online && pending === 0 && !isSyncing) {
        setSyncedRecently(true);
        const timer = setTimeout(() => setSyncedRecently(false), 3500);
        return () => clearTimeout(timer);
      }
    });

    return () => unsubscribe();
  }, [isSyncing]);

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      await syncEngine.syncPendingQueue();
      setSyncedRecently(true);
      setTimeout(() => setSyncedRecently(false), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  // Do not render anything if fully online and no pending items and not recently synced
  if (isOnline && pendingCount === 0 && !syncedRecently) {
    return null;
  }

  return (
    <div className="fixed bottom-20 sm:bottom-4 left-3 right-3 sm:left-4 sm:right-auto z-40 max-w-sm sm:w-auto animate-in slide-in-from-bottom-5 duration-300">
      <div className={`p-3 sm:p-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all ${
        !isOnline 
          ? 'bg-amber-950/95 border-amber-500/50 text-amber-200 shadow-amber-950/50'
          : pendingCount > 0
          ? 'bg-slate-900/95 border-rose-500/50 text-slate-100 shadow-rose-950/30'
          : 'bg-emerald-950/95 border-emerald-500/50 text-emerald-200 shadow-emerald-950/50'
      }`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              !isOnline ? 'bg-amber-500/20 text-amber-400' : pendingCount > 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {!isOnline ? (
                <WifiOff className="w-4 h-4" />
              ) : isSyncing ? (
                <RefreshCw className="w-4 h-4 animate-spin text-rose-400" />
              ) : pendingCount > 0 ? (
                <HardDrive className="w-4 h-4" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
            </div>

            <div>
              <p className="text-xs font-bold leading-tight flex items-center gap-1.5">
                {!isOnline 
                  ? 'Offline Mode Active' 
                  : pendingCount > 0 
                  ? `Syncing (${pendingCount} queued)` 
                  : 'All Changes Synchronized'}
              </p>
              <p className="text-[11px] opacity-85 leading-tight mt-0.5">
                {!isOnline 
                  ? 'Submissions & quotes cached in IndexedDB'
                  : pendingCount > 0
                  ? 'Connecting to WisdomQ Cloud...'
                  : 'Local cache matches central database'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {pendingCount > 0 && isOnline && (
              <button
                onClick={handleManualSync}
                disabled={isSyncing}
                className="px-2.5 py-1.5 min-h-[34px] rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold shadow transition-all active:scale-95 disabled:opacity-50"
              >
                {isSyncing ? 'Syncing...' : 'Sync Now'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
