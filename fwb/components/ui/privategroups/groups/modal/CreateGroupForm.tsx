"use client";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@mui/material";
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

const CreateGroupForm = () => {
  const { userId } = useAuth();
  const [data, setData] = useState(initialData);
  //const [refresh, setRefresh] = useState(true)

  // This is the hook that carries the logic for the multistep form
  // We pass into it the JSX that is for each page of the form
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <GroupForm1 {...data} updateFields={updateFields} />,
    <GroupForm2 {...data} updateFields={updateFields} />,
  ]);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  async function handleCreateGroup(data: any) {
    try {
      const bearerToken = await window.Clerk.session.getToken({ template: "testing_template" });
      const supabaseToken = await window.Clerk.session.getToken({ template: "supabase" });
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

      // Need to take the created group and add it to users discount array

      if (response.ok) {
        const data = await response.json();
        //setRefresh(!refresh)
        console.log("Group added successfully:", data);
      } else {
        const errorData = await response.json();
        console.error("Error adding user:", errorData);
      }
    } catch (error) {
      console.error("Error add user:", error);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next(); // Check if on last page
    //Creatie a group and add it to the db
    handleCreateGroup(data);
    //TODO: When a group is created, need to update user fields to include this new group
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
