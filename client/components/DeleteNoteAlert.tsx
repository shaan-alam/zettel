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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/api/note";
import axios from "axios";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { IContextType, NoteContext } from "./NoteContext";

interface DeleteNoteAlertProps {
  noteId: string;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteNoteAlert: React.FC<DeleteNoteAlertProps> = ({
  noteId,
  open,
  setIsOpen,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { setSelectedNote } = useContext(NoteContext) as IContextType;

  const { isLoading, mutate } = useMutation({
    mutationFn: async () => {
      try {
        await deleteNote(noteId);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data.message);
        }
      }
    },
    onSuccess: () => {
      setIsOpen(false);
      queryClient.refetchQueries([
        "get-collection-notes",
        `${router.query["id"]}`,
      ]);
      setSelectedNote(null);
    },
  });

  return (
    <div>
      <AlertDialog open={open}>
        <AlertDialogTrigger>
          <TrashIcon size={20} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              note and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={() => mutate()}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              &nbsp; Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteNoteAlert;
