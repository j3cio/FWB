import { UserData } from "@/app/types/types";
import GroupsHomePage from "@/components/ui/privategroups/groups/GroupsHomePage";
import { auth } from "@clerk/nextjs";

async function getUser() {
  const bearer_token = await auth().getToken({ template: "testing_template" });
  const supabase_jwt = await auth().getToken({ template: "supabase" });

  if (!supabase_jwt) {
    console.log("Not signed in");
    return;
  }

  const userId = await auth().userId;

  var myHeaders = new Headers();
  myHeaders.append("supabase_jwt", supabase_jwt);
  myHeaders.append("Authorization", `Bearer ${bearer_token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`, requestOptions);
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
  const userData: UserData = await getUser();
  return (
    <div >
      <GroupsHomePage userData={userData} />
    </div>
  );
};

export default page;
