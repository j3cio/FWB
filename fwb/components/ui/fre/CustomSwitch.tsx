import { styled } from '@mui/material/styles'
import Switch, { switchClasses } from '@mui/material/Switch'

export const CustomSwitch = styled(Switch)(({ theme }) => {
  const borderWidth = 2
  const width = 32
  const height = 16
  const size = 22
  const gap = (34 - 22) / 2
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
        transform: `translateX(calc(${width} - ${size} - ${2 * gap}))`,
        [`& + .${switchClasses.track}`]: {
          backgroundColor: theme.palette.primary.main,
          opacity: 1,
          border: 'none',
        },
        [`& .${switchClasses.thumb}`]: {
          backgroundColor: '#fff',
        },
      },
    },
    [`& .${switchClasses.thumb}`]: {
      boxShadow: 'none',
      backgroundColor: theme.palette.grey[400],
      width: 13.3,
      height: 13.3,
    },
    [`& .${switchClasses.track}`]: {
      borderRadius: 40,
      border: `solid white`,
      borderWidth,
      backgroundColor: '#8E94E9',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
      boxSizing: 'border-box',
    },
  }
})
