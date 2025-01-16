import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button, ButtonProps } from '@/components/ui/button';
import { Input, InputProps } from '@/components/ui/input';
import { Alert, AlertDescription, AlertProps } from '@/components/ui/alert';
import { ArrowRight, ArrowLeft, CheckCircle, XCircle, Loader } from 'lucide-react';
import { tarotDeck, TarotCard } from './tarot-data';

interface ApprovedCard extends TarotCard {
  imageUrl: string;
  approvedAt: string;
}

const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

const TarotDeckCreator = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [approvedCards, setApprovedCards] = useLocalStorage('approvedCards', []);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState<string>('');

  const generatePrompt = useCallback((cardInfo: TarotCard) => {
    const basePrompt = `Create a mystical tarot card in blacklight neon style with dark background. ${cardInfo.name} showing ${cardInfo.description} in electric blues, magentas, and cosmic purples. Include ornate glowing frame with mystical symbols. Style: Highly detailed digital art with luminous effects, similar to synthwave aesthetic.`;
    return userPrompt ? `${basePrompt} Additional instructions: ${userPrompt}` : basePrompt;
  }, [userPrompt]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{tarotDeck[currentCard].name}</CardTitle>
        <div className="text-sm text-gray-500">
          Card {currentCard + 1} of {tarotDeck.length} | {approvedCards.length} approved
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex flex-col space-y-4">
          <Input
            value={userPrompt}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserPrompt(e.target.value)}
            placeholder="Enter additional image generation instructions..."
          />
          
          <div className="flex justify-center p-4 bg-gray-100 rounded-lg">
            {isGenerating ? (
              <div className="flex items-center justify-center h-96 w-64">
                <Loader className="animate-spin w-8 h-8" />
              </div>
            ) : generatedImage ? (
              <img
                src={generatedImage}
                alt={tarotDeck[currentCard].name}
                className="rounded shadow-lg max-h-96 object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-96 w-64 bg-gray-200 rounded">
                Click Generate to create card
              </div>
            )}
          </div>

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: generatePrompt(tarotDeck[currentCard]),
          size: "1024x1792",
          quality: "hd",
          style: "vivid"
        })
      });
      
      if (!response.ok) {
        throw new Error(await response.text());
      }
      
      const data = await response.json();
      setGeneratedImage(data.imageUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApprove = () => {
    setApprovedCards([...approvedCards, {
      ...tarotDeck[currentCard],
      imageUrl: generatedImage,
      approvedAt: new Date().toISOString()
    }]);
    setCurrentCard(prev => Math.min(prev + 1, tarotDeck.length - 1));
    setGeneratedImage(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{tarotDeck[currentCard].name}</CardTitle>
        <div className="text-sm text-gray-500">
          Card {currentCard + 1} of {tarotDeck.length} | {approvedCards.length} approved
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex justify-center p-4 bg-gray-100 rounded-lg">
          {isGenerating ? (
            <div className="flex items-center justify-center h-96 w-64">
              <Loader className="animate-spin w-8 h-8" />
            </div>
          ) : generatedImage ? (
            <img
              src={generatedImage}
              alt={tarotDeck[currentCard].name}
              className="rounded shadow-lg max-h-96 object-contain"
            />
          ) : (
            <div className="flex items-center justify-center h-96 w-64 bg-gray-200 rounded">
              Click Generate to create card
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={() => setCurrentCard(prev => Math.max(0, prev - 1))}
            disabled={currentCard === 0}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="space-x-2">
            <Button
              onClick={handleGenerateImage}
              disabled={isGenerating}
              variant="default"
            >
              {isGenerating ? 'Generating...' : 'Generate'}
            </Button>
            
            <Button
              onClick={handleApprove}
              disabled={!generatedImage || isGenerating}
              variant="outline"
              className="bg-green-50"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
            
            <Button
              onClick={() => setGeneratedImage(null)}
              disabled={!generatedImage || isGenerating}
              variant="outline"
              className="bg-red-50"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </div>

          <Button
            onClick={() => setCurrentCard(prev => Math.min(prev + 1, tarotDeck.length - 1))}
            disabled={currentCard === tarotDeck.length - 1}
            variant="outline"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TarotDeckCreator;
