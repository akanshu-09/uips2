import React, { useRef, useState } from 'react';
import { Camera, Upload, RotateCcw, Check, X, Image as ImageIcon } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AppHeader } from '@/components/common/AppHeader';
import { toast } from '@/hooks/use-toast';

const Capture = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const uploadMode = searchParams.get('upload') === 'true';
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    if (!uploadMode) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [uploadMode]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsStreaming(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageData);
      stopCamera();
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!capturedImage) return;

    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to results with mock data
    navigate('/results', { 
      state: { 
        image: capturedImage,
        breed: 'Holstein Friesian',
        confidence: 92,
        features: ['Black and white markings', 'Large udder', 'Distinctive facial structure']
      }
    });
    
    setIsProcessing(false);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <AppHeader 
        title={uploadMode ? "Upload Photo" : "Take Photo"} 
        showBack={true}
        showHelp={true}
      />

      {/* Camera/Upload Area */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {capturedImage ? (
            <div className="relative">
              <img 
                src={capturedImage} 
                alt="Captured" 
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          ) : uploadMode ? (
            <div 
              className="h-80 flex flex-col items-center justify-center bg-muted/50 cursor-pointer border-2 border-dashed border-border hover:bg-muted/70 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-foreground">Tap to select photo</p>
              <p className="text-sm text-muted-foreground">Choose from gallery</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative h-80">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {!isStreaming && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <Camera className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      {!capturedImage && (
        <Card className="bg-accent/10">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-2">📋 Instructions</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Position the animal clearly in frame</li>
              <li>• Ensure good lighting on the face</li>
              <li>• Capture side view or front face</li>
              <li>• Avoid blurry or distant shots</li>
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {capturedImage ? (
          <>
            <Button
              variant="capture"
              size="xl"
              onClick={processImage}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Identify Breed
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={uploadMode ? () => setCapturedImage(null) : retakePhoto}
              className="w-full"
            >
              <RotateCcw className="w-5 h-5" />
              {uploadMode ? 'Choose Different Photo' : 'Retake Photo'}
            </Button>
          </>
        ) : !uploadMode ? (
          <Button
            variant="capture"
            size="xl"
            onClick={capturePhoto}
            disabled={!isStreaming}
            className="w-full"
          >
            <Camera className="w-6 h-6" />
            Capture Photo
          </Button>
        ) : null}

        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="w-full"
        >
          <X className="w-4 h-4" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Capture;