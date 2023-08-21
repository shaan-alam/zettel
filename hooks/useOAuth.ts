import { AuthResponseInterface, UserInterface, oAuth } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface OAuthDataInterface {
  email: string;
  fullName: string;
  avatar: string;
}

interface UseOAuthProps {
  onSuccess:
    | ((
        data: AuthResponseInterface | undefined,
        variables: OAuthDataInterface,
        context: unknown
      ) => unknown)
    | undefined;
}

const useOAuth = ({ onSuccess }: UseOAuthProps) => {
  return useMutation({
    mutationFn: async (oAuthData: OAuthDataInterface) => {
      try {
        const result = await oAuth(oAuthData);
        return result.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data.message);
        }
      }
    },
    onSuccess,
  });
};

export default useOAuth;
