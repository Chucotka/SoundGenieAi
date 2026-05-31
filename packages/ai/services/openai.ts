export class OpenAIService {
  async generateStoryVisualPrompt(trackTitle: string, remixType: string): Promise<string> {
    return Promise.resolve(`Visual prompt for ${trackTitle} in ${remixType} style`);
  }

  async parseSearchQuery(query: string): Promise<{ keywords: string[], mood: string }> {
      return Promise.resolve({
          keywords: query.split(' '),
          mood: 'unknown'
      });
  }
}
