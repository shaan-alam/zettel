import { getCollectionNotes } from "@/api/collection";
import { createNote, deleteNote } from "@/api/note";
import axios from "axios";

export const removeNote = async (noteId: string) => {
  try {
    await deleteNote(noteId);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data.message);
    }
  }
};

export const retrieveNotes = async (collectionId: string) => {
  try {
    const result = await getCollectionNotes(collectionId);
    return result.data.result;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data.message);
    }
  }
};

export const createNewNote = async (collectionId: string) => {
  try {
    const result = await createNote({
      title: "Untitled",
      body: "",
      collection: `${collectionId}`,
    });
    return result.data.newNote;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data.message);
    }
  }
};
