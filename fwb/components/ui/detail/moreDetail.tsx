'use client'

import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import arrowIcon from '@/components/ui/explore/icons/expand_more_24px.svg'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { CSSTransition } from 'react-transition-group'

export default function MoreButton() {
  const [flip, setFlip] = useState(false)
  const [isExpanded, setisExpanded] = useState(false)

  const arrowStyle = {
    color: 'white',
    width: '28.8px',
    height: '28.8px',
    transform: flip ? 'rotate(0deg)' : 'rotate(180deg)',
    marginRight: flip ? '4px' : '-4px',
    marginLeft: flip ? '-8px' : '8px',
    transition: '0.1s',
  }

  const buttonStyle = {
    fontFamily: 'inherit',
    borderRadius: '30px',
    background: 'var(--Purple-300, #8E94E9)',
    padding: flip ? '0px' : '6px 16px 6px 35px',
    minWidth: '48px',
    height: '48px',
    transition: '0.5s',
  }

  const setCondition = () => {
    setFlip(!flip)
    setisExpanded(!isExpanded)
  }

  const textStyle = {
    color: 'white',
    fontFamily: 'inherit',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '500',
    textTransform: 'none' as const,
  }

  return (
    <Button
      variant="contained"
      endIcon={<Image src={arrowIcon} alt="arrow" style={arrowStyle} />}
      onClick={() => setCondition()}
      style={buttonStyle}
      startIcon={
        <div style={textStyle}>{isExpanded ? '' : 'More Details'}</div>
      }
      disableTouchRipple
    ></Button>
  )
}
