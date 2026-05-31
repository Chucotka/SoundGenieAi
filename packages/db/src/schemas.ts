import { z } from 'zod';

export const TrackSchema = z.object({
  title: z.string(),
  artist: z.string(),
  mood: z.string(),
  bpm: z.number().min(60).max(180),
  genre: z.string(),
  tags: z.array(z.string()).length(3),
  duration: z.string()
});

export type TrackInfo = z.infer<typeof TrackSchema>;

export const RemixIdeaSchema = z.object({
  style: z.string(),
  tempo: z.string(),
  description: z.string().max(80),
  mood: z.string(),
  estimatedDuration: z.string()
});

export type RemixIdea = z.infer<typeof RemixIdeaSchema>;
