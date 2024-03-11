import { DiscountData } from "@/app/types/types";
import Productfilters from "@/components/ui/explore/productfilters";
import { Box, Grid } from "@mui/material";
import DiscountCard from "./DiscountCard";

const DiscountsSection = ({
  discountData,
}: {
  discountData: DiscountData[];
}) => {
  return (
    <div className="bg-[#1a1a23]">
      <div className="w-11/12">
        <Productfilters />
      </div>
      <div className=" flex justify-center ml-24">
        <Box
          sx={{
            flexGrow: 1,
            paddingBottom: "20px",
            justifyContent: "center",
            minHeight: "100%",
          }}
        >
          <Grid container spacing={2} rowGap={2} sx={{ marginBottom: "60px" }}>
            {discountData.map((company: any, index: React.Key) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                sx={{ width: "282px", height: "322px" }}
              >
                <DiscountCard company={company} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default DiscountsSection;
