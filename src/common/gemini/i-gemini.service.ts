import type { Tool } from '@google/generative-ai';

export const GEMINI_SERVICE = 'IGeminiService';

export type ToolExecutor = (name: string, args: Record<string, unknown>) => Promise<Record<string, unknown>>;

export interface IGeminiService {
  embedAsync(text: string): Promise<number[]>;
  generateAsync(prompt: string): Promise<string>;
  generateWithToolsAsync(
    systemPrompt: string,
    userPrompt: string,
    tools: Tool[],
    executor: ToolExecutor,
  ): Promise<string>;
}
