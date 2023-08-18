import Appbar from "@/components/Appbar";
import HomeLayout from "@/components/HomeLayout";
import Sidebar from "@/components/Sidebar";

const Home = () => {
  return (
    <HomeLayout>
      <div className="h-screen w-full flex items-center justify-center">
        <p>start using zettel right now</p>
      </div>
    </HomeLayout>
  );
};

export default Home;
