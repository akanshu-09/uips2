import React, { useState } from 'react';
import { Globe, Volume2, VolumeX, Moon, Sun, Download, Trash2, Info } from 'lucide-react';
import { AppHeader } from '@/components/common/AppHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Settings = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [offlineDataSize, setOfflineDataSize] = useState('45.2 MB');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇧🇩' },
    { code: 'ur', name: 'اردو (Urdu)', flag: '🇵🇰' },
    { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
  ];

  const handleClearCache = () => {
    // Simulate cache clearing
    setOfflineDataSize('0 MB');
    setTimeout(() => setOfflineDataSize('45.2 MB'), 2000);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <AppHeader title="Settings" showBack={true} showHelp={true} />

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Language / भाषा
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Select your preferred language for the app interface
            </p>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              App will restart to apply language changes
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Audio Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            Audio Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Sound Effects</h4>
                <p className="text-sm text-muted-foreground">
                  Enable audio feedback for actions
                </p>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Display Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            Display
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Dark Mode</h4>
                <p className="text-sm text-muted-foreground">
                  Switch to dark theme for low-light conditions
                </p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Offline Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Offline Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Cached Breed Data</h4>
              <p className="text-sm text-muted-foreground">
                Stored data: {offlineDataSize}
              </p>
            </div>
            <Badge variant="secondary">
              {offlineDataSize === '0 MB' ? 'Cleared' : 'Active'}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCache}
              className="w-full"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cached Data
            </Button>
            <p className="text-xs text-muted-foreground">
              This will free up storage space but may slow down offline browsing
            </p>
          </div>
        </CardContent>
      </Card>

      {/* App Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            App Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Version</p>
              <p className="font-medium">1.0.0</p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Updated</p>
              <p className="font-medium">Sep 2024</p>
            </div>
            <div>
              <p className="text-muted-foreground">Breeds Database</p>
              <p className="font-medium">150+ Breeds</p>
            </div>
            <div>
              <p className="text-muted-foreground">AI Model</p>
              <p className="font-medium">v2.1</p>
            </div>
          </div>
          
          <div className="pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Livestock AI - Empowering Rural Communities
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Support Links */}
      <div className="space-y-2">
        <Button variant="outline" className="w-full">
          Privacy Policy
        </Button>
        <Button variant="outline" className="w-full">
          Terms of Service
        </Button>
        <Button variant="outline" className="w-full">
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default Settings;