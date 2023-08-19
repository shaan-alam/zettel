import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import FormInput from "@/components/FormInput";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/auth";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as yup from "yup";

interface LoginFormFormikProps {
  email: string;
  password: string;
}
const LoginTab = () => {
  const router = useRouter();
  const [serverLoginError, setServerLoginError] = useState("");

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
      login({
        ...values,
      });
    },
  });

  const { isLoading: isLoggingIn, mutate: login } = useMutation(
    async (formData: typeof formik.values) => {
      const result = await signIn(formData);
    },
    {
      onSuccess: (res) => {
        // localStorage.setItem("user", JSON.stringify({ ...res }));
        router.push("/");
      },
      onError: (error: ReturnType<ErrorConstructor>) => {
        setServerLoginError(error.message);
      },
    }
  );

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
          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginTab;
