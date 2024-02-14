"use client";
import { UserData } from "@/app/types/types";
import Navbar from "@/components/ui/privategroups/groupdetailspage/groups_navbar";
import CreateGroupForm from "@/components/ui/privategroups/groups/modal/CreateGroupForm";
import { Box, Button, Container, Modal } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Type userData
const GroupsHomePage = ({ userData }: {userData: UserData}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(userData.users[0].user_groups)

  if (userData.users[0].user_groups.length == 0) {
    return (
      <div className="w-full h-full">
        <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
          <Container disableGutters maxWidth="lg">
            <Navbar />
            <Box
              sx={{
                borderRadius: 28,
                borderStyle: "solid",
                borderColor: "white",
                borderWidth: 2,
                bgcolor: "white",
              }}
            >
              <Button onClick={handleOpen}> Create a group </Button>
            </Box>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <CreateGroupForm userGroups={userData.users[0].user_groups} handleClose={handleClose} />
              </Box>
            </Modal>
          </Container>
        </Box>
      </div>
    );
  }

  const navigateToUserPage = (group_id: string) => {
    window.location.href = `/groups/${group_id}`;
  };

  return (
    <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
      <Container disableGutters maxWidth="lg">
        <Navbar />
        <Box sx={{ position: "relative", marginTop: "156px", zIndex: 0 }}>
          {userData.users[0].user_groups.map((group_id: string) => {
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
          })}
        </Box>
      </Container>
      <Button
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
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateGroupForm userGroups={userData.users[0].user_groups} handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default GroupsHomePage;
