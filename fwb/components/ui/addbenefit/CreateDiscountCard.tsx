import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import BlueArrowForward from './BlueArrowForward'

const CreateDiscountCard = () => {
  const theme = useTheme()

  return (
    <a
      className="xxs-max:hidden xs-max:hidden sm-max:hidden"
      href="/addbenefit"
    >
      <div className="pb-[27%] flex rounded-3xl items-center justify-center relative z-0 bg-no-repeat bg-center bg-contain bg-[url('/profileBanner.svg')]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-row-reverse w-5/6 mr-28">
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
              <BlueArrowForward style={{ marginLeft: '5px' }}/>
            </span>
          </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export default CreateDiscountCard
