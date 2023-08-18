import HomeLayout from "@/components/HomeLayout";
import Sidebar from "@/components/sidebar";

const Collection = () => {
  return (
    <HomeLayout>
      <Sidebar />
      <div className="editor w-[60%]">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non quos
        quaerat minus. Adipisci maxime nisi autem ducimus amet magni iure,
        repellat deleniti laboriosam, eveniet culpa dicta! Incidunt obcaecati
        tenetur laborum.
      </div>
    </HomeLayout>
  );
};

export default Collection;
