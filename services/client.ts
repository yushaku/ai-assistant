import axios from 'axios'

export const httpClient = () => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
      Accept: '*',
      'Content-Type': '*'
    }
  })

  return client
}
