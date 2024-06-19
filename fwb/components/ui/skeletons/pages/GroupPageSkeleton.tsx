import { Box } from '@mui/material'
import { generateSkeletons } from '../generateSkeletons'

const GroupPageSkeleton = () => {
  return (
    <Box
      component="section"
      sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}
    >
      {generateSkeletons({ type: 'NavBar' })}
    </Box>
  )
}

export default GroupPageSkeleton
