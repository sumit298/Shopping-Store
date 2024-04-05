import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => {
  return (
    <div className="flex px-10 flex-col gap-2 dark:bg-gray-800">
    
    <div className="mt-14 flex flex-col gap-4">
      <Skeleton count={1} height={"35px"} />
      <Skeleton count={1} height={"35px"} />

    </div>
    <div className="flex flex-col gap-2 py-6">
      <Skeleton
        count={4}
        containerClassName={"flex gap-2 justify-between w-full h-96"}
      />
      <Skeleton
        count={4}
        containerClassName={"flex gap-2 justify-between w-full h-96 "}
      />
    </div>
  </div>
  );
};

export default SkeletonCard;
