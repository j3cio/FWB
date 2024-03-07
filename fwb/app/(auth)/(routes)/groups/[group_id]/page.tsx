import { DiscountData, GroupData, UserData } from "@/app/types/types";
import GroupDetailsSection from "@/components/ui/privategroups/groupdetailspage/GroupDetailsSection";
import Tabs from "@/components/ui/privategroups/groupdetailspage/Tabs";
import Navbar from "@/components/ui/privategroups/groupdetailspage/groups_navbar";

import { auth } from "@clerk/nextjs";
import { Box, Container } from "@mui/material";


//TODOs:
// Backend ---
// Search bar for searching members

async function getGroupData(params: { [key: string]: string | string[] | undefined }) {
  const bearer_token = await auth().getToken({ template: "testing_template" });
  const supabase_jwt = await auth().getToken({ template: "supabase" });

  if (!supabase_jwt) {
    console.log("Not signed in");
    return;
  }

  if (params.group_id) {
    var myHeaders = new Headers();
    myHeaders.append("supabase_jwt", supabase_jwt);
    myHeaders.append("Authorization", `Bearer ${bearer_token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/groups?group_id=${params.group_id}`, // add to .env
        requestOptions
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result; // This returns the result object
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error; // This re-throws the error to be handled by the caller
    }
  } else {
    return {
      success: false,
      data: [
        {
          id: "",
          name: "No group id",
          discounts: [],
          admins: "123",
          public: false,
          users: [],
        },
      ],
    };
  }
}

async function getUser(user_id: string) {
  const bearer_token = await auth().getToken({ template: "testing_template" });
  const supabase_jwt = await auth().getToken({ template: "supabase" });

  if (!supabase_jwt) {
    console.log("Not signed in");
    return;
  }

  var myHeaders = new Headers();
  myHeaders.append("supabase_jwt", supabase_jwt);
  myHeaders.append("Authorization", `Bearer ${bearer_token}`);

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

async function getDiscount(discount_id: string) {
  const bearer_token = await auth().getToken({ template: "testing_template" });
  const supabase_jwt = await auth().getToken({ template: "supabase" });

  if (!supabase_jwt) {
    console.log("Not signed in");
    return;
  }

  var myHeaders = new Headers();
  myHeaders.append("supabase_jwt", supabase_jwt);
  myHeaders.append("Authorization", `Bearer ${bearer_token}`);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tempdiscounts?discount_id=${discount_id}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data[0]; // This returns the result object
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // This re-throws the error to be handled by the caller
  }
}

async function getAllDiscountsData(discount_ids: string[]) {
  const promises = discount_ids.map((discount_id: string, key: number) => getDiscount(discount_id));
  const results = await Promise.all(promises);
  return results;
}

async function getAllUserData(user_ids: string[]) {
  const promises = user_ids.map((user_id: string, key: number) => getUser(user_id));
  const results = await Promise.all(promises);
  return results;
}

const page = async ({ params }: { params: { group_id: string } }) => {
  const groupData: GroupData = await getGroupData(params);
  const userData: UserData[] = await getAllUserData(groupData.data[0].users);
  const discountData: DiscountData[] = await getAllDiscountsData(groupData.data[0].discounts);

  return (
    <Box sx={{ backgroundColor: "#1A1A23" }}>
      <Container disableGutters maxWidth="lg">
       <Navbar />
        <Box sx={{ position: "relative", paddingTop: "156px", zIndex: 0 }}>
          <GroupDetailsSection
            userData={userData}
            groupData={groupData.data[0]}
          />
          {/* Something in <Tabs /> is causing a hydration error */}
          <Tabs userData={userData} discountData={discountData} /> 
        </Box>
      </Container>
    </Box>
  );
};

export default page;
