import { Box, Container, Skeleton } from "@mui/material";
import NavBarSkeleton from "../../../../../components/ui/skeletons/variants/NavBarSkeleton";
import GroupDetailsSection from "@/components/ui/privategroups/groupdetailspage/GroupDetailsSection";
import GroupTabsSkeleton from "@/components/ui/skeletons/variants/GroupTabsSkeleton";


const Loading = () => {
  return (
    <Box sx={{ backgroundColor: "#1A1A23" }}>
      <Container disableGutters maxWidth="lg">
        <NavBarSkeleton />
        <Box sx={{ position: "relative", paddingTop: "156px", zIndex: 0 }}>
          <div className="h-2/3 w-full bg-white my-10 flex flex-col">
            <Skeleton />
          </div>
          <GroupTabsSkeleton />
        </Box>
      </Container>
    </Box>
  );
};

export default Loading;
