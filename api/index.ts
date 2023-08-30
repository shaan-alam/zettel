import axios, { InternalAxiosRequestConfig } from 'axios';
import { AuthResponseInterface } from './auth'
import { config } from '@/constants';

export const getAPIInstance = () => {
  const API = axios.create({ baseURL: config.DEV_SERVER })

  API.interceptors.request.use((req: InternalAxiosRequestConfig) => {
    const payload: AuthResponseInterface = JSON.parse(localStorage.getItem('user') || "{}");
    const token = payload.token || "";
    
    if (token.length !== 0) {
      req.headers.Authorization = `Bearer ${token}`
    }

    return req;
  })

  return API;
}


