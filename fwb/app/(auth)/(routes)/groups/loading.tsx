import NavBarSkeleton from "@/components/ui/skeletons/variants/NavBarSkeleton";
import { Box, Container } from "@mui/material";

const Loading = () => {
  // Skeleton left extremely unfinished here since this Groups UI isn't created yet
  return (
    <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
      <Container disableGutters maxWidth="lg">
        <NavBarSkeleton />
        <Box sx={{ position: "relative", marginTop: "156px", zIndex: 0 }}>
          {/* {userData.users[0].user_groups.map((group_id: string) => {
          return (
            <Button
              variant="contained"
              sx={{
                borderRadius: 28,
                borderStyle: "solid",
                borderColor: "white",
                borderWidth: 2,
                bgcolor: "white",
                margin: 2,
              }}
              key={group_id}
              onClick={() => navigateToUserPage(group_id)}
            >
              {" "}
              group {group_id}{" "}
            </Button>
          );
        })} */}
        </Box>
      </Container>
      {/* <Button
      sx={{
        borderRadius: 28,
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 2,
        bgcolor: "white",
      }}
      onClick={handleOpen}
    >
      {" "}
      Create a group{" "}
    </Button> */}
    </Box>
  );
};

export default Loading;
