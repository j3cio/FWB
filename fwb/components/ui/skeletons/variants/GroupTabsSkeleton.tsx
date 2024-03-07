// This is a fairly involves layout since /groups uses RSCs, so we can't rely on using an isLoading state, but Tabs is also fairly abstracted (with some prop drilling) so I can't just drop <ProductCardSkeleton /> components in a suspense boundary. Therefore we'll mock up the Tabs component itself, but replace any data calls with placeholders.

import { Box, Grid, Typography } from "@mui/material";
import ProductFiltersSkeleton from "./ProductFiltersSkeleton";
import { generateSkeletons } from "../generateSkeletons";

const GroupTabsSkeleton = () => {
  return (
    <div
      className="w-full bg-[#1a1a23]"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="flex flex-row justify-evenly items-center mt-10 mb-10 ml-24 mr-40">
        <div
          className={`w-1/2 hover:text-white hover:border-b-2 hover:border-white font-bold text-3xl  text-white border-b-2 border-white
            }`}
        >
          <Box textAlign="center">
            <Typography className=" items-center font-bold text-3xl">
              Discounts Offers
            </Typography>
          </Box>
        </div>
        <div
          className={`w-1/2 hover:text-white hover:border-b-2 hover:border-white font-bold text-3xl text-gray-600
            }`}
        >
          <Box textAlign="center">
            <Typography className=" items-center font-bold text-3xl">
              Members
            </Typography>
          </Box>
        </div>
      </div>
      <div className="ml-24 mr-24">
      </div>
      <div className="w-full">
        <div className="bg-[#1a1a23]">
          <div className="w-11/12 bg-white">
            <ProductFiltersSkeleton />
          </div>
          <div className="flex justify-center">
            <Box
              sx={{
                flexGrow: 1,
                paddingBottom: "20px",
                justifyContent: "center",
                minHeight: "1706px",
              }}
            >
              <Grid
                container
                spacing={2}
                rowGap={2}
                sx={{ marginBottom: "60px" }}
              >
                <div className="flex flex-wrap gap-x-4 ml-2">
                  {generateSkeletons({ type: "ProductCard", quantity: 20 })}
                </div>
              </Grid>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupTabsSkeleton;
