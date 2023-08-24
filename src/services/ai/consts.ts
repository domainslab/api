
import * as fs from 'fs';
import * as path from 'path';

export const DEFAULT_TOP_LEVEL_DOMAINS = ['.com', '.ai', '.io'];
export const MODEL = 'gpt-3.5-turbo';

export const PROMPTS: Record<string, string> = fs
  .readdirSync('src/prompts')
  .reduce((acc, file) => {
    const filePath = path.join('src/prompts', file);
    acc[file] = fs.readFileSync(filePath, 'utf-8');

    return acc;
  }, {} as Record<string, string>);
