import { Injectable } from '@nestjs/common';
import { Content, GoogleGenerativeAI, Part, Tool } from '@google/generative-ai';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IGeminiService, ToolExecutor } from './i-gemini.service';
import { GeminiOptions } from './gemini.options';

const EMBEDDING_MODEL = 'gemini-embedding-001';
const GENERATION_MODEL = 'gemini-flash-latest';

interface ParsedFunctionCall {
  name: string;
  args: Record<string, unknown>;
}

function parseFunctionCall(candidates: unknown[] | undefined): ParsedFunctionCall | null {
  const parts = (candidates?.[0] as Record<string, unknown> | undefined);
  const content = parts?.['content'] as Record<string, unknown> | undefined;
  const rawParts = (content?.['parts'] as unknown[]) ?? [];
  for (const part of rawParts) {
    if (typeof part !== 'object' || part === null) continue;
    const rec = part as Record<string, unknown>;
    if (!('functionCall' in rec)) continue;
    const fc = rec['functionCall'] as Record<string, unknown>;
    if (typeof fc?.['name'] !== 'string') continue;
    return { name: fc['name'], args: (fc['args'] as Record<string, unknown>) ?? {} };
  }
  return null;
}

@Injectable()
export class GeminiService implements IGeminiService {
  private readonly genAI: GoogleGenerativeAI;

  public constructor(
    private readonly options: GeminiOptions,
    @InjectPinoLogger(GeminiService.name) private readonly logger: PinoLogger,
  ) {
    this.genAI = new GoogleGenerativeAI(options.apiKey);
  }

  public async embedAsync(text: string): Promise<number[]> {
    const model = this.genAI.getGenerativeModel({ model: EMBEDDING_MODEL });
    const result = await model.embedContent(text);
    return result.embedding.values;
  }

  public async generateAsync(prompt: string): Promise<string> {
    this.logger.info('Generating chatbot response via Gemini');
    const model = this.genAI.getGenerativeModel({ model: GENERATION_MODEL });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  public async generateWithToolsAsync(
    systemPrompt: string,
    userPrompt: string,
    tools: Tool[],
    executor: ToolExecutor,
  ): Promise<string> {
    this.logger.info('Generating response with tool support via Gemini');
    const model = this.genAI.getGenerativeModel({ model: GENERATION_MODEL, tools, systemInstruction: systemPrompt });
    const userContent: Content = { role: 'user', parts: [{ text: userPrompt } as Part] };
    const first = await model.generateContent({ contents: [userContent] });
    const funcCall = parseFunctionCall(first.response.candidates);
    if (!funcCall) return first.response.text();
    const toolOutput = await executor(funcCall.name, funcCall.args);
    const modelContent = first.response.candidates?.[0]?.content ?? { role: 'model', parts: [] as Part[] };
    const fnResponseContent: Content = {
      role: 'user',
      parts: [{ functionResponse: { name: funcCall.name, response: { output: JSON.stringify(toolOutput) } } } as Part],
    };
    const second = await model.generateContent({ contents: [userContent, modelContent, fnResponseContent] });
    return second.response.text();
  }
}
