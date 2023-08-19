import { getAPIInstance } from '@/api'
import { NoteInterface } from './collection'

const API = getAPIInstance();

export interface CreateNoteRequestBody {
  title: string,
  body: string
  collection: string
}

export interface SaveNoteRequestBody {
  _id: string,
  body: string
  title?: string
}

export const createNote = (noteData: CreateNoteRequestBody) => API.post<{ newNote: NoteInterface }>('/note/create', { ...noteData })
export const saveNote = (noteData: SaveNoteRequestBody) => API.patch('/note/save', { ...noteData })
export const getNote = (noteId: string) => API.get<{ note: NoteInterface }>(`/note/${noteId}`)
export const deleteNote = (noteId: string) => API.delete(`/note/delete/${noteId}`)