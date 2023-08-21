import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { UserInterface, oAuth } from "@/api/auth";
import axios from "axios";
import { useRouter } from "next/router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";
import { AuthContext, IAuthContextType } from "./AuthContext";
import { Loader2 } from "lucide-react";
import useOAuth from "@/hooks/useOAuth";

interface OAuthDataInterface {
  email: string;
  fullName: string;
  avatar: string;
}

const GoogleLogin = () => {
  const router = useRouter();

  const { setUser } = useContext(AuthContext) as IAuthContextType;

  const { mutate, isLoading } = useOAuth({
    onSuccess: (result) => {
      localStorage.setItem("user", JSON.stringify(result));
      setUser(result?.user as UserInterface);
      router.push("/app");
    },
  });

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const { email, displayName, photoURL } = result.user;
      mutate({
        email: email as string,
        fullName: displayName as string,
        avatar: photoURL as string,
      });
    });
  };

  return (
    <Button
      variant="outline"
      disabled={isLoading}
      className="w-full my-4"
      onClick={googleLogin}
    >
      {!isLoading && <img src="/google.png" alt="Google" className="h-4 w-4" />}
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      &nbsp;Google
    </Button>
  );
};

export default GoogleLogin;
