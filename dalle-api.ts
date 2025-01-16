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
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, size = "1024x1792", quality = "hd", style = "vivid" } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: size as "1024x1024" | "1024x1792" | "1792x1024",
      quality: quality as "standard" | "hd",
      style: style as "vivid" | "natural"
    });

    return res.status(200).json({
      success: true,
      imageUrl: response.data[0].url
    });

  } catch (error: any) {
    console.error('DALL-E API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate image'
    });
  }
}
