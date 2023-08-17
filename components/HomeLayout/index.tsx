import { useContext } from "react";
import Appbar from "../Appbar";
import dynamic from "next/dynamic";
import { Context, IContextType } from "../Context/GlobalContext";
import { ThemeProvider } from "../theme-provider";
import RootLayout from "../RootLayout";
import Scrollbars from "react-custom-scrollbars-2";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { selectedNote } = useContext(Context) as IContextType;

  return (
    <RootLayout>
      <section className="home flex h-[100vh] overflow-hidden">
        <Appbar />
        {children}
        <div className="editor w-[60%]">
          {selectedNote && (
            <Editor body={selectedNote?.body} title={selectedNote?.title} />
          )}
        </div>
      </section>
    </RootLayout>
  );
};

export default HomeLayout;
