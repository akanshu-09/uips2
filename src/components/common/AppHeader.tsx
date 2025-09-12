import React from 'react';
import { ArrowLeft, Settings, HelpCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import appIcon from '@/assets/app-icon.jpg';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  showSettings?: boolean;
  showHelp?: boolean;
}

export const AppHeader = ({ title, showBack = false, showSettings = false, showHelp = false }: AppHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="flex items-center justify-between p-4 bg-card border-b border-border">
      <div className="flex items-center gap-3">
        {showBack ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        ) : (
          <img 
            src={appIcon} 
            alt="Livestock AI" 
            className="w-8 h-8 rounded-lg"
          />
        )}
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {showHelp && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/help')}
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
        )}
        {showSettings && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </Button>
        )}
      </div>
    </header>
  );
};