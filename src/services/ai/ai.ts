import { Configuration, OpenAIApi } from 'openai';

import { MODEL, DEFAULT_TOP_LEVEL_DOMAINS, PROMPTS } from './consts';
import { isDomainInvalid } from './utils';
import AiError from './AiError';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
);

const chat = async (message: string): Promise<string | undefined> => {
  const res = await openai.createChatCompletion({
    model: MODEL,
    messages: [{ role: 'user', content: message }],
  });

  return res.data.choices[0].message?.content;
};

export const isDescValid = async (
  desc: string,
  prompt = 'desc_validation'
): Promise<boolean> => {
  const message = PROMPTS[prompt].replace('{desc}', desc);

  const response = await chat(message);

  return response?.includes('True') ?? false;
};

export const getDomains = async ({
  desc,
  prompt = 'default',
  tlds = DEFAULT_TOP_LEVEL_DOMAINS,
  pageSize = 10,
}: {
  desc: string;
  prompt?: keyof typeof PROMPTS;
  tlds?: string[];
  pageSize?: number;
}): Promise<string[]> => {
  const message = PROMPTS[prompt]
    .replace('{desc}', desc)
    .replace('{tlds}', tlds.join(', '))
    .replace('{pageSize}', String(pageSize));

  const response = await chat(message);

  if (!response) {
    throw new AiError('Prompt is invalid');
  }

  const domains = response.split('\n').map(domain => {
    return domain.split('. ')[1];
  });

  if (domains.some(isDomainInvalid)) {
    throw new AiError('Prompt is invalid');
  }

  return domains;
};
