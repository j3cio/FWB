import Navbar from "@/components/ui/privategroups/groups_navbar";
import { auth } from "@clerk/nextjs";
import { Box, Button, Container } from "@mui/material";
import Link from "next/link";


//TODOs:
// Backend ---
// Search bar for searching members

async function getUser(user_id: any, supabaseToken: any, bearerToken: any) {
  var myHeaders = new Headers();
  myHeaders.append("supabase_jwt", supabaseToken);
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${user_id}`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result; // This returns the result object
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // This re-throws the error to be handled by the caller
  }
}

const page = async () => {
  const bearer_token = await auth().getToken({ template: "testing_template" });
  const supabase_jwt = await auth().getToken({ template: "supabase" });
  const userId = await auth().userId;
  const userData: any = await getUser(userId, supabase_jwt, bearer_token);

  console.log(userData.users[0].user_groups);

  if (userData.users[0].user_groups.length == 0) {
    return (
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
            <Button> Create a group </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
      <Container disableGutters maxWidth="lg">
        <Navbar />
        <Box sx={{ position: "relative", marginTop: "156px", zIndex: 0 }}>
          {userData.users[0].user_groups.map((group_id: string, key: number) => {
            return (
              <Link href={`/groups/${group_id}`} className="text-white bg-purple-400 p-4 mr-10" key={key}>
                Group {`${key}`}
              </Link>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default page;
