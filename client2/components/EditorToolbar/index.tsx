import { Eye, EyeOff, Loader2 } from "lucide-react";

interface EditorToolbarProps {
  isSaving: boolean;
  noteSaveError: string;
  isViewOnlyMode: boolean;
  setViewOnlyMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  isSaving,
  noteSaveError,
  isViewOnlyMode,
  setViewOnlyMode,
}) => {
  return (
    <div className="w-full flex p-4 border-b">
      <div className="left flex">
        {!isViewOnlyMode ? (
          <a
            href="#!"
            className="p-1 border rounded-full transition-colors hover:bg-[#eee] dark:hover:bg-zinc-800 mr-3"
            onClick={() => setViewOnlyMode(true)}
          >
            <Eye size={20} className="text-gray-500" />
          </a>
        ) : (
          <a
            href="#!"
            className="p-1 border rounded-full transition-colors hover:bg-[#eee] dark:hover:bg-zinc-800 mr-3"
            onClick={() => setViewOnlyMode(false)}
          >
            <EyeOff size={20} className="text-gray-500" />
          </a>
        )}
        {isSaving && (
          <div className="flex items-center text-gray-400 italic">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </div>
        )}
        {noteSaveError && (
          <span className="text-sm text-red-500">{noteSaveError}</span>
        )}
      </div>
      <div className="right"></div>
    </div>
  );
};

export default EditorToolbar;
