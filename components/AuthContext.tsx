import { AuthResponseInterface, UserInterface } from "@/api/auth";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export interface IAuthContextType {
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
}

export const AuthContext = createContext<IAuthContextType | null>(null);

const AuthContextProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const router = useRouter();

  useEffect(() => {
    const payload: AuthResponseInterface = JSON.parse(
      localStorage.getItem("user") || "{}"
    );
    const token = payload.token || "";

    if (token !== "") {
      setUser(payload.user);
      router.push("/app");
    } else {
      router.push("/");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
