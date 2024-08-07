'use client'

import { Button, useTheme } from '@mui/material'
import WhiteArrowForward from './WhiteArrowForward'
import { useRouter } from 'next/navigation'

const ShareDiscountButton = () => {
  const router = useRouter()
  const theme = useTheme()
  return (
    <Button
      endIcon={<WhiteArrowForward />}
      variant="contained"
      sx={{
        borderRadius: 28,
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 2,
        fontSize: '14px',
        fontWeight: 'semiBold',
        bgcolor: `${theme.palette.neutral.n900}`,
        color: `${theme.palette.common.white}`,
        ':hover': {
          bgcolor: `${theme.palette.neutral.n900}`, // Hover background color
          color: `${theme.palette.common.white}`, // Hover text color
        },
      }}
      onClick={() => router.push('/addbenefit')}
    >
      Share your discounts
    </Button>
  )
}

export default ShareDiscountButton
