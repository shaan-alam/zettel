import { useMutation } from "@tanstack/react-query";
import * as noteHelpers from "@/helpers/note";
import type { UseMutationOptions } from "@tanstack/react-query";
import { NoteInterface } from "@/api/collection";

type UseCreateNoteMutation = {
  collectionId: string;
  options: UseMutationOptions<
    NoteInterface | undefined,
    unknown,
    void,
    unknown
  >;
};

const useCreateNoteMutation = ({
  options,
  collectionId,
}: UseCreateNoteMutation) => {
  return useMutation({
    mutationFn: async () => {
      const note = await noteHelpers.createNewNote(`${collectionId}`);
      return note;
    },
    ...options,
  });
};

export default useCreateNoteMutation;
