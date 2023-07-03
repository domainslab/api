import axios from 'axios'

const API_KEY = process.env.GO_DADDY_API_KEY
const API_SECRET = process.env.GO_DADDY_API_SECRET
const HEADERS = { 'Authorization': `sso-key ${API_KEY}:${API_SECRET}` }

export const isDomainAvailable = async (domain: string): Promise<boolean | undefined> => {
  try {
    const response = await axios.get(`https://api.godaddy.com/v1/domains/available?domain=${domain}`, { headers: HEADERS })

    return response.data.available
  } catch (error) {
    console.error(error)
  }
}
