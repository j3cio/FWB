import { DiscountData } from "@/app/types/types";
import Header from "@/components/ui/explore/header";
import GroupDetailsSection from "@/components/ui/privategroups/GroupDetailsSection";
import Tabs from "@/components/ui/privategroups/Tabs";
import { auth } from "@clerk/nextjs";
//TODOs:
// Backend ---
// Search bar for searching members

async function getGroupData(
  searchParams: { [key: string]: string | string[] | undefined },
  supabaseToken: any,
  bearerToken: any
) {
  var myHeaders = new Headers();
  myHeaders.append("supabase_jwt", supabaseToken);
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

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

async function getUser(user_id: string, supabaseToken: any, bearerToken: any) {
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

async function getDiscount(discount_id: string, supabaseToken: any, bearerToken: any) {
  var myHeaders = new Headers();
  myHeaders.append("supabase_jwt", supabaseToken);
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/discounts?discount_id=${discount_id}`,
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

async function getAllDiscountsData(discount_ids: string[], supabaseToken: any, bearerToken: any) {
  const promises = discount_ids.map((discount_id: string, key: number) =>
    getDiscount(discount_id, supabaseToken, bearerToken)
  );
  const results = await Promise.all(promises);
  return results;
}

async function getAllUserData(user_ids: string[], supabaseToken: any, bearerToken: any) {
  const promises = user_ids.map((user_id: string, key: number) => getUser(user_id, supabaseToken, bearerToken));
  const results = await Promise.all(promises);
  return results;
}

const page = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const bearer_token = await auth().getToken({ template: "testing_template" });
  const supabase_jwt = await auth().getToken({ template: "supabase" });
  const groupData = await getGroupData(searchParams, supabase_jwt, bearer_token);
  const userData: any = await getAllUserData(groupData.data[0].users, supabase_jwt, bearer_token);
  const discountData: DiscountData[] = await getAllDiscountsData(
    groupData.data[0].discounts,
    supabase_jwt,
    bearer_token
  );
  return (
    <div className="bg-[#1a1a23] h-screen w-screen overflow-x-hidden">
      <Header />
      <GroupDetailsSection userData={userData} groupData={groupData.data[0]} />
      <Tabs userData={userData} discountData={discountData} />
    </div>
  );
};

export default page;
