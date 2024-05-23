import axios, { AxiosInstance } from 'axios'

class TalentCoreApi {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:5000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export const talentCoreApi = new TalentCoreApi().instance
