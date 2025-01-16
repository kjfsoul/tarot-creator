// types/tarot.ts
export interface TarotCard {
  name: string;
  number: string;
  suit?: string;
  description: string;
  keywords: string[];
  isMinorArcana: boolean;
}

// data/tarotDeck.ts
export const tarotDeck: TarotCard[] = [
  // Major Arcana
  {
    name: "The Fool",
    number: "0",
    description: "A cosmic traveler stepping off into space, wearing flowing robes with glowing geometric patterns",
    keywords: ["beginnings", "innocence", "spontaneity"],
    isMinorArcana: false
  },
  {
    name: "The Magician",
    number: "I",
    description: "A mystical figure channeling cosmic energy between raised hands, surrounded by floating neon symbols",
    keywords: ["manifestation", "power", "skill"],
    isMinorArcana: false
  },
  // ... More Major Arcana
  
  // Wands Suit
  {
    name: "Ace of Wands",
    number: "1",
    suit: "Wands",
    description: "A glowing ethereal wand emanating cosmic fire energy",
    keywords: ["creation", "inspiration", "potential"],
    isMinorArcana: true
  },
  // ... More Wands
  
  // Cups Suit
  {
    name: "Ace of Cups",
    number: "1",
    suit: "Cups",
    description: "A crystalline chalice overflowing with luminous stellar waters",
    keywords: ["emotion", "intuition", "relationships"],
    isMinorArcana: true
  },
  // ... More Cups
  
  // Swords Suit
  {
    name: "Ace of Swords",
    number: "1",
    suit: "Swords",
    description: "A sword of pure light cutting through darkness, surrounded by geometric patterns",
    keywords: ["clarity", "truth", "breakthrough"],
    isMinorArcana: true
  },
  // ... More Swords
  
  // Pentacles Suit
  {
    name: "Ace of Pentacles",
    number: "1",
    suit: "Pentacles",
    description: "A glowing pentacle floating in space, rimmed with cosmic energy",
    keywords: ["opportunity", "prosperity", "manifestation"],
    isMinorArcana: true
  }
  // ... More Pentacles
];

// utils/deckUtils.ts
export const getNextCard = (currentIndex: number): TarotCard => {
  return tarotDeck[Math.min(currentIndex + 1, tarotDeck.length - 1)];
};

export const getPreviousCard = (currentIndex: number): TarotCard => {
  return tarotDeck[Math.max(0, currentIndex - 1)];
};

export const filterBySuit = (suit: string): TarotCard[] => {
  return tarotDeck.filter(card => card.suit === suit);
};

export const getMajorArcana = (): TarotCard[] => {
  return tarotDeck.filter(card => !card.isMinorArcana);
};
