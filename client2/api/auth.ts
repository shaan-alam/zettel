import { getAPIInstance } from '@/api'

const API = getAPIInstance();

interface UserInterface {
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
export const signIn = async <T, >(body: T) => {
  try {
    const res = await API.post<AuthResponseInterface>('/auth/signIn', { ...body });
    return res.data;
  } catch (err) {
    console.log('error', err)
  }
}
