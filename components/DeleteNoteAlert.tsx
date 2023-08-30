import { useContext } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, TrashIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { IContextType, NoteContext } from "./NoteContext";
import useDeleteNoteMutation from "@/hooks/useDeleteNoteMutation";

interface DeleteNoteAlertProps {
  noteId: string;
}

const DeleteNoteAlert: React.FC<DeleteNoteAlertProps> = ({ noteId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { setSelectedNote } = useContext(NoteContext) as IContextType;

  const { mutate: deleteNote, isLoading: isDeletingNote } =
    useDeleteNoteMutation({
      options: {
        onSuccess: () => {
          queryClient.refetchQueries([
            "get-collection-notes",
            `${router.query["id"]}`,
          ]);
          setSelectedNote(null);
        },
      },
    });

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <TrashIcon size={20} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              note and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={isDeletingNote}
              onClick={() => deleteNote(noteId)}
            >
              {isDeletingNote && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              &nbsp; Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteNoteAlert;
