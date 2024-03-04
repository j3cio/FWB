import { Box, FormLabel, Input } from "@mui/material";
import Image from "next/image";

type Form1Data = {
  name: string;
  description: string;
};

type Form1Props = Form1Data & {
  updateFields: (fields: Partial<Form1Data>) => void;
};

export function GroupForm1({ name, description, updateFields }: Form1Props) {
  return (
    <Box className="font-urbanist min-w-[60vw] lg:min-w-[35vw] xl:min-w-[35vw] xxl:min-w-[35vw] flex flex-col gap-6">
      <FormLabel className="flex justify-center">
        <Input
          className="hidden" 
          inputProps={{accept: 'image/*' }} 
          type="file" 
        />
        <Image
          className="w-20 h-20 overflow-visible rounded-full" 
          src='/groups/person.svg' 
          width={0} height={0} 
          alt="person" 
        />
      </FormLabel>
      <FormLabel className="font-urbanist flex flex-col gap-3 text-white"> 
        Group Name*
        <Input 
          className="font-urbanist bg-[#fff] w-full border-0 outline-none px-5 py-1 text-[#090A10] rounded-[2.5rem] focus:outline-none before:border-0" 
          autoFocus 
          required 
          type="text" 
          placeholder="Group's Name" 
          value={name} 
          onChange={(e) => updateFields({ name: e.target.value })} 
        />
      </FormLabel>
      <FormLabel className="font-urbanist flex flex-col gap-3 text-white">
        Add Description*
       <Input
        className="font-urbanist bg-[#fff] border-0 outline-none px-5 py-1 text-[#090A10] rounded-[2.5rem] focus:outline-none before:border-0" 
        required 
        type="text" 
        placeholder="Group's description" 
        value={description} 
        onChange={(e) => updateFields({ description: e.target.value })} 
      />
      </FormLabel>
    </Box>
  );
}
