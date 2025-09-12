import React from 'react';
import { Camera, Upload, Search, Wifi, WifiOff, HelpCircle, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppHeader } from '@/components/common/AppHeader';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Help = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I take a good photo for breed identification?",
      answer: "For best results: 1) Take photos in good lighting, 2) Capture the animal's face or side profile clearly, 3) Get close enough to see facial features, 4) Keep the animal calm and still, 5) Avoid shadows on the face."
    },
    {
      question: "What should I do if the confidence score is low?",
      answer: "Low confidence (below 60%) suggests the photo quality could be improved. Try taking another photo with better lighting, a different angle, or closer to the animal. You can also browse breeds manually to compare."
    },
    {
      question: "Can I use the app without internet?",
      answer: "The app works offline for browsing breeds you've already viewed. However, new breed identification requires an internet connection. Photos taken offline will be analyzed when you reconnect."
    },
    {
      question: "Which animals can the app identify?",
      answer: "Currently supports 150+ cattle and buffalo breeds from around the world, including indigenous and commercial breeds. The app works best with clear photos of adult animals."
    },
    {
      question: "How accurate is the breed identification?",
      answer: "Our AI model achieves 95% accuracy under good conditions. Accuracy depends on photo quality, lighting, and the clarity of breed-specific features in the image."
    }
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <AppHeader title="Help & Instructions" showBack={true} showSettings={true} />

      {/* Quick Start Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Quick Start Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <h4 className="font-medium">Take or Upload Photo</h4>
                <p className="text-sm text-muted-foreground">Use camera or select from gallery</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <h4 className="font-medium">Review Photo Quality</h4>
                <p className="text-sm text-muted-foreground">Ensure face/features are clear</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <h4 className="font-medium">Get Results</h4>
                <p className="text-sm text-muted-foreground">View breed identification and confidence score</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Features */}
      <Card>
        <CardHeader>
          <CardTitle>App Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5 text-primary" />
            <div>
              <h4 className="font-medium">Camera Capture</h4>
              <p className="text-sm text-muted-foreground">Take photos directly with your device</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Upload className="w-5 h-5 text-primary" />
            <div>
              <h4 className="font-medium">Gallery Upload</h4>
              <p className="text-sm text-muted-foreground">Select existing photos from gallery</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-primary" />
            <div>
              <h4 className="font-medium">Manual Search</h4>
              <p className="text-sm text-muted-foreground">Browse and search breed database</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <WifiOff className="w-5 h-5 text-primary" />
            <div>
              <h4 className="font-medium">Offline Support</h4>
              <p className="text-sm text-muted-foreground">Basic functionality without internet</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Tips */}
      <Card className="bg-accent/10">
        <CardHeader>
          <CardTitle>📸 Photo Tips for Best Results</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Take photos during daylight or with good artificial lighting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Capture the animal's face or side profile clearly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Fill the frame with the animal's head and shoulders</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Ensure the animal is calm and relatively still</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">✗</span>
              <span>Avoid blurry, dark, or distant photos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">✗</span>
              <span>Don't capture only the animal's back or feet</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Support */}
      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            If you're still having trouble, try these options:
          </p>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="w-4 h-4" />
              Contact Support Team
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/search')}
            >
              <Search className="w-4 h-4" />
              Browse Breed Database
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;