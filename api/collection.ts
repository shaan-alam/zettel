import { getAPIInstance } from "@/api";

const API = getAPIInstance();

export interface CollectionServerResponseInterface {
  collection: CollectionInterface  
}

export interface CollectionInterface {
  _id: string
  collectionName: string
  colorCoding: string
  notes: NoteInterface[]
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface NoteInterface {
  _id: string
  title: string
  linkedNotes: any[]
  body: string
  createdAt: string
  updatedAt: string
}

export const createCollection = <T, >(formData: T) => API.post<CollectionServerResponseInterface>('/collection/create', { ...formData })
export const getCollections = () => API.get<{ collections: CollectionInterface[] }>('/collection');
export const getCollectionNotes = (collectionId: string) => API.get<{ result: CollectionInterface }>(`/note/collection/${collectionId}`)
