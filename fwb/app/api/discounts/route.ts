import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import supabaseClient from "@/supabase";
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
    return NextResponse.json(
      { error: "Unauthorized. Failed to obtain current User" },
      { status: 401 }
    );
  }

  // Create a supabase client
  // DEV NOTE: This is a temporary fix to get around the fact that we can't create a supabase_jwt with a long-lived session token
  const supabase = await supabaseClient(request.headers.get("supabase_jwt"));
  if (!supabase) {
    return NextResponse.json(
      { error: "Could not create supabase client" },
      { status: 401 }
    );
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
  const { data: discount, error } = await supabase
    .from("discounts")
    .insert([newDiscount])
    .select();
  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to insert discount in supabase" },
      { status: 500 }
    );
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
      return NextResponse.json(
        { error: "Failed to insert new company in supabase" },
        { status: 500 }
      );
    }
  }

  // Insert the discount into the company's discounts array
  const updatedDiscounts = [
    ...(companyData?.discounts || []),
    String(discount[0].id),
  ];
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .update({ discounts: updatedDiscounts })
    .eq("url", company_url)
    .select();

  if (companyError) {
    console.error(companyError);
    return NextResponse.json(
      { error: "Failed to insert discount into company" },
      { status: 500 }
    );
  }

  // Update the greatest discount of the company and the discounts_updated_at timestamp
  let { data: greatestDiscount, error: greatestDiscountsError } = await supabase
    .from("companies")
    .select("greatest_discount")
    .eq("url", company_url)
    .single();
  if (greatestDiscountsError) {
    console.error(greatestDiscountsError);
    return NextResponse.json(
      { error: "Failed to get greatest discount of company" },
      { status: 500 }
    );
  }

  const { data: updatedCompany, error: updatedCompanyError } = await supabase
    .from("companies")
    .update({
      greatest_discount: Math.max(
        Number(formData.get("discount_amount")),
        greatestDiscount?.greatest_discount || 0
      ),
      discounts_updated_at: new Date(),
    })
    .eq("url", company_url)
    .select();
  if (updatedCompanyError) {
    console.error(updatedCompanyError);
    return NextResponse.json(
      { error: "Failed to update greatest discount of company" },
      { status: 500 }
    );
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
    const updatedDiscounts = [
      ...(categoryData?.discounts || []),
      String(discount[0].id),
    ];

    const { data: categoryUpdated, error: categoryUpdatedError } =
      await supabase
        .from("categories")
        .update({ discounts: updatedDiscounts })
        .eq("name", category.toLowerCase())
        .select();

    if (categoryUpdatedError) {
      console.error(categoryUpdatedError);
      return NextResponse.json(
        { error: "Failed to insert discount into category" },
        { status: 500 }
      );
    }
  });

  return NextResponse.json({ data: discount }, { status: 200 });
}

/**
 * Retrieves a discount based on the provided discount ID.
 * 
 * @param request - The NextRequest object containing the request details.
 * @returns A NextResponse object with the fetched discount data or an error response.
 */
export async function GET(request: NextRequest) {
  const { userId } = auth();

  // Check if the user is logged in
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await currentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized. Failed to obtain current User" },
      { status: 401 }
    );
  }

  //Extract the discount_id from the query params
  const discount_id = request.nextUrl.searchParams.get("id");
  console.log(discount_id);

  // Create a Supabase client with the current user's access token
  const token = request.headers.get("supabase_jwt");
  if (!token) {
    return NextResponse.json(
      { error: "Missing supabase_jwt token" },
      { status: 401 }
    );
  }
  const supabase = await supabaseClient(token);
  if (!supabase) {
    return NextResponse.json(
      { error: "Failed to create supabase client" },
      { status: 401 }
    );
  }

  const { data: discount, error } = await supabase
    .from("discounts")
    .select()
    .eq("id", discount_id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch discount" },
      { status: 500 }
    );
  }
  return NextResponse.json({ data: discount }, { status: 200 });
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
    return NextResponse.json(
      { error: "Unauthorized. Failed to obtain current User" },
      { status: 401 }
    );
  }

  // Extract the discount_id from the query params
  const discount_id = request.nextUrl.searchParams.get("discount_id");

  // Create a Supabase client with the current user's access token
  const token = request.headers.get("supabase_jwt");
  if (!token) {
    return NextResponse.json(
      { error: "Missing supabase_jwt token" },
      { status: 401 }
    );
  }
  const supabase = await supabaseClient(token);
  if (!supabase) {
    return NextResponse.json(
      { error: "Failed to create supabase client" },
      { status: 401 }
    );
  }

  const { error } = await supabase
    .from("discounts")
    .delete()
    .eq("id", discount_id);

  if (error) {
    return NextResponse.json(
      { error: "Failed to delete discount" },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { success: true, deleted: discount_id },
    { status: 200 }
  );
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
    return NextResponse.json(
      { error: "Unauthorized. Failed to obtain current User" },
      { status: 401 }
    );
  }

  // Create a Supabase client with the current user's access token
  const token = request.headers.get("supabase_jwt");
  if (!token) {
    return NextResponse.json(
      { error: "Missing supabase_jwt token" },
      { status: 401 }
    );
  }
  // DEV NOTE: This is a temporary fix to get around the fact that we can't create a supabase_jwt with a long-lived session token
  const supabase = await supabaseClient(token);
  if (!supabase) {
    return NextResponse.json(
      { error: "Failed to create supabase client" },
      { status: 401 }
    );
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
    updatedDiscount.private_groups = String(
      formData.get("private_groups")
    ).split(",");
  }

  // Update the discount in the database
  const { data, error } = await supabase
    .from("discounts")
    .update(updatedDiscount)
    .eq("id", discount_id)
    .select();

  if (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update discount" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, updated_values: data },
    { status: 200 }
  );
}
