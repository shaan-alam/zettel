import { useState, useContext } from "react";
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
import { signIn } from "@/api/auth";
import axios from "axios";
import { AuthContext, IAuthContextType } from "./AuthContext";

interface LoginFormFormikProps {
  email: string;
  password: string;
}
const LoginTab = () => {
  const router = useRouter();
  const [serverLoginError, setServerLoginError] = useState("");

  const { setUser } = useContext(AuthContext) as IAuthContextType;

  const formik = useFormik<LoginFormFormikProps>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Please provide a valid email!")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      mutate({
        ...values,
      });
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: async (formData: typeof formik.values) => {
      try {
        const result = await signIn(formData);
        return result.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data.message);
        }
      }
    },
    onSuccess: (values) => {
      localStorage.setItem("user", JSON.stringify(values));
      // setUser(values?.user);
      router.push("/");
    },
    onError: (err: ReturnType<ErrorConstructor>) => {
      setServerLoginError(err.message);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription className="leading-6">
          Login with your username and password to start using Zettel
        </CardDescription>
      </CardHeader>
      <CardContent>
        {serverLoginError && (
          <span className="text-red-500 text-sm">{serverLoginError}</span>
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
            name="password"
            type="password"
            placeholder="Password"
            className="my-4"
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginTab;
