'use client'

import { useState, useCallback } from 'react'

import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

import UpdateUser from '@/components/hooks/updateUser'
import IllustrationThree from '@/components/ui/fre/IllustrationThree'
import IllustrationFour from '@/components/ui/fre/IllustrationFour'
import { CustomSwitch } from '@/components/ui/fre/CustomSwitch'
import useWindowDimensions from '@/components/hooks/useWindowDimensions'

import { UserData } from '../../../types/types'

declare global {
  interface Window {
    Clerk: any
  }
}

export default function UserFlowPage2({ userData }: { userData: UserData }) {
  const [company, setCompany] = useState('')
  const [termsAndConditions, setTermsAndConditions] = useState('')
  const [discountAmount, setDiscountAmount] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)

  const width = useWindowDimensions()

  const allCategories = [
    'sports',
    'fashion',
    'electronic',
    'health',
    'books',
    'hobbies',
    'home & kitchen',
    'computer & accessories',
    'beauty & skincare',
  ]
  const [categories, setCategories] = useState<string[]>(allCategories)

  const router = useRouter()
  const { isSignedIn, user, isLoaded } = useUser()

  const togglePrivacy = () => setIsPrivate(!isPrivate)

  const handleRedirect = useCallback(() => {
    if (!isLoaded || !isSignedIn || !userData.users[0]) {
      router.replace('/fre1')
      return
    }

    if (!userData || !userData.users[0].hasCompletedFRE[0]) {
      router.replace('/fre1')
    } else if (
      userData.users[0].hasCompletedFRE[1] &&
      userData.users[0].hasCompletedFRE[0] &&
      !userData.users[0].hasCompletedFRE[2]
    ) {
      router.replace('/fre3')
    } else if (
      userData.users[0].hasCompletedFRE[2] &&
      userData.users[0].hasCompletedFRE[1] &&
      userData.users[0].hasCompletedFRE[0]
    ) {
      router.replace('profile')
    }
  }, [isLoaded, isSignedIn, router, userData])

  const handleDiscountSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const bearerToken = await window.Clerk.session.getToken({
        template: 'testing_template',
      })

      const supabaseToken = await window.Clerk.session.getToken({
        template: 'supabase',
      })

      const formData = new FormData()
      formData.append('company', company)
      formData.append('terms_and_conditions', termsAndConditions)
      formData.append('discount_amount', discountAmount)
      formData.append('categories', `${categories}`)
      formData.append('company_url', `www.${company}.com`.toLowerCase())
      formData.append('public', JSON.stringify(!isPrivate))

      const response = await fetch('/api/discounts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          supabase_jwt: supabaseToken,
        },
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        const discountId = data.data[0].id
        addDiscountToUser(discountId, bearerToken, supabaseToken)
        updateUser()
      } else {
        const errorData = await response.json()
        console.error('Error adding discount:', errorData)
      }
    } catch (error) {
      console.error('Error using discount API:', error)
    }
  }

  const updateUser = async () => {
    try {
      const formData = new FormData()
      formData.append('hasCompletedFRE', '{true, true, false}')

      const response = await UpdateUser(formData)

      if (response) {
        router.push('/fre3')
      } else {
        console.error('Error in updateUser')
      }
    } catch (error) {
      console.error('Error in updateUser:', error)
    }
  }

  const addDiscountToUser = async (
    discountId: string,
    bearerToken: string,
    supabaseToken: string
  ) => {
    try {
      await fetch('/api/tempdiscounts', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          supabase_jwt: supabaseToken,
        },
        body: JSON.stringify({ discountId }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleCategoryChange = (selectedCategories: string[]) => {
    if (selectedCategories.includes('All')) {
      setCategories(allCategories)
    } else {
      setCategories(selectedCategories)
    }
  }

  return (
    <div>
      {width > 400 && (
        <div className="flex h-screen justify-between overflow-hidden">
          <IllustrationThree />
          <div className="flex w-screen flex-col items-center justify-center px-36">
            <div className="flex justify-center">
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
            <h2 className="mb-[65px] mt-[36px] text-center text-4xl font-semibold text-white">
              Share your &quot;benefits&quot; 😏
            </h2>

            <div>
              <form onSubmit={handleDiscountSubmit}>
                <h6 className="mb-2 text-sm font-medium text-white">
                  Company Name *
                </h6>
                <input
                  type="text"
                  className="mb-3 w-96 rounded-full bg-white px-6 py-2 placeholder:text-gray-400"
                  placeholder="Company Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />

                <div className="flex justify-start">
                  <div className="mr-6">
                    <h6 className="mb-2 text-sm font-medium text-white">
                      Discount Amount (%) *
                    </h6>
                    <input
                      type="number"
                      className="mb-5 w-36 rounded-full bg-white px-6 py-2 placeholder:text-gray-400"
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
                    <h6 className="mb-2 text-sm font-medium text-white">
                      Category *
                    </h6>
                    <select
                      className="mb-5 w-52 rounded-full bg-[#8e94e9] px-3 py-2 text-white"
                      onChange={(e) =>
                        handleCategoryChange(
                          Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          )
                        )
                      }
                      value={categories[0]}
                      required
                    >
                      <option value="All">All</option>
                      <option value="Sports">Sports</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Electronic">Electronic</option>
                      <option value="Health">Health</option>
                      <option value="HomeAndKitchen">Home & Kitchen</option>
                      <option value="ComputerAndAccessories">
                        Computer & Accessories
                      </option>
                      <option value="BeautyAndSkincare">
                        Beauty & Skincare
                      </option>
                      <option value="Books">Books</option>
                      <option value="Hobbies">Hobbies</option>
                    </select>
                  </div>
                </div>

                <h6 className="mb-2 text-sm font-medium text-white">
                  Discount Rules & Conditions
                </h6>
                <textarea
                  className="mb-3 w-full rounded-lg bg-white px-6 py-2 placeholder:text-gray-400"
                  placeholder="Share any rules or limitations about your benefit"
                  value={termsAndConditions}
                  onChange={(e) => setTermsAndConditions(e.target.value)}
                  required
                />
                <div
                  className="mb-12 flex cursor-pointer select-none items-center"
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
                    className="w-full rounded-3xl bg-[#F6FF82] px-6 py-3 text-lg font-bold text-[#8e94e9]"
                    onClick={handleDiscountSubmit}
                  >
                    Share
                  </button>
                </div>
              </form>
            </div>

            <div
              className="mt-4 flex cursor-pointer justify-center"
              onClick={updateUser}
            >
              <div className="text-lg font-bold text-white">Skip for now</div>
            </div>
          </div>
          <IllustrationFour />
        </div>
      )}
      {width < 400 && (
        <div className="w-full">
          <div className="flex flex-col justify-center">
            <div className="mt-8 flex justify-center">
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
            <h2 className="mb-1 mt-7 text-center text-2xl font-semibold text-white">
              Share your &quot;benefits&quot; 😏
            </h2>
            <div className="mb-10 text-center text-sm font-medium text-white">
              Lorem ipsum dolor sit amet consectetur.
            </div>

            <div className="relative px-4">
              <form onSubmit={handleDiscountSubmit}>
                <h6 className="mb-1 text-sm font-medium text-white">
                  Company Name *
                </h6>
                <input
                  type="text"
                  className="mb-3 w-full rounded-full bg-white px-3 py-1 text-sm placeholder:text-gray-400"
                  placeholder="Company Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />

                <div className="flex flex-col justify-start">
                  <div>
                    <h6 className="mb-1 text-sm font-medium text-white">
                      Discount Amount (%) *
                    </h6>
                    <input
                      type="number"
                      className="mb-3 w-full rounded-full bg-white px-3 py-1 text-sm placeholder:text-gray-400"
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
                    <h6 className="mb-1 text-sm font-medium text-white">
                      Category *
                    </h6>
                    <select
                      className="mb-3 w-full rounded-full bg-[#8e94e9] px-3 py-1 text-sm text-white"
                      onChange={(e) =>
                        handleCategoryChange(
                          Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          )
                        )
                      }
                      value={categories[0]}
                      required
                    >
                      <option value="All">All</option>
                      <option value="Sports">Sports</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Electronic">Electronic</option>
                      <option value="Health">Health</option>
                      <option value="HomeAndKitchen">Home & Kitchen</option>
                      <option value="ComputerAndAccessories">
                        Computer & Accessories
                      </option>
                      <option value="BeautyAndSkincare">
                        Beauty & Skincare
                      </option>
                      <option value="Books">Books</option>
                      <option value="Hobbies">Hobbies</option>
                    </select>
                  </div>
                  <h6 className="mb-1 text-sm font-medium text-white">
                    Discount Rules & Conditions
                  </h6>
                  <textarea
                    className="mb-9 w-full rounded-lg bg-white px-3 py-2 text-sm placeholder:text-gray-400"
                    placeholder="Share any rules or limitations about your benefit"
                    value={termsAndConditions}
                    onChange={(e) => setTermsAndConditions(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-2 flex justify-center">
                  <button
                    type="submit"
                    className="w-72 rounded-3xl bg-[#F6FF82] px-6 py-3 text-base font-bold text-[#8e94e9]"
                    onClick={handleDiscountSubmit}
                  >
                    Share on Public
                  </button>
                </div>
              </form>
            </div>

            <div className="flex justify-center" onClick={updateUser}>
              <div className="skip m-0 h-auto text-[16px]">Skip for now</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
