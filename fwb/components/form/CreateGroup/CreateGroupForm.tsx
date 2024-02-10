"use client";
import { Button } from "@mui/material";
import { FormEvent, useState } from "react";
import useMultistepForm from "../../hooks/useMultistepForm";
import { GroupForm1 } from "./GroupForm1";
import { GroupForm2 } from "./GroupForm2";

type FormData = {
  groupName: string;
  description: string;
  invitedMembers: string;
};

const initialData: FormData = {
  groupName: "",
  description: "",
  invitedMembers: "", // This should be userId[] of people invited to the group
};

const CreateGroupForm = () => {
  const [data, setData] = useState(initialData);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  // This is the hook that carries the logic for the multistep form
  // We pass into it the JSX that is for each page of the form
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <GroupForm1 {...data} updateFields={updateFields} />,
    <GroupForm2 {...data} updateFields={updateFields} />,
  ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (isLastStep) return next(); // Check if on last page
    // Logic for creating group here!
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
      <Button variant="contained" type="submit">
        {isLastStep ? "Finish" : "Next"}
      </Button>
    </form>
  );
};

export default CreateGroupForm;
