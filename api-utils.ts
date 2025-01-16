import axios from 'axios';

export const generateImage = async (prompt: string) => {
  try {
    const response = await axios.post('/api/generate-image', {
      prompt,
      size: "1024x1792",
      quality: "hd",
      style: "vivid"
    });
    
    if (!response.data.success) {
      throw new Error(response.data.error);
    }
    
    return response.data.imageUrl;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.message);
  }
};
