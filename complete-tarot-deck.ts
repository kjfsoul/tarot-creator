// data/tarotDeck.ts
import { TarotCard } from '../types/tarot';

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
  {
    name: "The High Priestess",
    number: "II",
    description: "A celestial priestess between glowing pillars with a cosmic veil and crescent moon crown",
    keywords: ["intuition", "mystery", "spirituality"],
    isMinorArcana: false
  },
  {
    name: "The Empress",
    number: "III",
    description: "A radiant figure on a crystal throne surrounded by luminous natural symbols",
    keywords: ["abundance", "fertility", "nurturing"],
    isMinorArcana: false
  },
  {
    name: "The Emperor",
    number: "IV",
    description: "A powerful figure on a geometric throne with cosmic rams and glowing sigils",
    keywords: ["authority", "structure", "leadership"],
    isMinorArcana: false
  },
  {
    name: "The Hierophant",
    number: "V",
    description: "A spiritual teacher with sacred geometries and floating spiritual symbols",
    keywords: ["tradition", "education", "belief"],
    isMinorArcana: false
  },
  {
    name: "The Lovers",
    number: "VI",
    description: "Two figures connected by streams of cosmic energy beneath a radiant angel",
    keywords: ["choice", "harmony", "relationships"],
    isMinorArcana: false
  },
  {
    name: "The Chariot",
    number: "VII",
    description: "A triumphant figure in a cosmic vessel pulled by sphinx-like creatures of light",
    keywords: ["determination", "victory", "control"],
    isMinorArcana: false
  },
  {
    name: "Strength",
    number: "VIII",
    description: "A figure gently taming a cosmic lion, both surrounded by energy streams",
    keywords: ["courage", "patience", "compassion"],
    isMinorArcana: false
  },
  {
    name: "The Hermit",
    number: "IX",
    description: "A robed figure holding a brilliant star-lantern on a cosmic mountain path",
    keywords: ["introspection", "guidance", "wisdom"],
    isMinorArcana: false
  },
  {
    name: "Wheel of Fortune",
    number: "X",
    description: "A cosmic wheel with zodiac symbols and mystical creatures in dynamic motion",
    keywords: ["cycles", "destiny", "change"],
    isMinorArcana: false
  },
  {
    name: "Justice",
    number: "XI",
    description: "A figure holding luminous scales and a crystal sword amid geometric patterns",
    keywords: ["balance", "truth", "karma"],
    isMinorArcana: false
  },
  {
    name: "The Hanged Man",
    number: "XII",
    description: "A figure suspended in cosmic space, surrounded by a halo of insight",
    keywords: ["surrender", "perspective", "sacrifice"],
    isMinorArcana: false
  },
  {
    name: "Death",
    number: "XIII",
    description: "A transformative figure on a cosmic steed with a rising phoenix",
    keywords: ["transformation", "endings", "rebirth"],
    isMinorArcana: false
  },
  {
    name: "Temperance",
    number: "XIV",
    description: "An angel blending cosmic energies between glowing chalices",
    keywords: ["balance", "harmony", "moderation"],
    isMinorArcana: false
  },
  {
    name: "The Devil",
    number: "XV",
    description: "A cosmic trickster figure with sacred geometry and breaking chains",
    keywords: ["bondage", "materialism", "liberation"],
    isMinorArcana: false
  },
  {
    name: "The Tower",
    number: "XVI",
    description: "A crystalline tower struck by cosmic lightning, releasing trapped energy",
    keywords: ["revelation", "upheaval", "breakthrough"],
    isMinorArcana: false
  },
  {
    name: "The Star",
    number: "XVII",
    description: "A figure pouring stellar energy into cosmic pools beneath a brilliant star",
    keywords: ["hope", "inspiration", "renewal"],
    isMinorArcana: false
  },
  {
    name: "The Moon",
    number: "XVIII",
    description: "A luminous moon path between cosmic pillars with spirit animals",
    keywords: ["intuition", "dreams", "mystery"],
    isMinorArcana: false
  },
  {
    name: "The Sun",
    number: "XIX",
    description: "A radiant cosmic sun illuminating crystal gardens and joyful figures",
    keywords: ["joy", "success", "vitality"],
    isMinorArcana: false
  },
  {
    name: "Judgement",
    number: "XX",
    description: "Cosmic figures rising to a celestial call amid geometric light patterns",
    keywords: ["awakening", "renewal", "purpose"],
    isMinorArcana: false
  },
  {
    name: "The World",
    number: "XXI",
    description: "A dancing figure in a cosmic wreath surrounded by elemental guardians",
    keywords: ["completion", "integration", "achievement"],
    isMinorArcana: false
  },

  // Wands Suit
  ...Array.from({ length: 14 }, (_, i) => ({
    name: i === 0 ? "Ace of Wands" : 
          i <= 9 ? `${i + 1} of Wands` :
          i === 10 ? "Page of Wands" :
          i === 11 ? "Knight of Wands" :
          i === 12 ? "Queen of Wands" : "King of Wands",
    number: (i + 1).toString(),
    suit: "Wands",
    description: `Cosmic fire and ethereal energy in the ${i === 0 ? "Ace" : i <= 9 ? `${i + 1}` : ["Page", "Knight", "Queen", "King"][i-10]} configuration`,
    keywords: ["passion", "creativity", "inspiration"],
    isMinorArcana: true
  })),

  // Cups Suit
  ...Array.from({ length: 14 }, (_, i) => ({
    name: i === 0 ? "Ace of Cups" :
          i <= 9 ? `${i + 1} of Cups` :
          i === 10 ? "Page of Cups" :
          i === 11 ? "Knight of Cups" :
          i === 12 ? "Queen of Cups" : "King of Cups",
    number: (i + 1).toString(),
    suit: "Cups",
    description: `Flowing stellar waters and emotional energy in the ${i === 0 ? "Ace" : i <= 9 ? `${i + 1}` : ["Page", "Knight", "Queen", "King"][i-10]} configuration`,
    keywords: ["emotions", "intuition", "relationships"],
    isMinorArcana: true
  })),

  // Swords Suit
  ...Array.from({ length: 14 }, (_, i) => ({
    name: i === 0 ? "Ace of Swords" :
          i <= 9 ? `${i + 1} of Swords` :
          i === 10 ? "Page of Swords" :
          i === 11 ? "Knight of Swords" :
          i === 12 ? "Queen of Swords" : "King of Swords",
    number: (i + 1).toString(),
    suit: "Swords",
    description: `Crystalline light and mental energy in the ${i === 0 ? "Ace" : i <= 9 ? `${i + 1}` : ["Page", "Knight", "Queen", "King"][i-10]} configuration`,
    keywords: ["thought", "clarity", "communication"],
    isMinorArcana: true
  })),

  // Pentacles Suit
  ...Array.from({ length: 14 }, (_, i) => ({
    name: i === 0 ? "Ace of Pentacles" :
          i <= 9 ? `${i + 1} of Pentacles` :
          i === 10 ? "Page of Pentacles" :
          i === 11 ? "Knight of Pentacles" :
          i === 12 ? "Queen of Pentacles" : "King of Pentacles",
    number: (i + 1).toString(),
    suit: "Pentacles",
    description: `Manifested cosmic energy and material symbols in the ${i === 0 ? "Ace" : i <= 9 ? `${i + 1}` : ["Page", "Knight", "Queen", "King"][i-10]} configuration`,
    keywords: ["manifestation", "resources", "abundance"],
    isMinorArcana: true
  }))
];
