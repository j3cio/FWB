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
    <Box className="flex min-w-[50vw] flex-col gap-6 px-[20%] font-urbanist sm-max:min-w-[60vw] xs-max:min-w-[80vw] xxs-max:min-w-[80vw]">
      <FormLabel className="flex justify-center">
        <Input
          className="hidden"
          inputProps={{ accept: 'image/*' }}
          type="file"
        />
        <Image
          className="h-20 w-20 overflow-visible rounded-full"
          src="/groups/person.svg"
          width={0}
          height={0}
          alt="person"
        />
      </FormLabel>
      <FormLabel className="flex flex-col gap-3 font-urbanist text-white">
        Group Name*
        <Box className="flex gap-2">
          <Input
            className="w-full rounded-[2.5rem] border-0 bg-[#fff] px-5 py-1 font-urbanist text-[#090A10] outline-none before:border-0  after:border-0 focus:outline-[0px]"
            required
            type="text"
            placeholder="Group's Name"
            value={name}
            onChange={(e) => updateFields({ name: e.target.value })}
          />
          <span className="flex items-center gap-1 text-sm">
            Private
            <LockIconWhite />
          </span>
        </Box>
      </FormLabel>
      <FormLabel className="flex flex-col gap-3 font-urbanist text-white">
        Add Description
        <Input
          className="rounded-[2.5rem] border-0 bg-[#fff] px-5 py-1 font-urbanist text-[#090A10] outline-none before:border-0 after:border-0 focus:outline-none"
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
