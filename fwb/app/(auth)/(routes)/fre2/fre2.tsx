'use client'

import './page.css'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import IllustrationThree from '@/components/ui/fre/IllustrationThree'
import IllustrationFour from '@/components/ui/fre/IllustrationFour'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserData } from '../../../types/types'
import UpdateUser from '@/components/hooks/updateUser'

import useWindowDimensions from '@/components/hooks/useWindowDimensions'

// Setting Clerk as Global Variable to access Clerk / Supabase Session Keys
declare global {
  interface Window {
    Clerk: any
  }
}

export default function UserFlowPage2({ userData }: { userData: UserData }) {
  const [company, setCompany] = useState('')
  const [termsAndConditions, setTermsAndConditions] = useState('')
  const [discountAmount, setDiscountAmount] = useState('')

  const width = useWindowDimensions()

  //Set State of All Categories
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

  //TODO: Handle User Routing Once Form is Submitted
  const router = useRouter()

  //Handle Discount Submission
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
      formData.append('public', 'true')
      formData.append('categories', `${categories}`)
      formData.append('company_url', `www.${company}.com`.toLowerCase())

      // POST Fetch Request to Discounts API
      const response = await fetch('/api/discounts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          supabase_jwt: supabaseToken,
        },
        body: formData,
      })

      // Log each entry in the FormData separately
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`)
      })

      if (response.ok) {
        const data = await response.json()
        const discountId = data.data[0].id
        console.log('Discount added successfully:', data)
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
        console.log('rerouting to fre3')
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

  //Function to handle Array Property of Categories Column in Supabase
  const handleCategoryChange = (selectedCategories: string[]) => {
    // Set the state to the selected categories
    if (selectedCategories.includes('All')) {
      setCategories(allCategories)
    } else {
      setCategories(selectedCategories)
    }
  }

  return (
    <div>
      {width > 400 && (
        <div className="pageContent">
          <IllustrationThree />
          <div className="middleSpacing">
            <div className="flex-col justify-center">
              <div className="progresscircles">
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
              <h2 className="mainHeader mb-[65px] mt-[36px]">
                Share your &quot;benefits&quot; 😏
              </h2>

              {/* This is the form that will handle company user input  */}
              <div className="ml-9">
                <form onSubmit={handleDiscountSubmit}>
                  <h6 className="discountFormText">Company Name *</h6>
                  <input
                    type="text"
                    className="inputCompany"
                    placeholder="Company Name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />

                  <div className="flex justify-start flex-col">
                    <div className="flex justify-start">
                      <h6 className="discountFormText">
                        Discount Amount (%) *
                      </h6>
                      <h6 className="discountFormText">Category *</h6>
                    </div>

                    <div className="flex justify-start">
                      <input
                        type="number"
                        className="inputDiscount"
                        placeholder="1 - 100"
                        min="1"
                        max="100"
                        step="1"
                        value={discountAmount}
                        onChange={(e) => setDiscountAmount(e.target.value)}
                        required
                      />

                      {/* This will Need to be updated with Map function for all Categories */}
                      <select
                        className="selectCategory"
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

                    <h6 className="discountFormText">
                      Discount Rules & Conditions
                    </h6>
                    <textarea
                      className="inputConditions"
                      placeholder="Share any rules or limitations about your benefit"
                      value={termsAndConditions}
                      onChange={(e) => setTermsAndConditions(e.target.value)}
                      required
                    />
                    {/* <select>
                  <option value="All">All</option>
                  <option value="Sports">Sports</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Health">Health</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Computer & Accessories">
                    Computer & Accessories
                  </option>
                  <option value="Beauty & Skincare">Beauty & Skincare</option>
                  <option value="Books">Books</option>
                  <option value="Hobbies">Hobbies</option>
                </select> */}
                  </div>

                  <div className="flex justify-center mt-[60px]">
                    <button
                      type="submit"
                      className="share"
                      onClick={handleDiscountSubmit}
                    >
                      Share
                    </button>
                  </div>
                </form>
              </div>

              {/* This is the link functionality to carry user to stage 3  */}
              <div
                className="flex justify-center"
                style={{ marginTop: '-10px' }}
                onClick={updateUser}
              >
                <div className="skip">Skip for now</div>
              </div>
            </div>
          </div>
          <IllustrationFour />
        </div>
      )}
      {width < 400 && (
        <div className="pageContent w-full">
          <div className="flex-col justify-center">
            <div className="progresscircles mt-[32px]">
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
            <h2 className="mainHeader mb-[0px] text-[24px] mt-[30px]">
              Share your &quot;benefits&quot; 😏
            </h2>
            <div className="mainHeader mb-[40px] text-[12px] mt-[5px] font-[500]">
              Lorem ipsum dolor sit amet consectetur.
            </div>

            {/* This is the form that will handle company user input  */}
            <div className="relative w-screen px-[16px] relative">
              <form onSubmit={handleDiscountSubmit}>
                <h6 className="discountFormText text-[12px]">Company Name *</h6>
                <input
                  type="text"
                  className="inputCompany w-full text-[12px] px-[12px] py-[5px] h-auto placeholder:text-[13px]"
                  placeholder="Company Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />

                <div className="flex justify-start flex-col">
                  <div className="">
                    <h6 className="discountFormText text-[12px]">
                      Discount Amount (%) *
                    </h6>
                    <input
                      type="number"
                      className="inputDiscount mt-[5px] w-full text-[12px] px-[12px] py-[5px] h-auto mb-[12px]  placeholder:text-[13px]"
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
                    <h6 className="discountFormText text-[12px]">Category *</h6>
                    <select
                      className="selectCategory text-[12px] px-[12px] py-[5px] h-auto  w-full  placeholder:text-[13px]"
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
                  <h6 className="discountFormText text-[12px]">
                    Discount Rules & Conditions
                  </h6>
                  <textarea
                    className="inputConditions text-[12px] w-full placeholder:text-[13px] pl-[8px] mb-0"
                    placeholder="Share any rules or limitations about your benefit"
                    value={termsAndConditions}
                    onChange={(e) => setTermsAndConditions(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-center mt-[36px] mb-[8px]">
                  <button
                    type="submit"
                    className="share w-[272px] h-auto text-[16px] m-0"
                    onClick={handleDiscountSubmit}
                  >
                    Share on Public
                  </button>
                </div>
              </form>
            </div>

            {/* This is the link functionality to carry user to stage 3  */}
            <div className="flex justify-center" onClick={updateUser}>
              <div className="skip h-auto text-[16px] m-0">Skip for now</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
