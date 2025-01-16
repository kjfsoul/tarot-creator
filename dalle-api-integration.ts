// pages/api/generate-image.ts
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1792", // Portrait format for tarot cards
      quality: "standard",
      style: "vivid"
    });

    return res.status(200).json({
      imageUrl: response.data[0].url
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return res.status(500).json({ message: 'Error generating image' });
  }
}

// utils/api.ts
import axios from 'axios';

export const generateImage = async (prompt: string) => {
  const response = await axios.post('/api/generate-image', { prompt });
  return response.data.imageUrl;
};

// hooks/useImageGeneration.ts
import { useMutation } from '@tanstack/react-query';
import { generateImage } from '../utils/api';

export const useImageGeneration = () => {
  return useMutation({
    mutationFn: generateImage,
    onError: (error) => {
      console.error('Error generating image:', error);
    }
  });
};
