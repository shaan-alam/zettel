import Appbar from "./Appbar";

const HomeLayout: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return (
    <section className="flex">
      <Appbar />
      {children}
    </section>
  );
};

export default HomeLayout;
