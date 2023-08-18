import { useContext } from "react";
import HomeLayout from "@/components/HomeLayout";
import MarkdownEditor from "@/components/MarkdownEditor";
import Sidebar from "@/components/Sidebar";
import { IContextType, NoteContext } from "@/components/NoteContext";

const Collection = () => {
  const { selectedNote } = useContext(NoteContext) as IContextType;

  return (
    <HomeLayout>
      <Sidebar />
      <div className="editor w-[60%]">
        {selectedNote && (
          <MarkdownEditor
            title={selectedNote?.title}
            body={selectedNote?.body}
          />
        )}
      </div>
    </HomeLayout>
  );
};

export default Collection;
