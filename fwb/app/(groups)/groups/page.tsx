import Header from "@/components/ui/explore/header";
import GroupDetailsSection from "@/components/ui/privategroups/GroupDetailsSection";
import Tabs from "@/components/ui/privategroups/Tabs";

//TODOs:
// Backend ---
// Search bar for searching members

async function getGroupData(searchParams: { [key: string]: string | string[] | undefined }) {
  var myHeaders = new Headers();
  myHeaders.append(
    "supabase_jwt",
    "eyJhbGciOiJIUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsInR5cCI6IkpXVCJ9.eyJhcHBfbWV0YWRhdGEiOnt9LCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiYXpwIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiZW1haWwiOiJkZXJpY2tAajNjLmlvIiwiZXhwIjoyMDIwNDQ0OTgzLCJpYXQiOjE3MDUwODQ5ODMsImlzcyI6Imh0dHBzOi8vbXVzaWNhbC1jb2xsaWUtODAuY2xlcmsuYWNjb3VudHMuZGV2IiwianRpIjoiYWFlMTExMTFhNTdlNjQ4YjUwZTUiLCJuYmYiOjE3MDUwODQ5NzgsInJvbGUiOiJhdXRoZW50aWNhdGVkIiwic3ViIjoidXNlcl8yYU1oR2pzcnV3ajgwbmhqMWJmSkFkazhLTkkiLCJ1c2VyX2lkIjoidXNlcl8yYU1oR2pzcnV3ajgwbmhqMWJmSkFkazhLTkkiLCJ1c2VyX21ldGFkYXRhIjp7fX0.R_5DkJzkoLqcUFKC8bfMQ0Xr5QoUgDTBDi_3cqvqT0M"
  );
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18yWEpITkRrNmpLRTZPZTN0T1MxRFFyNjB3cjAiLCJ0eXAiOiJKV1QifQ.eyJhcHBfbWV0YWRhdGEiOnt9LCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiYXpwIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiZW1haWwiOiJkZXJpY2tAajNjLmlvIiwiZXhwIjoyMDIwNDQ0OTc1LCJpYXQiOjE3MDUwODQ5NzUsImlzcyI6Imh0dHBzOi8vbXVzaWNhbC1jb2xsaWUtODAuY2xlcmsuYWNjb3VudHMuZGV2IiwianRpIjoiZWNmZDg4OWIxMGQ4NmE3NWQ3ZDUiLCJuYmYiOjE3MDUwODQ5NzAsInJvbGUiOiJhdXRoZW50aWNhdGVkIiwic3ViIjoidXNlcl8yYU1oR2pzcnV3ajgwbmhqMWJmSkFkazhLTkkiLCJ1c2VyX2lkIjoidXNlcl8yYU1oR2pzcnV3ajgwbmhqMWJmSkFkazhLTkkiLCJ1c2VyX21ldGFkYXRhIjp7fX0.Z8toIkcWitiYAtLlbw3xF97KGBEHk6nCbVUHKZm2DjW1ADKB80lVHp0En5C0bYEbcuAq4EC0WD6ytxsKZB8_XVzm1rwa5IkDXX05qIt_KRXW3lor42nmcIk7oAp81E5kjg0Yaga1JX4cFiebtpSFMvcJQ_ofnnEF0ILA9JRxwS8XSHmffkt_OLM9evh0Vkq7ny6F23bUn9o9vXCzkJqh6tTz1MPwXUfvAa5QFCkLBRIm6tb7i_DKAAmUmiK3z0TdpXDDu2SIzzel2mpBLOKl5S1kYN1fjnYsT3swUeVlAifXa1ezYeoilpePs_BY2SascNBQ8Pf7b6EifysXTTpkpQ"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/groups?group_id=${searchParams.group_id}`, // add to .env
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
}

async function getUserData() {
  var myHeaders = new Headers();
  myHeaders.append(
    "supabase_jwt",
    "eyJhbGciOiJIUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsInR5cCI6IkpXVCJ9.eyJhcHBfbWV0YWRhdGEiOnt9LCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiYXpwIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiZW1haWwiOiJkZXJpY2tAajNjLmlvIiwiZXhwIjoyMDIwNDQ0OTgzLCJpYXQiOjE3MDUwODQ5ODMsImlzcyI6Imh0dHBzOi8vbXVzaWNhbC1jb2xsaWUtODAuY2xlcmsuYWNjb3VudHMuZGV2IiwianRpIjoiYWFlMTExMTFhNTdlNjQ4YjUwZTUiLCJuYmYiOjE3MDUwODQ5NzgsInJvbGUiOiJhdXRoZW50aWNhdGVkIiwic3ViIjoidXNlcl8yYU1oR2pzcnV3ajgwbmhqMWJmSkFkazhLTkkiLCJ1c2VyX2lkIjoidXNlcl8yYU1oR2pzcnV3ajgwbmhqMWJmSkFkazhLTkkiLCJ1c2VyX21ldGFkYXRhIjp7fX0.R_5DkJzkoLqcUFKC8bfMQ0Xr5QoUgDTBDi_3cqvqT0M"
  );
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18yWEpITkRrNmpLRTZPZTN0T1MxRFFyNjB3cjAiLCJ0eXAiOiJKV1QifQ.eyJhcHBfbWV0YWRhdGEiOnt9LCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiYXpwIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiZW1haWwiOiJkZXJpY2tAajNjLmlvIiwiZXhwIjoyMDIwNDQ0OTc1LCJpYXQiOjE3MDUwODQ5NzUsImlzcyI6Imh0dHBzOi8vbXVzaWNhbC1jb2xsaWUtODAuY2xlcmsuYWNjb3VudHMuZGV2IiwianRpIjoiZWNmZDg4OWIxMGQ4NmE3NWQ3ZDUiLCJuYmYiOjE3MDUwODQ5NzAsInJvbGUiOiJhdXRoZW50aWNhdGVkIiwic3ViIjoidXNlcl8yYU1oR2pzcnV3ajgwbmhqMWJmSkFkazhLTkkiLCJ1c2VyX2lkIjoidXNlcl8yYU1oR2pzcnV3ajgwbmhqMWJmSkFkazhLTkkiLCJ1c2VyX21ldGFkYXRhIjp7fX0.Z8toIkcWitiYAtLlbw3xF97KGBEHk6nCbVUHKZm2DjW1ADKB80lVHp0En5C0bYEbcuAq4EC0WD6ytxsKZB8_XVzm1rwa5IkDXX05qIt_KRXW3lor42nmcIk7oAp81E5kjg0Yaga1JX4cFiebtpSFMvcJQ_ofnnEF0ILA9JRxwS8XSHmffkt_OLM9evh0Vkq7ny6F23bUn9o9vXCzkJqh6tTz1MPwXUfvAa5QFCkLBRIm6tb7i_DKAAmUmiK3z0TdpXDDu2SIzzel2mpBLOKl5S1kYN1fjnYsT3swUeVlAifXa1ezYeoilpePs_BY2SascNBQ8Pf7b6EifysXTTpkpQ"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, requestOptions);
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


const page = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const groupData = await getGroupData(searchParams);
  const userData = await getUserData(); // This function should take an array of userIds that are part of the group and return an array of userData

  return (
    <div className="bg-[#1a1a23] h-screen w-screen overflow-x-hidden">
      <Header />
      <GroupDetailsSection userData={userData.users} groupData={groupData.data[0]}/>
      <Tabs userData={userData} groupData={groupData.data[0]} />
    </div>
  );
};

export default page;
