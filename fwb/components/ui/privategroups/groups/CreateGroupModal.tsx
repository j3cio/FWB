import Navbar from '@/components/ui/privategroups/groupdetailspage/groups_navbar'
import { Box, Button, Container } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CreateGroupModal = () => {
  const router = useRouter()
  const [companyQuery, setCompanyQuery] = useState('')

  const handleSearch = (companyQuery: any) => {
    const url = `/explore?company=${companyQuery}`
    router.push(url)
  }

  return (
    <Box sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}>
      <Container disableGutters maxWidth="lg">
        <Navbar
          handleSearch={handleSearch}
          companyQuery={companyQuery}
          setCompanyQuery={setCompanyQuery}
        />
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
