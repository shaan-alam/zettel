import Appbar from "@/components/Appbar";
import Image from "next/image";
import HomeLayout from "@/components/HomeLayout";
import RootLayout from "@/components/RootLayout";

export default function Home() {
  return (
    <RootLayout>
      <HomeLayout>
        <div className="w-[70%] flex items-center justify-center">
          <div className="container w-[400px] text-center">
            <Image
              src="/hero.svg"
              height={200}
              width={200}
              alt="Hero Image"
              className="mx-auto"
            />
            <p className="text-sm text-gray-400 my-4">
              Organize your notes in Zettel which is a markdown editor!
            </p>
          </div>
        </div>
      </HomeLayout>
    </RootLayout>
  );
}
