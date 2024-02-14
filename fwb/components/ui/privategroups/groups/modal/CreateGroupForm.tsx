"use client";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import useMultistepForm from "../../../../hooks/useMultistepForm";
import { GroupForm1 } from "./GroupForm1";
import { GroupForm2 } from "./GroupForm2";

type FormData = {
  name: string;
  description: string;
  users: string;
};

const initialData: FormData = {
  name: "",
  description: "",
  users: "", // This should be userId[] of people invited to the group
};

// TODO:
// Edge cases that need to be handled:

const CreateGroupForm = ({ userGroups, handleClose }: { userGroups: string[]; handleClose: () => void }) => {
  const { userId } = useAuth();
  const [data, setData] = useState(initialData);
  const router = useRouter();
  // This is the hook that carries the logic for the multistep form
  // We pass into it the JSX that is for each page of the form
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <GroupForm1 key={1} {...data} updateFields={updateFields} />,
    <GroupForm2 key={2} {...data} updateFields={updateFields} />,
  ]);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  async function handleCreateGroup(data: FormData) {
    console.log(data);
    const bearerToken = await window.Clerk.session.getToken({ template: "testing_template" });
    const supabaseToken = await window.Clerk.session.getToken({ template: "supabase" });

    // This adds the group to the "groups" table in supabase
    try {
      const formData = new FormData();
      formData.append("name", `${data.name}`);
      formData.append("users", `${userId}`);
      formData.append("discounts", "");
      formData.append("description", `${data.description}`);
      // POST Fetch Request to add the group into groups table
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          supabase_jwt: supabaseToken,
        },
        body: formData,
      });

      if (response.ok) {
        if (userGroups == undefined) {
          userGroups = [];
        }
        const groupData = await response.json();
        userGroups.push(groupData.data[0].id);
        console.log("after .push", userGroups);
        console.log("Group added successfully:", groupData.data[0].id);
      } else {
        const errorData = await response.json();
        console.error("Error adding user:", errorData);
      }
    } catch (error) {
      console.error("Error add user:", error);
    }

    // This updates the user's groups column
    try {
      let newGroup = `{${userGroups.join(",")}}`;
      const groupFormData = new FormData();
      groupFormData.append("user_id", `${userId}`);
      groupFormData.append("user_groups", `${newGroup}`);
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          supabase_jwt: supabaseToken,
        },
        body: groupFormData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Group added successfully:", data);
        router.refresh();
        // If you want to redirect to new group made use this else just refresh the page...
        //router.push(`/groups/${userGroups[userGroups.length-1]}`)
      } else {
        const errorData = await res.json();
        console.error("Error adding user:", errorData);
      }
    } catch (error) {
      console.error("Error adding user group:", error);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next(); // Check if on last page
    // Create a group and add it to the db
    handleCreateGroup(data);
    handleClose();
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        Page Indexing: {currentStepIndex + 1} / {steps.length}
      </div>
      {/* Render out the jsx of the form pages that we have passed in our hook*/}
      <div> {step} </div>
      {!isFirstStep && (
        <Button variant="contained" type="button" onClick={back}>
          Back
        </Button>
      )}
      <Button variant="contained" type="submit" onClick={onSubmit}>
        {isLastStep ? "Finish" : "Next"}
      </Button>
    </form>
  );
};

export default CreateGroupForm;
