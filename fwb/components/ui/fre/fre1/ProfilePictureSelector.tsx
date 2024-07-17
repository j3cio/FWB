// components/ProfilePictureSelector.tsx
import Image from 'next/image'
import {
  femaleProfilePictureOptions,
  maleProfilePictureOptions,
  ProfilePictureButton,
} from './ProfilePictureButton'

interface ProfilePictureSelectorProps {
  user: any
  optimisticImageUrl: string | null
  chooseProfilePicture: (image: string) => void
  updateProfilePicture: () => void
}

export const ProfilePictureSelector: React.FC<ProfilePictureSelectorProps> = ({
  user,
  optimisticImageUrl,
  chooseProfilePicture,
  updateProfilePicture,
}) => {
  return (
    <section aria-labelledby="profile-picture-heading">
      <h2 id="profile-picture-heading" className="sr-only">
        Profile Picture Selection
      </h2>

      <div className="flex justify-center">
        <figure className="relative flex h-[153px] w-[153px]">
          <Image
            src={optimisticImageUrl || user.imageUrl}
            alt="Current profile picture"
            fill
            className="image rounded-full bg-center"
            priority
          />
        </figure>
      </div>

      <div className="my-4 flex justify-center">
        <label
          htmlFor="profilePicture"
          className="flex h-[45px] w-[213px] cursor-pointer items-center justify-center gap-[8px] rounded-[30px] border-2 border-white bg-[#8e94e9] px-[24px] py-[10px] font-urbanist text-[16px] font-medium leading-[125%] tracking-[0.32px] text-white"
        >
          Add profile photo
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={updateProfilePicture}
            className="sr-only"
            aria-label="Upload profile picture"
          />
        </label>
      </div>

      <fieldset className="mt-4">
        <legend className="sr-only">Choose a profile picture</legend>
        <ul className="flex list-none justify-center space-x-4 pb-2">
          {femaleProfilePictureOptions.map((option, index) => (
            <li key={index}>
              <ProfilePictureButton
                onClick={() => chooseProfilePicture(option.path)}
                SVGComponent={option.svg}
              />
            </li>
          ))}
        </ul>
        <ul className="flex list-none justify-center space-x-4">
          {maleProfilePictureOptions.map((option, index) => (
            <li key={index}>
              <ProfilePictureButton
                onClick={() => chooseProfilePicture(option.path)}
                SVGComponent={option.svg}
              />
            </li>
          ))}
        </ul>
      </fieldset>
    </section>
  )
}
