import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import CreateCollectionDialog from "./CreateCollectionDialog";
import { getCollections } from "@/api/collection";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/router";

const Appbar = () => {
  const router = useRouter();

  const { isLoading, isFetching, data } = useQuery({
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

  return (
    <aside className="border-r h-screen w-[20%]">
      <div className="user-details p-4 border-b">
        
      </div>
      <div className="p-4">
        <CreateCollectionDialog />
        {!isLoading &&
          data &&
          data.collections.map((collection) => (
            <Link href={`/${collection._id}`}>
              <div
                className={clsx(
                  "font-secondary px-3 py-1 my-1 text-sm transition-colors flex items-center rounded-sm",
                  router.query["id"] === collection._id
                    ? "bg-[#f6f6f6] text-gray-900 hover:bg-[#f6f6f6] dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 dark:hover:text-white"
                    : "hover:bg-[#f6f6f6] dark:hover:bg-zinc-900 dark:hover:text-white"
                )}
              >
                {collection.collectionName}
              </div>
            </Link>
          ))}
      </div>
    </aside>
  );
};

export default Appbar;
