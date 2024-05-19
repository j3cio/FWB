import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import BlueArrowForward from '../../../ui/addbenefit/BlueArrowForward'
import addbenefitMobile from '../../../../public/groups/addbenefitmobile.svg'

const CreateDiscountCardMobile = () => {
  const theme = useTheme()

  return (
    <a
      className=""
      href="/addbenefit"
    >
      <div className="relative z-0 flex items-center justify-center rounded-3xl bg-[url('/profileBanner.svg')] bg-contain bg-center bg-no-repeat pb-[27%] xs-max:hidden xxs-max:hidden sm-max:hidden [@media(min-width:768px)]:block">
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
      <div className='md:hidden'>
        <Image src={addbenefitMobile} alt='add benefit card' className='w-full'></Image>
      </div>
    </a>
  )
}

export default CreateDiscountCardMobile
