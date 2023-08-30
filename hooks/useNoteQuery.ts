import { useQuery } from "@tanstack/react-query";
import * as noteHelpers from "@/helpers/note";

type UseNoteQuery = {
  collectionId: string;
};

const useNoteQuery = ({ collectionId }: UseNoteQuery) => {
  return useQuery({
    queryKey: ["get-collection-notes", collectionId],
    queryFn: async () => {
      return await noteHelpers.retrieveNotes(`${collectionId}`);
    },
  });
};

export default useNoteQuery;
