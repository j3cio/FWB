'use client'

import { DiscountData, GroupData, UserData } from '@/app/types/types'
import GroupDetailsSection from '@/components/ui/privategroups/groupdetailspage/GroupDetailsSection'
import Tabs from '@/components/ui/privategroups/groupdetailspage/Tabs'
import { Box, Container } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface userId {
  user_id: string
}
interface GroupContentProps {
  userData: UserData[]
  groupData: GroupData
  discountData: DiscountData[]
  userIdArray: userId[]
}

const GroupContent = ({
  userData,
  groupData,
  discountData,
  userIdArray,
}: GroupContentProps) => {
  return (
    <Container disableGutters maxWidth="lg" sx={{ paddingTop: 1 }}>
      <Box
        sx={{
          paddingX: '18px',
          position: 'relative',
          marginTop: '56px',
          zIndex: 0,
        }}
      >
        <GroupDetailsSection
          userData={userData}
          groupData={groupData.data[0]}
          toast={toast}
          userIdArray={userIdArray}
        />
        <Tabs userData={userData} discountData={discountData} />
      </Box>
      <ToastContainer
        autoClose={3000}
        toastClassName="bg-[#8E94E9]"
        bodyClassName="text-white"
        theme="colored"
        position="top-center"
      />
    </Container>
  )
}

export default GroupContent
