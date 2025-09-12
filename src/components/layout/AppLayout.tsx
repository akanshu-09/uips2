import React from 'react';
import { Outlet } from 'react-router-dom';
import { Wifi, WifiOff } from 'lucide-react';

export const AppLayout = () => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Connectivity Status Bar */}
      <div className={`w-full px-4 py-2 text-center text-sm font-medium ${
        isOnline 
          ? 'bg-success text-success-foreground' 
          : 'bg-warning text-warning-foreground'
      }`}>
        <div className="flex items-center justify-center gap-2">
          {isOnline ? (
            <>
              <Wifi className="w-4 h-4" />
              <span>Online - Data syncing</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4" />
              <span>Offline - Data will sync when connected</span>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-md">
        <Outlet />
      </main>
    </div>
  );
};