import { styled } from '@mui/material/styles'
import Switch, { switchClasses } from '@mui/material/Switch'

export const CustomSwitch = styled(Switch)(({ theme }) => {
  const borderWidth = 1
  const width = 32
  const height = 17
  const gap = (34 - 22) / 2
  const transitionDuration = '.2s'

  return {
    width,
    height,
    padding: 0,
    margin: theme.spacing(1),
    overflow: 'unset',
    [`& .${switchClasses.switchBase}`]: {
      padding: gap,
      [`&.${switchClasses.checked}`]: {
        color: '#fff',
        transform: `translateX(15px)`,
        [`& + .${switchClasses.track}`]: {
          backgroundColor: 'white',
          opacity: 1,
          border: 'none',
        },
        [`& .${switchClasses.thumb}`]: {
          backgroundColor: '#8E94E9',
        },
      },
    },
    [`& .${switchClasses.thumb}`]: {
      boxShadow: 'none',
      backgroundColor: 'white',
      width: 13.3,
      height: 13.3,
      position: 'absolute',
      top: 2,
      left: 3,
    },
    [`& .${switchClasses.track}`]: {
      borderRadius: 40,
      border: `solid white`,
      borderWidth,
      backgroundColor: '#8E94E9',
      opacity: 1,
      transition: `background-color ${transitionDuration}, border ${transitionDuration}`, // Modify transition property
      boxSizing: 'border-box',
    },
  }
})

export const CustomSwitchAddBenefits = styled(Switch)(({ theme }) => {
  const borderWidth = 1
  const width = 32
  const height = 17
  const gap = (34 - 22) / 2
  const transitionDuration = '.2s'

  return {
    width,
    height,
    padding: 0,
    margin: theme.spacing(1),
    overflow: 'unset',
    [`& .${switchClasses.switchBase}`]: {
      padding: gap,
      [`&.${switchClasses.checked}`]: {
        color: '#fff',
        transform: `translateX(15px)`,
        [`& + .${switchClasses.track}`]: {
          backgroundColor: 'white',
          opacity: 1,
          border: 'none',
        },
        [`& .${switchClasses.thumb}`]: {
          backgroundColor: 'black',
        },
      },
    },
    [`& .${switchClasses.thumb}`]: {
      boxShadow: 'none',
      backgroundColor: 'white',
      width: 13.3,
      height: 13.3,
      position: 'absolute',
      top: 2,
      left: 3,
    },
    [`& .${switchClasses.track}`]: {
      borderRadius: 40,
      border: `solid white`,
      borderWidth,
      backgroundColor: 'black',
      opacity: 1,
      transition: `background-color ${transitionDuration}, border ${transitionDuration}`, // Modify transition property
      boxSizing: 'border-box',
    },
  }
})
