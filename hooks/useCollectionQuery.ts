import { getCollections } from "@/api/collection";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCollectionQuery = () => {
  return useQuery({
    queryKey: ["get-collections"],
    queryFn: async () => {
      try {
        const result = await getCollections();
        return result.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data.message);
        }
      }
    },
  });
};

export default useCollectionQuery;