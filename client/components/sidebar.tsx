import { NoteInterface, getCollectionNotes } from "@/api/collection";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import axios from "axios";
import { Plus } from "lucide-react";
import { createNote } from "@/api/note";
import clsx from "clsx";
import { useContext } from "react";
import { IContextType, NoteContext } from "./NoteContext";
import { ScrollArea } from "./ui/scroll-area";
import ReactTruncate from "react-text-truncate";

const Sidebar = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { selectedNote, setSelectedNote } = useContext(
    NoteContext
  ) as IContextType;

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
    onSuccess: (note) => {
      queryClient.refetchQueries([
        "get-collection-notes",
        `${router.query["id"]}`,
      ]);
      setSelectedNote(note as NoteInterface);
    },
  });

  return (
    <div className="sidebar w-[20%] border-r h-screen">
      <div className="border-b sidebar-tools flex items-center justify-end p-4">
        <span
          className="p-2 border rounded-sm text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center"
          onClick={() => mutate()}
        >
          <Plus size={20} />
          &nbsp;New Note
        </span>
      </div>
      <ScrollArea className="h-[90vh]">
        <div>
          {data?.notes.length === 0 && (
            <div className="flex items-center justify-center h-[80vh] text-center text-sm text-gray-400">
              No Notes to show. Click on 'New Note' to create a new note!
            </div>
          )}
          {data?.notes.map((note) => (
            <div
              className={clsx(
                "cursor-pointer font-secondary text-sm transition-colors p-4",
                selectedNote?._id === note._id
                  ? "bg-[#f6f6f6] text-gray-900 hover:bg-[#f6f6f6] dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 dark:hover:text-white"
                  : "hover:bg-[#f6f6f6] dark:hover:bg-zinc-900 dark:hover:text-white"
              )}
              onClick={() => setSelectedNote(note)}
            >
              <h1 className='font-bold'>{note.title}</h1>
              <p className='text-muted-foreground mt-2'>
                <ReactTruncate
                  line={2}
                  element="span"
                  truncateText="…"
                  text={note.body}
                />
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
