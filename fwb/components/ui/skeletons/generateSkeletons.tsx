import { LoadingSkeletonProps } from "@/app/types/types";

import ProductCardSkeleton from "./variants/ProductCardSkeleton";
import TitleAndButtonsSkeleton from "./variants/TitleAndButtonsSkeleton";
import NavBarSkeleton from "./variants/NavBarSkeleton";
import ProductFiltersSkeleton from "./variants/ProductFiltersSkeleton";

export const generateSkeletons = ({ type, quantity }: LoadingSkeletonProps) => {
  const skeletons = Array.from({ length: quantity || 1 }, () => (
    <CustomSkeleton key={crypto.randomUUID()} type={type} />
  ));

  return skeletons;
};

const CustomSkeleton = ({ type }: LoadingSkeletonProps) => {
  // While switch statements are less maintainable at higher scale, Since this is for loading skeletons, the amount
  // of statements should be limited, making alternatives like Object lookup less performant.
  switch (type) {
    case "ProductCard":
      return <ProductCardSkeleton />;

    case "TitleAndButtons":
      return <TitleAndButtonsSkeleton />;

    case "NavBar":
      return <NavBarSkeleton />;

    case "ProductFilters": 
      return <ProductFiltersSkeleton />;
      
    default:
      return;
  }
};
