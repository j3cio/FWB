import { Box, Container } from "@mui/material";
import NavBarSkeleton from "../../../../../components/ui/skeletons/variants/NavBarSkeleton";
import GroupDetailsSection from "@/components/ui/privategroups/groupdetailspage/GroupDetailsSection";
import GroupTabsSkeleton from "@/components/ui/skeletons/variants/GroupTabsSkeleton";

export interface GroupData {
  id: string;
  name: string;
  users: string[];
  discounts: string[];
  admins: string[];
}

const Loading = () => {
  return (
    <Box sx={{ backgroundColor: "#1A1A23" }}>
      <Container disableGutters maxWidth="lg">
       <NavBarSkeleton />
        <Box sx={{ position: "relative", paddingTop: "156px", zIndex: 0 }}>
          <GroupDetailsSection
            userData={{ success: true, users: [] }}
            groupData={{
              id: "",
              name: "Loading...",
              users: [],
              discounts: [],
              admins: [],
            }}
          />
          <GroupTabsSkeleton />
        </Box>
      </Container>
    </Box>
  );
};

export default Loading;
