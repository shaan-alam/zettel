import * as yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCollection } from "@/api/collection";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import FormInput from "@/components/FormInput";
import { ChromePicker } from "react-color";
import { Button } from "../ui/button";

const CreateCollectionDialog = () => {
  const queryClient = useQueryClient();

  const [serverErrorResponse, setServerErrorResponse] = useState<string>("");
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);

  const formik = useFormik<{ collectionName: string; colorCoding: string }>({
    initialValues: {
      collectionName: "",
      colorCoding: "#ff3600",
    },
    validationSchema: yup.object({
      collectionName: yup
        .string()
        .required("Please provide a name for the collection!"),
      colorCoding: yup.string().required("Please select a color!"),
    }),
    onSubmit: (values) => {
      setServerErrorResponse("");
      mutate({ ...values });
    },
  });

  const { isLoading, mutate } = useMutation(
    async (formData: typeof formik.values) => {
      try {
        const res = await createCollection(formData);
        return res.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data.message);
        }
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get-collections"]);
      },
      onError: (err: ReturnType<ErrorConstructor>) => {
        setServerErrorResponse(err.message);
      },
    }
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="font-secondary px-3 py-2 text-sm transition-colors hover:bg-[#eee] hover:text-black dark:hover:bg-zinc-800 dark:hover:text-white flex items-center rounded-sm cursor-pointer">
          <Plus size={15} />
          &nbsp;New Collection
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new collection</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          {serverErrorResponse && (
            <span className="text-red-500 text-sm">{serverErrorResponse}</span>
          )}
          <div className="form-field">
            <Label
              htmlFor="collectionName"
              className="text-gray-600 font-semibold mb-4 inline-block"
            >
              Collection Name
            </Label>
            <FormInput
              className="dark:text-white"
              name="collectionName"
              formik={formik}
              type="text"
              id="collectionName"
              placeholder="Ex: Coding Notes, Recipes etc"
            />
          </div>
          <div className="form-field my-4">
            <FormInput
              formik={formik}
              type="text"
              id="colorCoding"
              placeholder="Ex: Coding Notes, Recipes etc"
              onClick={() => setColorPickerVisible(!isColorPickerVisible)}
              className="dark:text-white w-full"
              {...formik.getFieldProps("colorCoding")}
            />
            {isColorPickerVisible && (
              <ChromePicker
                className="mt-3 bottom-[-2rem]"
                color={formik.values.colorCoding}
                disableAlpha
                onChange={({ hex }) => {
                  formik.setValues({
                    ...formik.values,
                    colorCoding: hex,
                  });
                }}
                onChangeComplete={({ hex }) => {
                  formik.setValues({
                    ...formik.values,
                    colorCoding: hex,
                  });
                }}
              />
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Collection
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionDialog;
