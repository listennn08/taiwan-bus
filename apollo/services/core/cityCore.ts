import axios from 'axios'

const cityInstance = axios.create({
  baseURL: process.env.CITY_API_PATH!,
})

export const cityGet = () => cityInstance.get('/City?$format=JSON')
