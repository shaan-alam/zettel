import { getAPIInstance } from '@/api'

const API = getAPIInstance();

export interface UserInterface {
  _id: string;
  email: string;
  fullName: string;
  avatar: string;
}

export interface AuthResponseInterface {
  token: string;
  user: UserInterface
}

export const signUp = <T, >(body: T) => API.post<AuthResponseInterface>('/auth/signUp', { ...body })
export const signIn = <T, >(body: T) => API.post<AuthResponseInterface>('/auth/signIn', { ...body })