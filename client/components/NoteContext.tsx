import { createContext, useState } from "react";
import { NoteInterface } from "@/api/collection";

export interface IContextType {
  selectedNote: NoteInterface | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<NoteInterface | null>>;
}

export const NoteContext = createContext<IContextType | null>(null);

const NoteContextProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [selectedNote, setSelectedNote] = useState<NoteInterface | null>(null);

  return (
    <NoteContext.Provider
      value={{
        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
