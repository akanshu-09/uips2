import React from 'react';
import { Camera, Upload, Search, HelpCircle, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-cow.jpg';
import cattleBackground from '@/assets/cattle-background.jpg';
import appIcon from '@/assets/app-icon.jpg';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* App Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={appIcon} 
            alt="Livestock AI" 
            className="w-10 h-10 rounded-xl shadow-md"
          />
          <div>
            <h1 className="text-xl font-bold text-foreground">Livestock AI</h1>
            <p className="text-sm text-muted-foreground">Breed Recognition Tool</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/help')}
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <Card className="overflow-hidden shadow-lg">
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${cattleBackground})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-2xl font-bold mb-2 drop-shadow-lg">Identify Cattle & Buffalo Breeds</h2>
              <p className="text-base opacity-95 drop-shadow-md">Take a photo to get instant results</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Actions */}
      <div className="space-y-4">
        <Button
          variant="capture"
          size="xl"
          onClick={() => navigate('/capture')}
          className="w-full"
        >
          <Camera className="w-6 h-6" />
          Take Photo
        </Button>

        <Button
          variant="large"
          size="lg"
          onClick={() => navigate('/capture?upload=true')}
          className="w-full"
        >
          <Upload className="w-5 h-5" />
          Upload from Gallery
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/search')}
          className="w-full"
        >
          <Search className="w-5 h-5" />
          Browse Breeds Manually
        </Button>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">150+</p>
              <p className="text-sm text-muted-foreground">Breeds Supported</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">95%</p>
              <p className="text-sm text-muted-foreground">Accuracy Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-2">📸 Photo Tips</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Take clear photos of the animal's face or side</li>
            <li>• Ensure good lighting (avoid shadows)</li>
            <li>• Get close enough to see facial features</li>
            <li>• Keep the animal calm and still</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;