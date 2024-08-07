'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

import IllustrationThree from '@/components/ui/fre/IllustrationThree'
import IllustrationFour from '@/components/ui/fre/IllustrationFour'
import { CustomSwitch } from '@/components/ui/fre/CustomSwitch'

import {
  handleDiscountSubmit,
  updateUser,
  insertToUserDiscountTable,
  addDiscountToUser,
  handleCategoryChange,
} from './utils'

import { TestUser } from '../../../types/types'

declare global {
  interface Window {
    Clerk: any
  }
}

export default function UserFlowPage2({ userData }: { userData: TestUser }) {
  const [company, setCompany] = useState('')
  const [termsAndConditions, setTermsAndConditions] = useState('')
  const [discountAmount, setDiscountAmount] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)

  const allCategories = [
    'All',
    'Sports',
    'Fashion',
    'Electronic',
    'Health',
    'Books',
    'Hobbies',
    'Home & Kitchen',
    'Computer & Accessories',
    'Beauty & Skincare',
  ]
  const [categories, setCategories] = useState<string[]>(allCategories)

  const router = useRouter()
  const { user } = useUser()

  const togglePrivacy = () => setIsPrivate(!isPrivate)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('discount_amount', discountAmount)
    formData.append('public', JSON.stringify(!isPrivate))
    formData.append('company', company)
    formData.append('terms_and_conditions', termsAndConditions)
    formData.append('categories', `${categories}`)
    formData.append('company_url', `www.${company}.com`.toLowerCase())

    const bearerToken = await window.Clerk.session.getToken({
      template: 'testing_template',
    })

    const supabaseToken = await window.Clerk.session.getToken({
      template: 'supabase',
    })

    const discountId = await handleDiscountSubmit(
      event,
      formData,
      bearerToken,
      supabaseToken
    )

    if (discountId && user?.id) {
      await insertToUserDiscountTable(discountId, user.id, supabaseToken)
      await addDiscountToUser(discountId, bearerToken, supabaseToken)
      await updateUser(router)
    }
  }

  const handleUpdateUser = async () => {
    await updateUser(router)
  }
  return (
    <div className="flex min-h-screen flex-col lg:flex-row lg:justify-between lg:overflow-hidden">
      <div className="hidden lg:block">
        <IllustrationThree />
      </div>
      <div className="flex w-full flex-col items-center justify-center px-4 lg:px-36">
        <div className="mt-8 flex justify-center lg:mt-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="8"
            viewBox="0 0 56 8"
            fill="none"
          >
            <circle cx="4" cy="4" r="4" fill="#ADB4D2" />
            <circle cx="28" cy="4" r="4" fill="#F6FF82" />
            <circle cx="52" cy="4" r="4" fill="#ADB4D2" />
          </svg>
        </div>
        <h2 className="mb-1 mt-7 text-center text-2xl font-semibold leading-[110%] text-white lg:mb-[65px] lg:mt-[36px] lg:text-[40px]">
          Share your &quot;benefits&quot; 😏
        </h2>
        <div className="mb-10 text-center text-sm font-medium text-white lg:hidden">
          Lorem ipsum dolor sit amet consectetur.
        </div>

        <form onSubmit={onSubmit} className="w-full lg:w-auto">
          <h6 className="mb-1 text-sm font-medium text-white lg:mb-2">
            Company Name *
          </h6>
          <input
            type="text"
            className="mb-3 w-full rounded-full bg-white px-3 py-1 text-sm placeholder:text-gray-400 lg:w-96 lg:px-6 lg:py-2 lg:text-base"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />

          <div className="flex flex-col lg:flex-row lg:justify-start">
            <div className="lg:mr-6">
              <h6 className="mb-1 text-sm font-medium text-white lg:mb-2">
                Discount Amount (%) *
              </h6>
              <input
                type="number"
                className="mb-3 w-full rounded-full bg-white px-3 py-1 text-sm placeholder:text-gray-400 lg:mb-5 lg:w-36 lg:px-6 lg:py-2 lg:text-base"
                placeholder="1 - 100"
                min="1"
                max="100"
                step="1"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
                required
              />
            </div>

            <div>
              <h6 className="mb-1 text-sm font-medium text-white lg:mb-2">
                Category *
              </h6>
              <select
                className="mb-3 w-full rounded-full border bg-[#8e94e9] px-3 py-1 text-sm text-white lg:mb-5 lg:w-52 lg:py-2 lg:text-base"
                onChange={(e) =>
                  handleCategoryChange(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    ),
                    allCategories,
                    setCategories
                  )
                }
                value={categories[0]}
                required
              >
                {allCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h6 className="mb-1 text-sm font-medium text-white lg:mb-2">
            Discount Rules & Conditions
          </h6>
          <textarea
            className="mb-3 w-full rounded-lg bg-white px-3 py-2 text-sm placeholder:text-gray-400 lg:mb-9 lg:px-6 lg:text-base"
            placeholder="Share any rules or limitations about your benefit"
            value={termsAndConditions}
            onChange={(e) => setTermsAndConditions(e.target.value)}
          />

          <div
            className="mb-12 hidden cursor-pointer select-none items-center lg:flex"
            onClick={() => togglePrivacy()}
          >
            <CustomSwitch
              checked={isPrivate}
              inputProps={{ 'aria-label': 'controlled Switch' }}
            />
            <p className="ml-2 text-white">Keep private</p>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-72 rounded-3xl bg-[#F6FF82] px-6 py-3 text-base font-bold text-[#8e94e9] lg:w-full lg:text-lg"
            >
              Share <span className="lg:hidden">on Public</span>
            </button>
          </div>
        </form>

        <div
          className="mt-4 flex cursor-pointer justify-center"
          onClick={handleUpdateUser}
        >
          <div className="text-base font-bold text-white lg:text-lg">
            Skip for now
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <IllustrationFour />
      </div>
    </div>
  )
}
