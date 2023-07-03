const { Configuration, OpenAIApi } = require("openai")

import * as fs from 'fs'
import * as path from 'path'

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
}))

const TLDS = ['.com', '.ai', '.io']

type StringMap = { [key: string]: string }
type CompletionResponse = {
  data: {
    choices: Array<{ message: { content: string } }>
  }
}

const PROMPTS: StringMap = fs.readdirSync('src/prompts').reduce((acc, file) => {
  const filePath = path.join('src/prompts', file)
  acc[file] = fs.readFileSync(filePath, 'utf-8')

  return acc
}, {} as StringMap)

const chat = async (message: string) => {
  return openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: message}],
  }).then((completion: CompletionResponse) => {
    return completion.data.choices[0].message.content
  }).catch((error: any) => {
    if (error.response) {
      console.log(error.response.status)
      console.log(error.response.data)
    } else {
      console.log(error.message)
    }
  })
}

export const getDomains = async ({
  desc,
  prompt = 'default',
  tlds = TLDS,
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