import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import CreateCollectionDialog from "./CreateCollectionDialog";
import { getCollections } from "@/api/collection";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AuthContext, IAuthContextType } from "./AuthContext";
import { Folder, LogOut, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { ModeToggle } from "./theme-toggle";

const Appbar = () => {
  const router = useRouter();

  const { user, setUser } = useContext(AuthContext) as IAuthContextType;

  const [showCreateCollectionDialog, setShowCreateCollectionDialog] =
    useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ["get-collections"],
    queryFn: async () => {
      try {
        const result = await getCollections();
        return result.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data.message);
        }
      }
    },
  });

  const logOut = () => {
    localStorage.setItem("user", "");
    setUser(null);
    router.push("/auth");
  };

  return (
    <aside className="border-r h-screen w-[20%]">
      <div className="user-details p-4 border-b flex items-center justify-between">
        <div className="user-details-left flex items-center">
          <img src={user?.avatar} alt={user?.fullName} className="h-10 w-10" />
          &nbsp;{user?.fullName}
        </div>
        <div className="links flex items-center">
          <div className="theme-toggler mr-2">
            <ModeToggle></ModeToggle>
          </div>
          <div className="logout-btn">
            <Button variant="outline" size="icon" onClick={logOut}>
              <LogOut size={20} />
            </Button>
          </div>
        </div>
      </div>
      <ScrollArea className="h-[90vh]">
        <div>
          <div
            className="font-secondary px-3 py-2 text-sm transition-colors hover:bg-[#eee] hover:text-black dark:hover:bg-zinc-800 dark:hover:text-white flex items-center cursor-pointer"
            onClick={() => setShowCreateCollectionDialog(true)}
          >
            <Plus size={15} />
            &nbsp;New Collection
          </div>
          <CreateCollectionDialog
            open={showCreateCollectionDialog}
            setIsOpen={setShowCreateCollectionDialog}
          />
          {data?.collections.length === 0 && (
            <p className="text-sm text-gray-400 p-4">
              Create a Collection to start making notes!
            </p>
          )}
          {!isLoading &&
            data &&
            data.collections.map((collection) => (
              <Link href={`/${collection._id}`}>
                <div
                  className={clsx(
                    "font-secondary px-3 py-1 my-1 text-sm transition-colors flex items-center",
                    router.query["id"] === collection._id
                      ? "bg-[#f6f6f6] text-gray-900 hover:bg-[#f6f6f6] dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 dark:hover:text-white"
                      : "hover:bg-[#f6f6f6] dark:hover:bg-zinc-900 dark:hover:text-white"
                  )}
                >
                  <Folder
                    size={20}
                    fill={collection.colorCoding}
                    color={collection.colorCoding}
                  />
                  &nbsp;{collection.collectionName}
                </div>
              </Link>
            ))}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Appbar;
