import Appbar from "@/components/Appbar";
import HomeLayout from "@/components/HomeLayout";
import Sidebar from "@/components/Sidebar";

const Home = () => {
  return (
    <HomeLayout>
      <div className="h-screen w-full flex items-center justify-center">
        <div>
          <p className="text-gray-300 font-semibold text-center -my-12">
            Select a collection or create a new collection and start making notes!! 😇
          </p>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
