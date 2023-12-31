import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormInput from "@/components/FormInput";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth";
import axios from "axios";
import OAuth from "./OAuth";

interface RegisterTabFormProps {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

const RegisterTab = () => {
  const router = useRouter();
  const [serverRegisterError, setServerRegisterError] = useState("");

  const formik = useFormik<RegisterTabFormProps>({
    initialValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Please provide a valid email!")
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Passwords should be of 8 characters")
        .required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match!")
        .required("Password confirmation is required"),
    }),
    onSubmit: (values) => {
      mutate({ ...values });
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: async (formData: typeof formik.values) => {
      try {
        const result = await signUp(formData);
        return result.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data.message);
        }
      }
    },
    onSuccess: (values) => {
      localStorage.setItem("user", JSON.stringify(values));
      router.push("/app");
    },
    onError: (err: ReturnType<ErrorConstructor>) => {
      setServerRegisterError(err.message);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create An Account</CardTitle>
        <CardDescription className="leading-6">
          Welcome to Zettel!! 🙋‍♂️
        </CardDescription>
      </CardHeader>
      <CardContent>
        {serverRegisterError && (
          <span className="text-red-500 text-sm">{serverRegisterError}</span>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormInput
            formik={formik}
            name="email"
            type="email"
            placeholder="Email"
            className="my-4"
          />
          <FormInput
            formik={formik}
            name="fullName"
            type="text"
            placeholder="Full Name"
            className="my-4"
          />
          <FormInput
            formik={formik}
            name="password"
            type="password"
            placeholder="Password"
            className="my-4"
          />
          <FormInput
            formik={formik}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="my-4"
          />
          <Button className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </form>
        <OAuth />
      </CardContent>
    </Card>
  );
};

export default RegisterTab;
