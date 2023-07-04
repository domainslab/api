const { Configuration, OpenAIApi } = require("openai")

import * as fs from 'fs'
import * as path from 'path'

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
}))

const DEFAULT_TOP_LEVEL_DOMAINS = ['.com', '.ai', '.io']

type CompletionResponse = {
    data: {
      choices: Array<{ message: { content: string } }>
    }
}

const PROMPTS: Record<string, string> = fs.readdirSync('src/prompts').reduce((acc, file) => {
  const filePath = path.join('src/prompts', file)
  acc[file] = fs.readFileSync(filePath, 'utf-8')

  return acc
}, {} as Record<string, string>)


const chat = async (message: string): Promise<any> => {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: message}],
  })

  return res.data.choices[0].message.content
}

export const getDomains = async ({
  desc,
  prompt = 'default',
  tlds = DEFAULT_TOP_LEVEL_DOMAINS,
  pageSize = 10,
}: {
  desc: string,
  prompt?: keyof typeof PROMPTS,
  tlds?: string[],
  pageSize?: number,
}): Promise<string[]> => {
  const message = PROMPTS[prompt].replace("{desc}", desc)
  .replace("{tlds}", tlds.join(', '))
  .replace("{pageSize}", String(pageSize))

  const domains = await chat(message) as string

  return domains.split('\n').map((domain) => {
    return domain.split('. ')[1]
  })
}