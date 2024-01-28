import supabaseClient from "@/supabase";
import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { getNewLogoUrl } from "./utils/logos_utils";

/**
 * Handles the POST request for creating a new discount.
 *
 * @param request - The NextRequest object representing the incoming request.
 * @returns A NextResponse object containing the response data.
 */
export async function POST(request: NextRequest) {
  const { userId } = auth();

  // Check if the user is logged in
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized. Failed to obtain current User" }, { status: 401 });
  }

  // Create a supabase client
  // DEV NOTE: This is a temporary fix to get around the fact that we can't create a supabase_jwt with a long-lived session token
  const supabase = await supabaseClient(request.headers.get("supabase_jwt"));
  if (!supabase) {
    return NextResponse.json({ error: "Could not create supabase client" }, { status: 401 });
  }

  const formData = await request.formData();
  // Extract the form data
  const newDiscount = {
    user_id: user.id,
    terms_and_conditions: formData.get("terms_and_conditions"),
    shareable_url: "", //TODO: Generate shareable URL
    discount_amount: formData.get("discount_amount"),
    public: formData.get("public") === "true" ? true : false,
  };

  // Insert the new discount into the database
  const { data: discount, error } = await supabase.from("discounts").insert([newDiscount]).select();
  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to insert discount in supabase" }, { status: 500 });
  }

  // Get the discounts of the company
  const company_url = formData.get("company_url");
  let { data: companyData, error: companyDataError } = await supabase
    .from("companies")
    .select("discounts")
    .eq("url", company_url)
    .single();

  // Create a new company if the company does not exist
  if (companyDataError) {
    const newCompany = {
      discounts: [],
      name: formData.get("company"),
      url: formData.get("company_url"),
      description: "",
      logo: await getNewLogoUrl(String(formData.get("company_url"))),
    };
    // Insert the company into the companies table
    const { data: insertedCompany, error: insertError } = await supabase
      .from("companies")
      .insert([newCompany])
      .single();

    companyData = insertedCompany;

    if (insertError) {
      console.error(insertError);
      return NextResponse.json({ error: "Failed to insert new company in supabase" }, { status: 500 });
    }
  }

  // Insert the discount into the company's discounts array
  const updatedDiscounts = [...(companyData?.discounts || []), String(discount[0].id)];
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .update({ discounts: updatedDiscounts })
    .eq("url", company_url)
    .select();

  if (companyError) {
    console.error(companyError);
    return NextResponse.json({ error: "Failed to insert discount into company" }, { status: 500 });
  }

  // Update the greatest discount of the company and the discounts_updated_at timestamp
  let { data: greatestDiscount, error: greatestDiscountsError } = await supabase
    .from("companies")
    .select("greatest_discount")
    .eq("url", company_url)
    .single();
  if (greatestDiscountsError) {
    console.error(greatestDiscountsError);
    return NextResponse.json({ error: "Failed to get greatest discount of company" }, { status: 500 });
  }

  const { data: updatedCompany, error: updatedCompanyError } = await supabase
    .from("companies")
    .update({
      greatest_discount: Math.max(Number(formData.get("discount_amount")), greatestDiscount?.greatest_discount || 0),
      discounts_updated_at: new Date(),
    })
    .eq("url", company_url)
    .select();
  if (updatedCompanyError) {
    console.error(updatedCompanyError);
    return NextResponse.json({ error: "Failed to update greatest discount of company" }, { status: 500 });
  }

  // Insert the discount into the categories' discounts arrays
  const categories = String(formData.get("categories")).split(",");
  categories.forEach(async (category) => {
    let { data: categoryData, error: categoryDataError } = await supabase
      .from("categories")
      .select("discounts")
      .eq("name", category.toLowerCase())
      .single();

    // Insert the discount into the category's discounts array
    const updatedDiscounts = [...(categoryData?.discounts || []), String(discount[0].id)];

    const { data: categoryUpdated, error: categoryUpdatedError } = await supabase
      .from("categories")
      .update({ discounts: updatedDiscounts })
      .eq("name", category.toLowerCase())
      .select();

    if (categoryUpdatedError) {
      console.error(categoryUpdatedError);
      return NextResponse.json({ error: "Failed to insert discount into category" }, { status: 500 });
    }
  });

  return NextResponse.json({ data: discount }, { status: 200 });
}

/**
 * Retrieves discounts based on the provided query parameters.
 *
 * @param request - The NextRequest object containing the query parameters.
 * @returns A NextResponse object containing the fetched discounts.
 */
export async function GET(request: NextRequest) {
  // Extract the filters from the query params
  let sort_by = String(request.nextUrl.searchParams.get("sort_by")).toLowerCase();
  let private_group = request.nextUrl.searchParams.get("private_group") || "all";
  let category = String(request.nextUrl.searchParams.get("category")).toLowerCase();
  let page_num = request.nextUrl.searchParams.get("page");

  let accending = true;

  // Interpret sort_by. Default to "view_count".
  if (sort_by === null) sort_by = "view_count";
  if (sort_by === "most popular") sort_by = "view_count";
  if (sort_by === "most recent") sort_by = "created_at";
  if (sort_by === "highest to lowest discounts") {
    sort_by = "discount_amount";
    accending = false;
  }
  if (sort_by === "lowest to highest discounts") sort_by = "discount_amount";

  // Get the range of discounts to fetch. Uses 0 indexing
  const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 3;
    const from = page ? page * limit : 0;
    const to = page ? from + size - 1 : size - 1;

    return { from, to };
  };
  const { from, to } = getPagination(Number(page_num), 20);

  const { userId } = auth();
  const user = await currentUser();

  // If the user is logged in, fetch private group discounts and public discounts
  if (userId && user) {
    // DEV NOTE: This is a temporary fix to get around the fact that we can't create a supabase_jwt with a long-lived session token
    const supabase = await supabaseClient(request.headers.get("supabase_jwt"));
    if (!supabase) {
      return NextResponse.json({ error: "Could not create supabase client" }, { status: 401 });
    }

    // Only fetch discounts of a category if the category is not "all"
    if (category && category !== "all") {
      let { data: categoryDiscounts, error } = await supabase
        .from("categories")
        .select("discounts")
        .eq("name", category)
        .single();

      if (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch category discounts" }, { status: 500 });
      }

      // Convert the array of discount UUIDs into discounts
      const discountUUIDs = categoryDiscounts?.discounts;
      const { data: discountsData, error: discountsError } = await supabase
        .from("discounts")
        .select("*")
        .in("id", discountUUIDs)
        .order(sort_by, { ascending: accending })
        .range(from, to);

      if (discountsError) {
        console.log(discountsError);
        return NextResponse.json({ error: "Failed to convert discount UUIDs into discounts" }, { status: 500 });
      }

      const discounts = discountsData || [];

      if (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch category discounts" }, { status: 500 });
      }
      return NextResponse.json({ discounts }, { status: 200 });
    }

    // Else, Fetch 20 discounts directly from discounts table
    let { data: discounts, error } = await supabase
      .from("discounts")
      .select("*")
      .order(sort_by, { ascending: accending })
      .range(from, to);

    if (error) {
      console.log(error);
      return NextResponse.json({ error: "Failed to fetch public and private discounts" }, { status: 500 });
    }
    return NextResponse.json({ discounts }, { status: 200 });
  } else {
    // Only fetch public discounts if user is not logged in
    const supabase = await supabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Could not create supabase client" }, { status: 401 });
    }

    let { data: discounts, error } = await supabase
      .from("discounts")
      .select("*")
      .order(sort_by, { ascending: accending })
      .eq("public", true)
      .range(from, to);

    if (error) {
      console.log(error);
      return NextResponse.json({ error: "Failed to fetch public discounts" }, { status: 500 });
    }
    return NextResponse.json({ discounts }, { status: 200 });
  }
}

/**
 * Deletes a discount based on the provided discount ID.
 *
 * @param request - The NextRequest object representing the incoming request.
 * @param response - The NextResponse object representing the outgoing response.
 * @returns A JSON response indicating the success or failure of the delete operation.
 */
export async function DELETE(request: NextRequest, response: NextResponse) {
  const { userId } = auth();

  // Check if the user is logged in
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized. Failed to obtain current User" }, { status: 401 });
  }

  // Extract the discount_id from the query params
  const discount_id = request.nextUrl.searchParams.get("discount_id");

  // Create a Supabase client with the current user's access token
  const token = request.headers.get("supabase_jwt");
  if (!token) {
    return NextResponse.json({ error: "Missing supabase_jwt token" }, { status: 401 });
  }
  const supabase = await supabaseClient(token);
  if (!supabase) {
    return NextResponse.json({ error: "Failed to create supabase client" }, { status: 401 });
  }

  const { error } = await supabase.from("discounts").delete().eq("id", discount_id);

  if (error) {
    return NextResponse.json({ error: "Failed to delete discount" }, { status: 500 });
  }
  return NextResponse.json({ success: true, deleted: discount_id }, { status: 200 });
}

// Update a discount
export async function PATCH(request: NextRequest, response: NextResponse) {
  const { userId } = auth();

  // Check if the user is logged in
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized. Failed to obtain current User" }, { status: 401 });
  }

  // Create a Supabase client with the current user's access token
  const token = request.headers.get("supabase_jwt");
  if (!token) {
    return NextResponse.json({ error: "Missing supabase_jwt token" }, { status: 401 });
  }
  // DEV NOTE: This is a temporary fix to get around the fact that we can't create a supabase_jwt with a long-lived session token
  const supabase = await supabaseClient(token);
  if (!supabase) {
    return NextResponse.json({ error: "Failed to create supabase client" }, { status: 401 });
  }

  // Extract the form data
  const formData = await request.formData();
  const updatedDiscount: any = {};

  const discount_id = formData.get("discount_id");

  if (formData.get("company")) {
    updatedDiscount.company = formData.get("company");
  }
  if (formData.get("terms_and_conditions")) {
    updatedDiscount.terms_and_conditions = formData.get("terms_and_conditions");
  }
  if (formData.get("company_url")) {
    updatedDiscount.company_url = formData.get("company_url");
  }
  if (formData.get("discount_amount")) {
    updatedDiscount.discount_amount = Number(formData.get("discount_amount"));
  }
  if (formData.get("public")) {
    updatedDiscount.public = formData.get("public") === "true" ? true : false;
  }
  if (formData.get("private_groups")) {
    updatedDiscount.private_groups = String(formData.get("private_groups")).split(",");
  }

  // Update the discount in the database
  const { data, error } = await supabase.from("discounts").update(updatedDiscount).eq("id", discount_id).select();

  if (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to update discount" }, { status: 500 });
  }

  return NextResponse.json({ success: true, updated_values: data }, { status: 200 });
}
