'use client'

import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import BlueArrowForward from './BlueArrowForward'

const CreateDiscountCard = () => {
  const theme = useTheme()

  return (
    <a
      className="sm-max:hidden xs-max:hidden xxs-max:hidden"
      href="/addbenefit"
    >
      <div className="relative z-0 flex items-center justify-center rounded-3xl bg-[url('/profileBanner.svg')] bg-contain bg-center bg-no-repeat pb-[27%]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mr-28 flex w-5/6 flex-row-reverse">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: 28,
                borderStyle: 'solid',
                borderColor: 'white',
                borderWidth: 2,
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.primary.dark,
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              Share your discount
              <span>
                <BlueArrowForward style={{ marginLeft: '5px' }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export default CreateDiscountCard
