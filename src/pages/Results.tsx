import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Camera, Search, Share2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppHeader } from '@/components/common/AppHeader';
import { Badge } from '@/components/ui/badge';

interface ResultsData {
  image: string;
  breed: string;
  confidence: number;
  features: string[];
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as ResultsData;

  if (!data) {
    navigate('/');
    return null;
  }

  const { image, breed, confidence, features } = data;
  const isHighConfidence = confidence >= 80;
  const isMediumConfidence = confidence >= 60;

  return (
    <div className="space-y-4 animate-fade-in">
      <AppHeader title="Breed Identification" showBack={true} />

      {/* Captured Image */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <img 
            src={image} 
            alt="Analyzed animal" 
            className="w-full h-48 object-cover"
          />
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            {isHighConfidence ? (
              <CheckCircle className="w-5 h-5 text-success" />
            ) : (
              <AlertCircle className="w-5 h-5 text-warning" />
            )}
            Identified Breed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{breed}</h2>
            <div className="flex items-center gap-2 mt-2">
              <Badge 
                variant={isHighConfidence ? "default" : isMediumConfidence ? "secondary" : "destructive"}
                className="text-sm"
              >
                {confidence}% Confidence
              </Badge>
              <span className="text-sm text-muted-foreground">
                {isHighConfidence ? "High accuracy" : isMediumConfidence ? "Medium accuracy" : "Low accuracy"}
              </span>
            </div>
          </div>

          {/* Confidence Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Confidence Level</span>
              <span>{confidence}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  isHighConfidence 
                    ? 'bg-success' 
                    : isMediumConfidence 
                    ? 'bg-warning' 
                    : 'bg-destructive'
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Identifying Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Accuracy Notice */}
      {!isHighConfidence && (
        <Card className="bg-warning/10 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <p className="font-medium text-warning-foreground">
                  {confidence < 60 ? 'Low confidence result' : 'Medium confidence result'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Consider taking another photo with better lighting or a different angle for more accurate results.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/capture')}
            className="flex-1"
          >
            <Camera className="w-4 h-4" />
            New Photo
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/search')}
            className="flex-1"
          >
            <Search className="w-4 h-4" />
            Browse Breeds
          </Button>
        </div>

        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate(`/breed-info/${breed.toLowerCase().replace(/\s+/g, '-')}`)}
          className="w-full"
        >
          <BookOpen className="w-5 h-5" />
          Learn More About {breed}
        </Button>

        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="w-full"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default Results;