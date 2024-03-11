'use client'
import { DiscountData, UserData } from '@/app/types/types'
import { Button } from '@mui/base'
import { Box } from '@mui/material'
import { useState } from 'react'
import Bargains from './BargainsPicture'
import DiscountsSection from './DiscountsSection'
import MembersSection from './MembersSection'

const Tabs = ({
    userData,
    discountData,
}: {
    userData: UserData[]
    discountData: DiscountData[]
}) => {
    // Tab State
    const [showMembers, setShowMembers] = useState(false)
    const showMemberTab = () => {
        setShowMembers(true)
    }
    const showDiscountsTab = () => {
        setShowMembers(false)
    }

    return (
        <div
            className="w-full bg-[#1a1a23]"
            style={{
                minHeight: '100vh',
            }}
        >
            <div className="flex flex-row justify-evenly items-center mt-10 mb-10 ml-24 mr-40">
                <div
                    className={`w-1/2 hover:text-white hover:border-b-2 hover:border-white font-bold text-3xl ${
                        !showMembers
                            ? `text-white border-b-2 border-white`
                            : `text-gray-600`
                    }`}
                >
                    <Box textAlign="center">
                        <Button
                            onClick={showDiscountsTab}
                            className=" items-center"
                        >
                            Discounts Offers
                        </Button>
                    </Box>
                </div>
                <div
                    className={`w-1/2 hover:text-white hover:border-b-2 hover:border-white font-bold text-3xl ${
                        showMembers
                            ? `text-white border-b-2 border-white`
                            : `text-gray-600`
                    }`}
                >
                    <Box textAlign="center">
                        <Button onClick={showMemberTab}>Members</Button>
                    </Box>
                </div>
            </div>
            <div className="ml-24 mr-24">
                {showMembers ? <></> : <Bargains />}
            </div>
            <div className="w-full h-screen">
                {showMembers ? (
                    <MembersSection userData={userData} />
                ) : (
                    <DiscountsSection discountData={discountData} />
                )}
            </div>
        </div>
    )
}

export default Tabs
