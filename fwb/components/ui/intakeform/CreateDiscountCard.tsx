import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import BlueArrowForward from './BlueArrowForward'

const CreateDiscountCard = () => {
  const theme = useTheme()

  return (
    <a href="/intakeform">
      <div className="pb-[27%] flex rounded-3xl items-center justify-center relative z-0 bg-no-repeat bg-center bg-contain bg-[url('/profileBanner.svg')]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-row-reverse w-5/6 mr-28">
            <Button
              endIcon={<BlueArrowForward />}
              variant="contained"
              sx={{
                borderRadius: 28,
                borderStyle: 'solid',
                borderColor: 'white',
                borderWidth: 2,
                bgcolor: `${theme.palette.secondary.light}`,
                color: `${theme.palette.primary.dark}`,
                ':hover': {
                  bgcolor: `${theme.palette.secondary.light}`, // Hover background color
                  color: `${theme.palette.primary.dark}`, // Hover text color
                },
              }}
            >
              Share your discount
            </Button>
          </div>
        </div>
      </div>
    </a>
  )
}

export default CreateDiscountCard
