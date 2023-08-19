import { useState, useEffect, useContext } from "react";
import { NoteInterface, getCollectionNotes } from "@/api/collection";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import Note from "../Note";
import { Plus } from "lucide-react";
import { CreateNoteRequestBody, createNote } from "@/api/note";
import { Context, IContextType } from "../Context/GlobalContext";
import Scrollbar from "../ui/scrollbar";
import Hotkeys from "react-hot-keys";

const Sidebar = () => {
  const { setSelectedNote } = useContext(Context) as IContextType;
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentCollectionNotes, setCurrentCollectionNotes] = useState<
    NoteInterface[]
  >([]);

  const { refetch: fetchCollectionNotes, isLoading } = useQuery(
    ["get-collection-notes", router.query["id"]],
    async () => {
      try {
        const res = await getCollectionNotes(router.query["id"] as string);
        return res.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data.message);
        }
      }
    },
    {
      onSuccess: (result) => {
        if (result) setCurrentCollectionNotes(result?.result?.notes || []);
      },
    }
  );

  const { mutateAsync, data } = useMutation(
    async (noteData: CreateNoteRequestBody) => {
      try {
        const result = await createNote(noteData);
        return result.data.newNote;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data.message);
        }
      }
    },
    {
      onError: (err: ReturnType<ErrorConstructor>) => {
        // error creating a new note
      },
      onSuccess: (note) => {
        queryClient.refetchQueries(["get-collection-notes"]);
        setSelectedNote(note as NoteInterface);
      },
    }
  );

  useEffect(() => {
    fetchCollectionNotes();
  }, [fetchCollectionNotes]);

  const createNewDoc = () => {
    mutateAsync({
      title: "Untitled",
      body: "",
      collection: router.query["id"] as string,
    });
  };

  return (
    <Hotkeys keyName="ctrl+shift+n" onKeyDown={createNewDoc}>
      <div className="w-[20%] border-r">
        <div className="sidebar_topbar flex justify-end p-4 border-b">
          <span
            className="p-1 border transition-colors hover:bg-[#eee] dark:hover:bg-zinc-800 cursor-pointer"
            onClick={createNewDoc}
          >
            <Plus size={20} />
          </span>
        </div>

        <Scrollbar className="sidebar" height="90%" width="100%">
          <div className="notes mt-4 p-2">
            {currentCollectionNotes.length > 0 &&
              currentCollectionNotes.map((note) => <Note note={note} />)}
          </div>
        </Scrollbar>
      </div>
    </Hotkeys>
  );
};

export default Sidebar;
