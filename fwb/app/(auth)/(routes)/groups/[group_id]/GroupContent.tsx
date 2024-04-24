'use client'

import { Box, Container } from '@mui/material'
import Navbar from '@/components/ui/navbar/Navbar'
import GroupDetailsSection from '@/components/ui/privategroups/groupdetailspage/GroupDetailsSection'
import { DiscountData, GroupData, UserData } from '@/app/types/types'
import Tabs from '@/components/ui/privategroups/groupdetailspage/Tabs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface GroupContentProps {
  userData: UserData[]
  groupData: GroupData
  discountData: DiscountData[]
}

const GroupContent = ({
  userData,
  groupData,
  discountData,
}: GroupContentProps) => {


  return (
    <Container disableGutters maxWidth="lg">
      <div className="bg-[#1A1A23' min-h-[112px]">
        <Navbar />
      </div>
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
        />
        <Tabs userData={userData} discountData={discountData} />
      </Box>
        <ToastContainer
          autoClose={3000}
          toastClassName="bg-[#8E94E9]"
          bodyClassName="text-white" 
          theme="colored" 
          position='top-center' 
        />
    </Container>
  )
}

export default GroupContent
