// components/TarotDeckCreator.tsx
import React, { useState } from 'react';
import { useImageGeneration } from '../hooks/useImageGeneration';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertDialog } from '@/components/ui/alert-dialog';

export const TarotDeckCreator = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const imageGeneration = useImageGeneration();

  const handleGenerateImage = async () => {
    try {
      const imageUrl = await imageGeneration.mutateAsync(prompt);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  // Rest of the component code remains the same
};
