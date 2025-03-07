declare module '@tavily/core' {
  interface TavilyResult {
    title: string;
    url: string;
    content: string;
    rawContent: string | null;
    score: number;
    publishedDate?: string;
  }

  interface TavilyResponse {
    query: string;
    responseTime: number;
    images: any[];
    results: TavilyResult[];
    answer: string | null;
  }

  interface TavilyClient {
    search(query: string): Promise<TavilyResponse>;
  }

  export function tavily(config: { apiKey: string }): TavilyClient;
} 