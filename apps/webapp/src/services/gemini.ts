import { GoogleGenerativeAI } from '@google/generative-ai';
import { TrackSchema, RemixIdeaSchema, TrackInfo, RemixIdea } from '@soundgenie/db';
import { z } from 'zod';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Helper to strip Markdown formatting like ```json ... ```
function extractJson(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  return cleaned.trim();
}

export async function searchTracks(query: string): Promise<TrackInfo[]> {
  const mockFallback: TrackInfo[] = [
    { title: 'Midnight Frequency', artist: 'AI Remix', mood: 'energetic', bpm: 120, genre: 'Electronic', tags: ['synth', 'upbeat', 'dance'], duration: '3:24' },
    { title: 'Neon Dreams', artist: 'Synthwave AI', mood: 'chill', bpm: 110, genre: 'Synthwave', tags: ['retro', 'night', 'drive'], duration: '4:15' },
    { title: 'Cyberpunk Drive', artist: 'Neon Rider', mood: 'dark', bpm: 130, genre: 'Cyberpunk', tags: ['bass', 'future', 'action'], duration: '2:55' },
    { title: 'Lofi Cafe', artist: 'Study Beats', mood: 'relaxed', bpm: 80, genre: 'Lofi', tags: ['study', 'rain', 'coffee'], duration: '2:10' },
    { title: 'Epic Trailer', artist: 'Cinematic AI', mood: 'epic', bpm: 140, genre: 'Cinematic', tags: ['orchestral', 'huge', 'action'], duration: '1:50' },
  ];

  if (!genAI) {
    console.warn('No GEMINI_API_KEY found, using mock data for searchTracks');
    return mockFallback;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `You are a music discovery AI. The user is looking for: ${query}. Return a valid JSON array of exactly 5 tracks. Each object must have: title (string), artist (string), mood (string), bpm (number 60-180), genre (string), tags (string array of 3 items), duration (string e.g. '3:42'). Return only the JSON array, no markdown, no explanation.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStr = extractJson(text);
    const parsed = JSON.parse(jsonStr);

    const validated = z.array(TrackSchema).parse(parsed);
    return validated.slice(0, 5);
  } catch (error) {
    console.warn('Error in searchTracks with Gemini, returning mock data:', error);
    return mockFallback;
  }
}

export async function generateRemixIdeas(trackTitle: string): Promise<RemixIdea[]> {
  const mockFallback: RemixIdea[] = [
    { style: 'Speed Up', tempo: 'fast 145 BPM', description: 'Energetic version for TikTok trends', mood: 'energetic', estimatedDuration: '2:15' },
    { style: 'Chill Lofi', tempo: 'slow 80 BPM', description: 'Relaxed version with vinyl crackle', mood: 'chill', estimatedDuration: '3:40' },
    { style: 'Synthwave', tempo: 'steady 110 BPM', description: 'Retro 80s feel with heavy synths', mood: 'retro', estimatedDuration: '4:05' }
  ];

  if (!genAI) {
    console.warn('No GEMINI_API_KEY found, using mock data for generateRemixIdeas');
    return mockFallback;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Suggest 3 creative remix styles for the track: ${trackTitle}. Return valid JSON array. Each object: style (string), tempo (string e.g. 'slow 75 BPM'), description (string max 80 chars), mood (string), estimatedDuration (string e.g. '4:20'). Return only the JSON array, no markdown.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStr = extractJson(text);
    const parsed = JSON.parse(jsonStr);

    const validated = z.array(RemixIdeaSchema).parse(parsed);
    return validated.slice(0, 3);
  } catch (error) {
    console.warn('Error in generateRemixIdeas with Gemini, returning mock data:', error);
    return mockFallback;
  }
}

export async function generateStoryCaption(trackTitle: string, platform: string): Promise<string> {
  const mockFallback = `Check out this amazing track: ${trackTitle}! 🔥 #music #remix #${platform.toLowerCase()}`;

  if (!genAI) {
    console.warn('No GEMINI_API_KEY found, using mock data for generateStoryCaption');
    return mockFallback;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Write a short viral social media caption for ${platform} about the track '${trackTitle}'. Max 150 chars. Include 3 relevant hashtags. Be creative and engaging.`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.warn('Error in generateStoryCaption with Gemini, returning mock data:', error);
    return mockFallback;
  }
}
