import { NoteInterface } from "@/api/collection";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Loader2, Plus } from "lucide-react";
import clsx from "clsx";
import { useContext, useEffect } from "react";
import { IContextType, NoteContext } from "./NoteContext";
import { ScrollArea } from "./ui/scroll-area";
import ReactTruncate from "react-text-truncate";
import { Skeleton } from "./ui/skeleton";
import useCreateNoteMutation from "@/hooks/useCreateNoteMutation";
import useNoteQuery from "@/hooks/useNoteQuery";

const Sidebar = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { selectedNote, setSelectedNote } = useContext(
    NoteContext
  ) as IContextType;

  const {
    refetch: retrieveNotes,
    data: retrievedNotes,
    isLoading: isRetrievingNotes,
  } = useNoteQuery({ collectionId: `${router.query["id"]}` });

  useEffect(() => {
    retrieveNotes();
  }, [retrieveNotes]);

  // Create a new note
  const { mutate, isLoading } = useCreateNoteMutation({
    collectionId: `${router.query["id"]}`,
    options: {
      onSuccess: (note) => {
        queryClient.refetchQueries([
          "get-collection-notes",
          `${router.query["id"]}`,
        ]);
        setSelectedNote(note as NoteInterface);
      },
    },
  });

  return (
    <div className="sidebar w-[20%] border-r h-screen">
      <div className="border-b sidebar-tools flex items-center justify-end p-4">
        <span
          className="p-2 border rounded-sm text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center"
          onClick={() => mutate()}
        >
          {!isLoading && <Plus size={20} />}
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          &nbsp;New Note
        </span>
      </div>
      <ScrollArea className="h-[90vh]">
        <div>
          {retrievedNotes?.notes.length === 0 && (
            <div className="flex items-center justify-center h-[80vh] text-center text-sm text-gray-400">
              No Notes to show. Click on &apos;New Note&apos; to create a new
              note!
            </div>
          )}
          {isRetrievingNotes && (
            <div className="p-4">
              <Skeleton className="h-[50px] w-full my-4" />
              <Skeleton className="h-[50px] w-full my-4" />
              <Skeleton className="h-[50px] w-full my-4" />
              <Skeleton className="h-[50px] w-full my-4" />
              <Skeleton className="h-[50px] w-full my-4" />
              <Skeleton className="h-[50px] w-full my-4" />
              <Skeleton className="h-[50px] w-full my-4" />
              <Skeleton className="h-[50px] w-full my-4" />
            </div>
          )}
          {retrievedNotes?.notes.map((note) => (
            <div
              key={note._id}
              className={clsx(
                "cursor-pointer font-secondary text-sm transition-colors p-4",
                selectedNote?._id === note._id
                  ? "bg-[#f6f6f6] text-gray-900 hover:bg-[#f6f6f6] dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 dark:hover:text-white"
                  : "hover:bg-[#f6f6f6] dark:hover:bg-zinc-900 dark:hover:text-white"
              )}
              onClick={() => setSelectedNote(note)}
            >
              <h1 className="font-bold">{note.title}</h1>
              <p className="text-muted-foreground mt-2">
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
