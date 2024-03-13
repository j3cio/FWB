'use client'

import Navbar from '@/components/ui/privategroups/groupdetailspage/groups_navbar'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function SingleGroupNavbar() {
  const router = useRouter()
  const [companyQuery, setCompanyQuery] = useState('')

  const handleSearch = (companyQuery: any) => {
    const url = `/explore?company=${companyQuery}`
    router.push(url)
  }

  return (
    <div>
      <Navbar
        handleSearch={handleSearch}
        companyQuery={companyQuery}
        setCompanyQuery={setCompanyQuery}
      />
    </div>
  )
}

export default SingleGroupNavbar
