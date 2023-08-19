import axios, { InternalAxiosRequestConfig } from 'axios';
import { AuthResponseInterface } from './auth'

export const getAPIInstance = () => {
  const API = axios.create({ baseURL: "http://localhost:5000/" })

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


