import CreateGroupsHeader from '@/components/ui/privategroups/groups/CreateGroupHeader'
import { generateSkeletons } from '@/components/ui/skeletons/generateSkeletons'
import { Box, Container, Typography } from '@mui/material'

const Loading = () => {
  return (
    <Box
      component="section"
      sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}
    >
      <Container disableGutters maxWidth="lg">
        <>
          <Box className="flex items-center justify-between px-[18px]">
            <Typography
              className="font-urbanist"
              sx={{
                fontSize: 24,
                color: '#FFFFFF',
                marginY: 3,
                fontWeight: 600,
              }}
            >
              Private Groups
            </Typography>
          </Box>
        </>
        <div className="mt-16">
          {generateSkeletons({ type: 'GroupCard', quantity: 3 })}
        </div>
      </Container>
    </Box>
  )
}

export default Loading
