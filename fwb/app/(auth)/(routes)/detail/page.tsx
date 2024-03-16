import { auth } from "@clerk/nextjs";
import DetailPage from "./detail";
import { useRouter, useSearchParams } from "next/navigation";
import { CompanyAndDiscounts } from "@/app/types/types";

const handleSearch = async () => {
  try {
    const bearer_token = await auth().getToken({
      template: "testing_template",
    });
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/companies/search?companyQuery=nike`,
        requestOptions,
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
  } catch (error) {
    console.error("GET Company Discount API Failed", error);
  }
};

const page = async () => {
  const companyData: CompanyAndDiscounts = await handleSearch();

  return (
    <div>
      <DetailPage companyData={companyData} />
    </div>
  );
};

export default page;
