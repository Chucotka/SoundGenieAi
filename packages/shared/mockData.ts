export const mockTracks = [
  {
    id: 'track_1',
    title: 'Midnight Frequency',
    artist: 'AI Remix',
    duration: 204, // 3:24
    originalUrl: 'https://example.com/audio1.mp3',
    bpm: 120,
    key: 'C Minor'
  },
  {
    id: 'track_2',
    title: 'Neon Dreams',
    artist: 'Synthwave AI',
    duration: 185,
    originalUrl: 'https://example.com/audio2.mp3',
    bpm: 110,
    key: 'A Minor'
  }
];

export const mockRemixes = [
    {
        id: 'remix_1',
        trackId: 'track_1',
        userId: 'user_1',
        aiPrompt: 'Make it a fast synthwave track',
        audioUrl: 'https://example.com/remix1.mp3',
        remixType: 'Speed Up',
        duration: 180
    }
];
