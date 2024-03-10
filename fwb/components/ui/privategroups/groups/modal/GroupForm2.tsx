import React, { useState, FormEvent, KeyboardEvent } from "react";
import { Box, FormLabel, Button, Input, Stack, Typography } from "@mui/material";
import RemoveIcon from "../../icons/RemoveIcon";
import { TextareaAutosize as Textarea } from '@mui/base/TextareaAutosize';

type Form2Data = {
  users: string[];
};

type Form2Props = Form2Data & {
  updateFields: (fields: Partial<Form2Data>) => void;
};


export function GroupForm2({ users, updateFields }: Form2Props) {
  const [user, setUser] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail  = (email: string): boolean => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!email.match(emailRegex)) {
      //alert('invalid email address!')
      return false;
    } else {
      return true;
    }
  }

  const handleAddUser = (user: string) => {
    let trimmedUser = user.trim();
    // check for empty input
    if (!trimmedUser) {
      alert('input a user email..')
      return
    }
    // check for duplicate emails
    if (users.includes(trimmedUser)) {
      alert('email already added!')
      return
    }
    //validate the email before adding
    if (!validateEmail(trimmedUser)) {
      alert('not a valid email')
      return
    } else {
      updateFields({ users: [...users, user] })
      setUser("");
    }
  }

  const handleRemoveEmail = (index: number) => {
    let updatedEmails = [...users]
    updatedEmails.splice(index,1)
    updateFields({ users: [...updatedEmails]})
 };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddUser(user); 
    }
  }

  return (
    <>
      <FormLabel className="flex flex-col font-urbanist text-white min-w-[60vw] lg:min-w-[35vw] xl:min-w-[35vw] xxl:min-w-[35vw]"> 
        Invite members*
        <Box className="relative flex flex-col bg-white rounded min-h-[15vh] max-h-[40vh] font-urbanist w-full p-2">
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={2}>
            {users.map((user, index) => (
              <Box className="w-fit flex items-center lowercase font-urbanist bg-[#ADB4D2] rounded-lg p-2 text-white" key={index}>
                <Typography className="font-urbanist text-sm">{user}</Typography>
                <RemoveIcon className="mx-2" onClick={()=>handleRemoveEmail(index)} />
              </Box>
            ))}
          </Stack>
          <Box className="mt-auto relative">
            <Input
              className ="p-2 font-urbanist w-full bg-white border-none focus:outline-none before:border-none"
              placeholder="Invite your friends.."  
              autoFocus 
              required 
              value={user}
              onKeyDown={handleKeyDown}
              onChange={(e) => setUser(e.target.value.trim())} 
            />
          </Box>
        </Box>
      </FormLabel>
    </>
  );
}
