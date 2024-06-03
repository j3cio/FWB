import Navbar from '../../navbar/Navbar'
import { Box, Button, Container } from '@mui/material'

const CreateGroupModal = () => {
  return (
    <Box sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}>
      <Container disableGutters maxWidth="lg">
        <Navbar />
        <Box
          sx={{
            borderRadius: 28,
            borderStyle: 'solid',
            borderColor: 'white',
            borderWidth: 2,
            bgcolor: 'white',
          }}
        >
          <Button> Create a group </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default CreateGroupModal
