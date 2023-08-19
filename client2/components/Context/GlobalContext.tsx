import { createContext, useState } from "react";
import { NoteInterface } from "../../api/collection";

export interface IContextType {
  selectedNote: NoteInterface | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<NoteInterface | null>>;
}

export const Context = createContext<IContextType | null>(null);

const ContextProvider: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  const [selectedNote, setSelectedNote] = useState<NoteInterface | null>(null);

  return (
    <Context.Provider
      value={{
        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
