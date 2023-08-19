import { useContext } from "react";
import { NoteInterface } from "@/api/collection";
import clsx from "clsx";
import { Context, IContextType } from "../Context/GlobalContext";
import { useQuery } from "@tanstack/react-query";
import { getNote } from "@/api/note";
import axios from "axios";

const Note: React.FC<{ note: NoteInterface }> = ({ note }) => {
  const { selectedNote, setSelectedNote } = useContext(Context) as IContextType;

  const { refetch: fetchNote } = useQuery(
    ["get-note"],
    async () => {
      try {
        const noteResponse = await getNote(note._id);
        return noteResponse.data.note;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data.message);
        }
      }
    },
    {
      enabled: false,
      onSuccess: (note) => {
        setSelectedNote(note as NoteInterface);
      },
    }
  );

  return (
    <div
      className={clsx(
        "note py-[0.012345rem] cursor-pointer rounded-md mb-1 text-sm",
        (selectedNote?._id as string) === note._id
          ? "dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-white bg-[#f6f6f6] text-gray-900"
          : "hover:bg-[#f6f6f6] dark:hover:bg-zinc-900 dark:hover:text-white"
      )}
      onClick={() => fetchNote()}
    >
      <p className="font-secondary px-2 py-1">{note.title}</p>
    </div>
  );
};

export default Note;
