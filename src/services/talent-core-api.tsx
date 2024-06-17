import axios, { AxiosInstance } from 'axios'

class TalentCoreApi {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_TALENT_CORE_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export const talentCoreApi = new TalentCoreApi().instance
