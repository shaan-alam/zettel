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
import { useToast } from "@/components/ui/use-toast";

interface DeleteNoteAlertProps {
  noteId: string;
}

const DeleteNoteAlert: React.FC<DeleteNoteAlertProps> = ({ noteId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

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
      toast({
        title: "Task completed!",
        description: "Your note has been sucessfully deleted!",
      });
      queryClient.refetchQueries([
        "get-collection-notes",
        `${router.query["id"]}`,
      ]);
      setSelectedNote(null);
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
