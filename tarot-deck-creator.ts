// api-utils.ts
import axios from 'axios';

export const generateImage = async (prompt: string) => {
  try {
    const response = await axios.post('/api/dalle', { prompt });
    return response.data.imageUrl;
  } catch (error) {
    throw new Error('Image generation failed');
  }
};

// complete-tarot-deck.ts
export interface TarotCard {
  id: number;
  name: string;
  type: 'major' | 'minor';
  suit?: string;
  description: string;
  promptTemplate: string;
  imageUrl?: string;
}

export const tarotDeck: TarotCard[] = [
  {
    id: 0,
    name: 'The Fool',
    type: 'major',
    description: 'New beginnings, innocence, spontaneity',
    promptTemplate: 'A cosmic traveler in neon robes stepping into starlit void with glowing geometric patterns...'
  },
  // ... [Additional 77 cards with similar structure]
];

// dalle-api-integration.ts
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateDalleImage(prompt: string) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });
    return response.data[0].url;
  } catch (error) {
    console.error('DALL-E API error:', error);
    throw error;
  }
}

// dalle-api.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { generateDalleImage } from './dalle-api-integration';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    const imageUrl = await generateDalleImage(prompt);
    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Image generation failed' });
  }
}

// database-schema.ts
export interface SavedCard {
  id: string;
  cardId: number;
  imageUrl: string;
  generatedAt: Date;
  approved: boolean;
}

export interface DeckProgress {
  userId: string;
  completedCards: number;
  lastModified: Date;
  savedCards: SavedCard[];
}

// tarot-data.ts
export const suits = ['Wands', 'Cups', 'Swords', 'Pentacles'];
export const courts = ['Page', 'Knight', 'Queen', 'King'];
export const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

// tarot-deck-creator.tsx
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { generateImage } from './api-utils';
import { tarotDeck, TarotCard } from './complete-tarot-deck';

export default function TarotDeckCreator() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [approvedCards, setApprovedCards] = useState<Map<number, string>>(new Map());

  const currentCard = tarotDeck[currentCardIndex];

  const { mutate: generateCardImage, isLoading } = useMutation({
    mutationFn: (prompt: string) => generateImage(prompt),
    onSuccess: (imageUrl) => {
      setApprovedCards(prev => new Map(prev.set(currentCard.id, imageUrl)));
    },
  });

  const handleGenerateImage = () => {
    generateCardImage(currentCard.promptTemplate);
  };

  const handleNextCard = () => {
    if (currentCardIndex < tarotDeck.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Blacklight Tarot Creator</h1>
        
        <div className="mb-6">
          <h2 className="text-xl mb-2">{currentCard.name}</h2>
          <p className="text-gray-600 mb-4">{currentCard.description}</p>
          
          {approvedCards.has(currentCard.id) && (
            <img 
              src={approvedCards.get(currentCard.id)} 
              alt={currentCard.name}
              className="w-full max-w-md mx-auto mb-4"
            />
          )}
          
          <div className="flex gap-4">
            <Button 
              onClick={handleGenerateImage}
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Image'}
            </Button>
            
            <Button 
              onClick={handleNextCard}
              disabled={!approvedCards.has(currentCard.id)}
              variant="outline"
            >
              Next Card
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-bold mb-2">Progress</h3>
          <p>{approvedCards.size} of {tarotDeck.length} cards completed</p>
        </div>
      </Card>
    </div>
  );
}

// updated-tarot-component.tsx
// This file extends tarot-deck-creator.tsx with additional features
import { useState } from 'react';
import { SavedCard, DeckProgress } from './database-schema';

interface ExtendedProps {
  onExport?: (cards: SavedCard[]) => void;
  onSaveProgress?: (progress: DeckProgress) => void;
}

export function ExtendedTarotDeckCreator({ onExport, onSaveProgress }: ExtendedProps) {
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  
  const handleExport = () => {
    if (onExport && savedCards.length === tarotDeck.length) {
      onExport(savedCards);
    }
  };

  const handleSaveProgress = () => {
    if (onSaveProgress) {
      const progress: DeckProgress = {
        userId: 'user123', // Replace with actual user ID
        completedCards: savedCards.length,
        lastModified: new Date(),
        savedCards
      };
      onSaveProgress(progress);
    }
  };

  return (
    <div>
      {/* Existing TarotDeckCreator component content */}
      <div className="mt-6">
        <Button onClick={handleSaveProgress}>Save Progress</Button>
        <Button 
          onClick={handleExport}
          disabled={savedCards.length !== tarotDeck.length}
        >
          Export Completed Deck
        </Button>
      </div>
    </div>
  );
}
