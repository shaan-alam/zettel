import { useState, useEffect, useContext } from "react";
import CodeEditor from "react-simple-code-editor";
// @ts-ignore
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import useDebounce from "@/hooks/useDebounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SaveNoteRequestBody, saveNote } from "@/api/note";
import { IContextType, NoteContext } from "./NoteContext";
import { useRouter } from "next/router";
import { Camera, EyeIcon, EyeOffIcon, Trash, TrashIcon } from "lucide-react";
import MarkdownPreview from "./MarkdownPreview";
import DeleteNoteAlert from "./DeleteNoteAlert";
import { ScrollArea } from "./ui/scroll-area";
import PhotoUploadDialog from "./PhotoUploadDialog";
import { Button } from "./ui/button";

interface MarkdownEditorProps {
  title: string | undefined;
  body: string | undefined;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ title, body }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { selectedNote } = useContext(NoteContext) as IContextType;

  const [editorTitle, setEditorTitle] = useState(title);
  const [editorContent, setEditorContent] = useState(body);
  const [isViewOnlyMode, setIsViewOnlyMode] = useState(false);
  const [showPhotoUploadDialog, setShowPhotoUploadDialog] = useState(false);

  const debouncedEditorTitle = useDebounce(editorTitle, 2000);
  const debouncedEditorContent = useDebounce(editorContent, 2000);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (noteData: SaveNoteRequestBody) => {
      try {
        await saveNote(noteData);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data.message);
        }
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries([
        "get-collection-notes",
        `${router.query["id"]}`,
      ]);
    },
  });

  useEffect(() => {
    // Save the data on every new change
    mutate({
      _id: selectedNote?._id as string,
      title: debouncedEditorTitle,
      body: debouncedEditorContent as string,
    });
  }, [debouncedEditorTitle, debouncedEditorContent, mutate, selectedNote?._id]);

  useEffect(() => {
    setEditorTitle(title);
    setEditorContent(body);
  }, [selectedNote]);

  return (
    <div>
      <div className="flex items-center justify-start p-4 border-b">
        {isViewOnlyMode ? (
          <Button
            variant="outline"
            size="icon"
            className="mr-4"
            onClick={() => setIsViewOnlyMode(false)}
          >
            <EyeOffIcon size={20} />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="mr-4"
            onClick={() => setIsViewOnlyMode(true)}
          >
            <EyeIcon size={20} />
          </Button>
        )}
        <Button
          variant="outline"
          size="icon"
          className="mr-4"
          onClick={() => setShowPhotoUploadDialog(true)}
        >
          <Camera size={20} />
        </Button>
        <Button variant="outline" size="icon" className="mr-4 text-red-500 hover:bg-red-500 hover:text-white">
          <DeleteNoteAlert noteId={selectedNote?._id as string} />
        </Button>
        <span className="ml-4">
          {isLoading && <p className="text-gray-300 italic">Saving...</p>}
        </span>
      </div>
      <PhotoUploadDialog
        open={showPhotoUploadDialog}
        setIsOpen={setShowPhotoUploadDialog}
      />
      <ScrollArea className="h-[88vh]">
        {isViewOnlyMode ? (
          <MarkdownPreview title={editorTitle} body={editorContent} />
        ) : (
          <div>
            <textarea
              className="w-full bg-transparent text-lg font-bold px-2 py-3 outline-none resize-none overflow-hidden text-black dark:text-white"
              rows={1}
              autoFocus
              placeholder="Title"
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.keyCode === 13) {
                  return e.preventDefault();
                }
              }}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setEditorTitle(e.target.value)
              }
              value={editorTitle}
            ></textarea>
            <CodeEditor
              placeholder="Start Typing..."
              padding={10}
              value={editorContent as string}
              onValueChange={(code) => setEditorContent(code)}
              highlight={(code) => highlight(code, languages.js)}
              className="[&>textarea]:outline-none font-mono"
            />
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default MarkdownEditor;
