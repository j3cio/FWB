import {
  FemaleOneSVG,
  FemaleTwoSVG,
  FemaleThreeSVG,
  FemaleFourSVG,
  MaleOneSVG,
  MaleTwoSVG,
  MaleThreeSVG,
  MaleFourSVG,
} from '@/public/profilepics/SVG'

export const femaleProfilePictureOptions = [
  { svg: FemaleOneSVG, path: '/profilepics/PNG/WomanOne.png' },
  { svg: FemaleTwoSVG, path: '/profilepics/PNG/WomanTwo.png' },
  { svg: FemaleThreeSVG, path: '/profilepics/PNG/WomanThree.png' },
  { svg: FemaleFourSVG, path: '/profilepics/PNG/WomanFour.png' },
]
export const maleProfilePictureOptions = [
  { svg: MaleOneSVG, path: '/profilepics/PNG/ManOne.png' },
  { svg: MaleTwoSVG, path: '/profilepics/PNG/ManTwo.png' },
  { svg: MaleThreeSVG, path: '/profilepics/PNG/ManThree.png' },
  { svg: MaleFourSVG, path: '/profilepics/PNG/ManFour.png' },
]

interface ProfilePictureButtonProps {
  onClick: () => void
  SVGComponent: React.ComponentType<{ width: number; height: number }>
}
export const ProfilePictureButton = ({
  onClick,
  SVGComponent,
}: ProfilePictureButtonProps) => (
  <button type="button" onClick={onClick}>
    <SVGComponent width={50} height={50} />
  </button>
)
