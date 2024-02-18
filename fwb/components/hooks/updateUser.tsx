const UpdateUser = async (formData) => {
  try {
    const bearerToken = await window.Clerk.session.getToken({
      template: "testing_template",
    });

    const supabaseToken = await window.Clerk.session.getToken({
      template: "supabase",
    });

    // POST Fetch Request to Discounts API
    const response = await fetch("/api/users", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        supabase_jwt: supabaseToken,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User added successfully:", data);
      return true;

    } else {
      const errorData = await response.json();
      console.error("Error adding user:", errorData);
      return false;

    }
    
  } catch (error) {
    console.error("Error add user:", error);
    return false;

  }
};

export default UpdateUser;
