import supabaseClient from "@/supabase";

export const getNewLogoUrl = async (domain_name: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${process.env.BRANDFETCH_API_KEY}`);

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(
    `https://api.brandfetch.io/v2/brands/${domain_name}`,
    requestOptions,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch brand data");
  }

  let brandLogo;
  (await res.json()).logos.forEach((logo: any) => {
    if (logo.type === "icon") {
      brandLogo = logo.formats[0].src;
    }
  });
  return brandLogo;
};

export const getExistingLogoUrl = async (domain_name: string) => {
  const supabase = await supabaseClient();
  if (!supabase) {
    throw new Error("Could not create supabase client");
  }

  let { data: logo, error } = await supabase
    .from("companies")
    .select("logo")
    .eq("url", domain_name)
    .limit(1)
    .single();

  if (error) {
    return null;
  }

  return logo?.logo;
};

export const saveLogoUrl = async (domain_name: string, logo_url: string) => {
  const supabase = await supabaseClient();
  if (!supabase) {
    throw new Error("Could not create supabase client");
  }

  let { data: logo, error } = await supabase
    .from("logos")
    .insert([{ domain_name, logo_url }]);

  if (error) {
    return null;
  }

  return logo;
};
