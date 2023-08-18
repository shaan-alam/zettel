import { useState } from "react";
import Appbar from "./Appbar";

const HomeLayout: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  const [editor, setEditor] = useState(true);

  return (
    <section className="flex">
      <Appbar />
      {children}
    </section>
  );
};

export default HomeLayout;
