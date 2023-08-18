import { getCollectionNotes } from "@/api/collection";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import axios from "axios";
import { Plus } from "lucide-react";
import { createNote } from "@/api/note";
import clsx from "clsx";
import { useContext } from "react";
import { IContextType, NoteContext } from "./NoteContext";

const Sidebar = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { selectedNote, setSelectedNote } = useContext(NoteContext) as IContextType;

  // Load all the notes of this collection
  const { isLoading, data } = useQuery({
    queryKey: ["get-collection-notes", `${router.query["id"]}`],
    queryFn: async () => {
      try {
        const result = await getCollectionNotes(`${router.query["id"]}`);
        return result.data.result;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data.message);
        }
      }
    },
    onSuccess: (value) => {
      console.log("ntoes", value);
    },
  });

  // Create a new note
  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const result = await createNote({
          title: "Untitled",
          body: "",
          collection: `${router.query["id"]}`,
        });
        return result.data.newNote;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data.message);
        }
      }
    },
    onSuccess: (values) => {
      console.log(values);
      queryClient.refetchQueries([
        "get-collection-notes",
        `${router.query["id"]}`,
      ]);
      setSelectedNote(values?._id as string)
    },
  });

  return (
    <div className="sidebar w-[20%] p-4 border-r h-screen">
      <div className="border-b sidebar-tools flex items-center justify-end">
        <span
          className="p-2 border mb-2 cursor-pointer hover:bg-gray-100"
          onClick={() => mutate()}
        >
          <Plus size={20} />
        </span>
      </div>
      {data?.notes.map((note) => (
        <div
          className={clsx(
            "cursor-pointer font-secondary px-3 py-1 my-1 text-sm transition-colors flex items-center rounded-sm",
            selectedNote === note._id
              ? "bg-[#f6f6f6] text-gray-900 hover:bg-[#f6f6f6] dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 dark:hover:text-white"
              : "hover:bg-[#f6f6f6] dark:hover:bg-zinc-900 dark:hover:text-white"
          )}
        >
          {note.title}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
