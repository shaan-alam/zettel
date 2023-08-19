import type { SkeletonProps } from "react-loading-skeleton";
import Skeleton from "react-loading-skeleton";

export interface GenerateSkeletonsProps extends SkeletonProps {
  number: number;
}

export const generateSkeletons = ({
  number,
  ...props
}: GenerateSkeletonsProps) => {
  const SkeletonComponent = (skeletonComponentProps: SkeletonProps) => {
    return <Skeleton {...skeletonComponentProps} />;
  };

  return (
    <>
      {new Array(number).fill(10).map((_) => (
        <SkeletonComponent {...props} />
      ))}
    </>
  );
};
