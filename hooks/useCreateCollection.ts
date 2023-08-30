import { CollectionServerResponseInterface } from "@/api/collection";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import * as collectionHelpers from "@/helpers/collection";

type UseCreateCollection = {
  options: UseMutationOptions<
    CollectionServerResponseInterface | undefined,
    unknown,
    FormData,
    unknown
  >;
};

type FormData = {
  collectionName: string;
  colorCoding: string;
};

const useCreateCollectionMutation = ({ options }: UseCreateCollection) => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await collectionHelpers.createNewCollection(formData);
    },
    ...options,
  });
};

export default useCreateCollectionMutation;
