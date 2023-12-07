import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import supabaseClient from "@/supabase";

/**
 * Inserts a new discount into the database.
 * 
 * @param {NextRequest} request - The request object.
 * @returns {Promise<NextResponse>} A promise that resolves to the response object.
 */
const insertDiscount = async (request: NextRequest) => {
  try {
    const { userId, getToken } = auth();
    const user = await currentUser();

    // Check if the user is logged in
    if (userId && user) {
      // Extract the form data
      const formData = await request.formData();
      const newDiscount = {
        user_id: user.id,
        company: formData.get("company"),
        terms_and_conditions: formData.get("terms_and_conditions"),
        company_url: formData.get("company_url"),
        shareable_url: "",
        discount_amount: formData.get("discount_amount"),
        public: formData.get("public") === "true" ? true : false,
        private_groups: formData.get("private_groups"),
      };

      const supabase = await supabaseClient(
        request.headers.get("supabase_jwt")
      );
      if (!supabase) {
        return NextResponse.json(
          { error: "Could not create supabase access token" },
          { status: 401 }
        );
      }

      // Insert the new discount into the database
      const { data, error } = await supabase
        .from("discounts")
        .insert([newDiscount])
        .select();

      // Check for error and return response
      if (error) {
        console.log(error);
        return NextResponse.json(
          { error: "Failed to create discount" },
          { status: 500 }
        );
      } else {
        return NextResponse.json({ data: data }, { status: 200 });
      }
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

/**
 * Retrieves discounts based on the provided filters and pagination parameters.
 * 
 * @param request - The NextRequest object containing the query parameters.
 * @returns A NextResponse object containing the fetched discounts or an error response.
 */
const getDiscounts = async (request: NextRequest) => {
  try {
    // Extract the filters from the query params
    let sort_by = request.nextUrl.searchParams.get("sort_by");
    let private_group = request.nextUrl.searchParams.get("private_group");
    let category = request.nextUrl.searchParams.get("category");
    let page_num = request.nextUrl.searchParams.get("page");

    let accending = true;

    // Interpret sort_by. Default to "view_count".
    if (sort_by === null) sort_by = "view_count";
    if (sort_by === "Most Popular") sort_by = "view_count";
    if (sort_by === "Highest to Lowest Discounts") {
      sort_by = "discount_amount";
      accending = false;
    }
    if (sort_by === "Lowest to Highest Discounts") sort_by = "discount_amount";

    // Get the range of discounts to fetch. Uses 0 indexing
    const getPagination = (page: number, size: number) => {
      const limit = size ? +size : 3;
      const from = page ? page * limit : 0;
      const to = page ? from + size - 1 : size - 1;

      return { from, to };
    };
    const { from, to } = getPagination(Number(page_num), 20);

    const { userId, getToken } = auth();
    const user = await currentUser();
    // If the user is logged in, fetch private group discounts and public discounts
    if (userId && user) {
      const supabase = await supabaseClient(
        request.headers.get("supabase_jwt")
      );
      if (!supabase) {
        return NextResponse.json(
          { error: "Could not create supabase access token" },
          { status: 401 }
        );
      }

      // Fetch 20 discounts for page_num
      let { data: discounts, error } = await supabase
        .from("discounts")
        .select("*")
        .order(sort_by, { ascending: accending })
        .filter("categories", "cs", `{${category}}`)
        .range(from, to);

      if (error) {
        return NextResponse.json(
          { error: "Failed to fetch discounts" },
          { status: 500 }
        );
      }
      return NextResponse.json({ success: true, discounts }, { status: 200 });
    } else {
      // Only fetch public discounts if user is not logged in
      const supabase = await supabaseClient();
      if (!supabase) {
        return NextResponse.json(
          { error: "Could not create supabase client" },
          { status: 401 }
        );
      }

      let { data: discounts, error } = await supabase
        .from("discounts")
        .select("*")
        .order(sort_by, { ascending: accending })
        .filter("categories", "cs", `{${category}}`)
        .eq("public", true)
        .range(from, to);

      if (error) {
        console.log(error);
        return NextResponse.json(
          { error: "Failed to fetch discounts" },
          { status: 500 }
        );
      }
      return NextResponse.json({ success: true, discounts }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

/**
 * Deletes a discount from the database.
 * 
 * @param request - The NextRequest object containing the request details.
 * @returns A NextResponse object with the result of the deletion.
 */
const deleteDiscount = async (request: NextRequest) => {
  try {
    const { userId, getToken, orgRole } = auth();
    const user = await currentUser();

    if (userId && user) {
      const discount_id = request.nextUrl.searchParams.get("discount_id");

      // Create a Supabase client with the current user's access token
      const token = request.headers.get("supabase_jwt");
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const supabase = await supabaseClient(token);

      const { error } = await supabase
        .from("discounts")
        .delete()
        .eq("id", discount_id);

      if (error) {
        return NextResponse.json(
          { error: "Failed to delete discount" },
          { status: 500 }
        );
      } else {
        return NextResponse.json(
          { success: true, deleted: discount_id },
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

/**
 * Updates a discount in the database.
 * 
 * @param request - The NextRequest object containing the request details.
 * @returns A NextResponse object with the updated discount data or an error message.
 */
const updateDiscount = async (request: NextRequest) => {
  try {
    const { userId, getToken } = auth();
    const user = await currentUser();
    if (userId && user) {
      // Create a Supabase client with the current user's access token
      const token = request.headers.get("supabase_jwt");
      if (!token) {
        console.log("no token");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const supabase = await supabaseClient(token);

      const formData = await request.formData();
      const updatedDiscount: any = {};

      const discount_id = formData.get("discount_id");

      if (formData.get("company")) {
        updatedDiscount.company = formData.get("company");
      }
      if (formData.get("terms_and_conditions")) {
        updatedDiscount.terms_and_conditions = formData.get(
          "terms_and_conditions"
        );
      }
      if (formData.get("company_url")) {
        updatedDiscount.company_url = formData.get("company_url");
      }
      if (formData.get("discount_amount")) {
        updatedDiscount.discount_amount = Number(
          formData.get("discount_amount")
        );
      }
      if (formData.get("public")) {
        updatedDiscount.public =
          formData.get("public") === "true" ? true : false;
      }
      if (formData.get("private_groups")) {
        updatedDiscount.private_groups = formData.get("private_groups");
      }

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
      } else {
        return NextResponse.json(
          { success: true, updated_values: data },
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export { insertDiscount, getDiscounts, deleteDiscount, updateDiscount };
