import React from 'react'

type Props = {
  onClick?: () => void
  className?: string
}

const RemoveIcon = ({ onClick, className }: Props) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M12.2005 3.80664C12.0759 3.6818 11.9068 3.61165 11.7305 3.61165C11.5541 3.61165 11.385 3.6818 11.2605 3.80664L8.00047 7.05997L4.74047 3.79997C4.61591 3.67514 4.44681 3.60498 4.27047 3.60498C4.09412 3.60498 3.92502 3.67514 3.80047 3.79997C3.54047 4.05997 3.54047 4.47997 3.80047 4.73997L7.06047 7.99997L3.80047 11.26C3.54047 11.52 3.54047 11.94 3.80047 12.2C4.06047 12.46 4.48047 12.46 4.74047 12.2L8.00047 8.93997L11.2605 12.2C11.5205 12.46 11.9405 12.46 12.2005 12.2C12.4605 11.94 12.4605 11.52 12.2005 11.26L8.94047 7.99997L12.2005 4.73997C12.4538 4.48664 12.4538 4.05997 12.2005 3.80664Z"
        fill="white"
      />
    </svg>
  )
}

export default RemoveIcon
