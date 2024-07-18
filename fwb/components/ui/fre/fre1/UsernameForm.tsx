// components/UsernameForm.tsx
import React, { useEffect } from 'react'
import { RefreshIcon } from '../../icons/RefreshIcon'

interface UsernameFormProps {
  randomName: string
  setRandomName: (name: string) => void
  updateClerkUsername: () => void
  updateClerkWithRandomUsername: () => void
}

export const UsernameForm: React.FC<UsernameFormProps> = ({
  randomName,
  setRandomName,
  updateClerkUsername,
  updateClerkWithRandomUsername,
}) => {
  useEffect(() => {
    updateClerkWithRandomUsername()
  }, [])

  return (
    <div className="userForm flex flex-col justify-center">
      <form
        id="usernameForm"
        className="flex justify-center"
        onBlur={updateClerkUsername}
      >
        <input
          type="text"
          id="newUsername"
          className="mb-[13.53px] mt-[32px] flex h-[48px] w-[80vw] gap-[8px] rounded-full bg-white py-[8px] pl-[24px] pr-[8px] placeholder:w-full placeholder:bg-transparent placeholder:font-urbanist placeholder:text-lg placeholder:font-normal placeholder:leading-[150%] placeholder:text-[#090a10] placeholder:opacity-30 md:w-[420px]"
          placeholder={randomName}
          value={randomName}
          onChange={(e) => setRandomName(e.target.value)}
        />

        <button
          className="randomName ml-[-46.5px] mt-[36px] h-[40px] w-[40px] rounded-[123.35px] bg-[#8e94e9] p-[8px_9px_8px_10px]"
          type="button"
          onClick={updateClerkWithRandomUsername}
        >
          <div className="refreshIcon">
            <RefreshIcon fill="white" />
          </div>
        </button>
      </form>
    </div>
  )
}
