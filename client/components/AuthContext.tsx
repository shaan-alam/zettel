import { UserInterface } from "@/api/auth";
import { createContext, useState } from "react";

export interface IAuthContextType {
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
}

export const AuthContext = createContext<IAuthContextType | null>(null);

const AuthContextProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);

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
