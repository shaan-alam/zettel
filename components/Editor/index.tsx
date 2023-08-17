import { createRef, useEffect, useState, useContext } from "react";
import CodeEditor from "react-simple-code-editor";
import { Scrollbars } from "react-custom-scrollbars-2";
// @ts-ignore
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import EditorToolbar from "../EditorToolbar";
import useDebounce from "@/hooks/useDebounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SaveNoteRequestBody, saveNote } from "@/api/note";
import axios from "axios";
import { useRouter } from "next/router";
import { Context, IContextType } from "../Context/GlobalContext";
import remarkGfm from "remark-gfm";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CodeBlock from "../CodeBlock";
import { useTheme } from "next-themes";
import Scrollbar from "../ui/scrollbar";

interface EditorProps {
  body: string;
  title: string;
}

const Editor: React.FC<EditorProps> = ({ body, title }) => {
  const { theme, setTheme } = useTheme();

  const { selectedNote } = useContext(Context) as IContextType;
  const [isViewOnlyMode, setViewOnlyMode] = useState(false);

  const queryClient = useQueryClient();
  const [editorContent, setEditorContent] = useState(body);
  const [editorTitle, setEditorTitle] = useState(title);
  const editorTitleRef = createRef<HTMLTextAreaElement>();

  const router = useRouter();

  const debouncedEditorContent = useDebounce(editorContent, 1000);
  const debouncedEditorTitle = useDebounce(editorTitle, 1000);

  const [noteSaveError, setNoteSaveError] = useState("");

  const { isLoading, mutate } = useMutation(
    async (noteData: SaveNoteRequestBody) => {
      try {
        await saveNote(noteData);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error("Some Problem Occured while saving...");
        }
      }
    },
    {
      onError: (err: ReturnType<ErrorConstructor>) => {
        setNoteSaveError(err.message);
      },
      onSuccess: () => {
        queryClient.refetchQueries([
          "get-collection-notes",
          router.query["id"] as string,
        ]);
      },
    }
  );

  useEffect(() => {
    editorTitleRef?.current?.focus();
  }, []);

  useEffect(() => {
    setEditorContent(body);
    setEditorTitle(title);
  }, [body, title]);

  useEffect(() => {
    mutate({
      title: debouncedEditorTitle,
      body: debouncedEditorContent,
      _id: selectedNote?._id as string,
    });
  }, [debouncedEditorContent, debouncedEditorTitle]);

  return (
    <div className="editor h-[90%]">
      <EditorToolbar
        isSaving={isLoading}
        noteSaveError={noteSaveError}
        isViewOnlyMode={isViewOnlyMode}
        setViewOnlyMode={setViewOnlyMode}
      />

      {!isViewOnlyMode && (
        <Scrollbar height="100%">
          <div className="p-1">
            <textarea
              ref={editorTitleRef}
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
              value={editorContent}
              onValueChange={(code) => setEditorContent(code)}
              highlight={(code) => highlight(code, languages.js)}
            />
          </div>
        </Scrollbar>
      )}
      {isViewOnlyMode && (
        <Scrollbar height="100%">
          <div className="px-4 py-2 overflow-auto leading-7 [&>*]:my-2 [&>h2]:text-5xl [&>h3]:text-4xl [&>h4]:text-3xl [&>h5]:text-3xl [&>h6]:text-2xl [&>h1]:my-6 [&>h2]:my-6 [&>h3]:my-6 [&>h4]:my-6 [&>h5]:my-6 [&>h6]:my-6 [&>h1]:font-bold [&>h2]:font-bold [&>h3]:font-bold [&>h4]:font-bold [&>h5]:font-bold [&>h6]:font-bold  dark:[&>*]:text-gray-200">
            <h1 className="font-bold mb-4 text-black dark:text-white text-lg">
              {editorTitle}
            </h1>
            <ReactMarkdown
              children={editorContent}
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ children, href, ...props }: any) => {
                  return (
                    <a href={href} className="text-blue-500">
                      {children}
                    </a>
                  );
                },
                code: ({ ...props }: any) => {
                  return (
                    <CodeBlock
                      code={props.children[0]}
                      language={props.className.split("-")[1]}
                    />
                  );
                },
                img: ({ ...props }: any) => {
                  return (
                    <img src={props.src} alt={props.alt} className="my-4" />
                  );
                },
              }}
            />
          </div>
        </Scrollbar>
      )}
    </div>
  );
};

export default Editor;
