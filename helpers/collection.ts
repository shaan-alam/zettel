import { createCollection } from "@/api/collection";
import axios from "axios";

export const createNewCollection = async (formData: {
  collectionName: string;
  colorCoding: string;
}) => {
  try {
    const res = await createCollection(formData);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data.message);
    }
  }
};
