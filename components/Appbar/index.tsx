"use client";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "@/api/collection";
import axios from "axios";
import AppbarLink from "../AppbarLink";
import { generateSkeletons } from "@/lib/generateSkeletons";
import CreateCollectionDialog from "../CreateCollectionDialog";
import { ModeToggle } from "../theme-toggler";
import Scrollbar from "../ui/scrollbar";

const Appbar = () => {
  const { isLoading, isFetching, data } = useQuery(
    ["get-collections"],
    async () => {
      try {
        const res = await getCollections();
        return res.data.collections;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data.message);
        }
      }
    },
    {
      refetchOnWindowFocus: false,
      onError: (err: ReturnType<ErrorConstructor>) => {
        console.log(err.message);
      },
    }
  );

  return (
    <div className="appbar w-[20%] border-r mb-12 h-[90vh]">
      <div className="avatar-menu">
        <ModeToggle />
        <Scrollbar height="90vh">
          <div className="collections my-6">
            {(isLoading || isFetching) &&
              generateSkeletons({
                number: 5,
                baseColor: "#eee",
                highlightColor: "#fff",
                width: 250,
                className: "ml-6",
              })}
            {!isLoading && <CreateCollectionDialog />}
            {!isLoading &&
              data &&
              data.map((collection) => <AppbarLink collection={collection} />)}
          </div>
        </Scrollbar>
      </div>
    </div>
  );
};

export default Appbar;
