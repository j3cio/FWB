import Productfilters from "@/components/ui/explore/productfilters";
import ResponsiveGrid from "@/components/ui/explore/products_grid";

const DiscountsSection = () => {
  return (
    <div className="bg-[#1a1a23]">
      <div className="mr-10 w-full">
        <Productfilters />
      </div>
      <div className="bg-[#1a1a23]">
        <ResponsiveGrid />
      </div>
    </div>
  );
};

export default DiscountsSection;
