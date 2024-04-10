import { Box, FormLabel, Input } from '@mui/material'
import Image from 'next/image'
import LockIconWhite from '../../icons/LockIconWhite'
import LockIcon from '../../icons/LockIcon'

type Form1Data = {
  name: string
  description: string
}

type Form1Props = Form1Data & {
  updateFields: (fields: Partial<Form1Data>) => void
}

export function GroupForm1({ name, description, updateFields }: Form1Props) {
  return (
    <Box className="font-urbanist xxs-max:min-w-[80vw] xs-max:min-w-[80vw] sm-max:min-w-[60vw] min-w-[50vw] px-[20%] flex flex-col gap-6">
      <FormLabel className="flex justify-center">
        <Input
          className="hidden"
          inputProps={{ accept: 'image/*' }}
          type="file"
        />
        <Image
          className="w-20 h-20 overflow-visible rounded-full"
          src="/groups/person.svg"
          width={0}
          height={0}
          alt="person"
        />
      </FormLabel>
      <FormLabel className="font-urbanist flex flex-col gap-3 text-white">
        Group Name*
        <Box className="flex gap-2">
          <Input
            className="font-urbanist bg-[#fff] w-full border-0 outline-none px-5 py-1 text-[#090A10] rounded-[2.5rem] focus:outline-[0px]  after:border-0 before:border-0"
            required
            type="text"
            placeholder="Group's Name"
            value={name}
            onChange={(e) => updateFields({ name: e.target.value })}
          />
          <span className="flex text-sm items-center gap-1">
            Private
            <LockIconWhite />
          </span>
        </Box>
      </FormLabel>
      <FormLabel className="font-urbanist flex flex-col gap-3 text-white">
        Add Description
        <Input
          className="font-urbanist bg-[#fff] border-0 outline-none px-5 py-1 text-[#090A10] rounded-[2.5rem] focus:outline-none after:border-0 before:border-0"
          required
          type="text"
          placeholder="Group's description"
          value={description}
          onChange={(e) => updateFields({ description: e.target.value })}
        />
      </FormLabel>
    </Box>
  )
}
