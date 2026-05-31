export class SunoService {
  async generateRemix(prompt: string, audioUrl?: string): Promise<{ audioUrl: string, duration: number }> {
    return Promise.resolve({
      audioUrl: 'https://example.com/mock-suno-remix.mp3',
      duration: 180
    });
  }
}
