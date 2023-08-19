import { CollectionInterface } from "@/api/collection";
import clsx from "clsx";
import { Folder } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const AppbarLink: React.FC<{ collection: CollectionInterface }> = ({
  collection: { _id, collectionName, colorCoding },
}) => {
  const router = useRouter();

  return (
    <Link href={`/${_id}`}>
      <div
        className={clsx(
          "font-secondary px-3 py-1 my-1 text-sm transition-colors flex items-center rounded-sm",
          router.query["id"] === _id
            ? "bg-[#f6f6f6] text-gray-900 hover:bg-[#f6f6f6] dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 dark:hover:text-white"
            : "hover:bg-[#f6f6f6] dark:hover:bg-zinc-900 dark:hover:text-white"
        )}
      >
        <Folder
          color={colorCoding}
          size={15}
          fill={colorCoding}
          className="mr-1"
        />
        {collectionName}
      </div>
    </Link>
  );
};

export default AppbarLink;
