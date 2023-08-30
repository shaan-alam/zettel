import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import * as noteHelpers from "@/helpers/note";

type UseDeleteNoteMutation = {
  options:
    | Omit<UseMutationOptions<void, unknown, string, unknown>, "mutationFn">
    | undefined;
};

const useDeleteNoteMutation = ({ options }: UseDeleteNoteMutation) => {
  return useMutation(
    async (noteId: string) => {
      return await noteHelpers.removeNote(noteId);
    },
    {
      ...options,
    }
  );
};

export default useDeleteNoteMutation;
