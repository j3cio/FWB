'use client'

import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import Navbar from '@/components/ui/navbar/Navbar'
import { useAuth, useUser } from '@clerk/nextjs'
import { Container, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Slider from '@mui/material/Slider'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import './page.css'
import { CustomSwitchAddBenefits } from '@/components/ui/fre/CustomSwitch'
import PercentageIcon from './icons/PercentageIcon'
import { SearchContext } from '@/contexts/SearchContext'
import Image from 'next/image'
import {
  BrandFetchRetrieveBrandResponse,
  BrandFetchSearchResponse,
  FuzzySearchResponse,
} from './types'
import CloseIcon from '@/components/ui/chat/icons/CloseIcon'

const theme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 8, // Thickness
        },
        thumb: {
          backgroundColor: '#8E94E9',
        },
        track: {
          backgroundColor: '#8E94E9',
        },
        // '& .MuiSlider-rail': {
        //   opacity: 0.5,
        //   backgroundColor: 'red',
        // },
        rail: {
          backgroundColor: 'white !important',
        },
        valueLabel: {
          backgroundColor: '#FFF', // Label background color
          color: '#000', // Label text color
        },
        valueLabelLabel: {
          color: '#000', // Label text color
        },
      },
    },
  },
})

export default function Intakeform() {
  const { user } = useUser()
  const [discountAmount, setDiscountAmount] = useState<number>(0)
  const [emailAddress, setEmailAddress] = useState('')
  const [company, setCompany] = useState('')
  const [shareableUrl, setShareableUrl] = useState('')
  const [selectedOption, setSelectedOption] = useState<'public' | 'private'>(
    'public'
  )
  const [showCompaniesList, setShowCompaniesList] = useState(false)
  const [categories, setCategories] = useState('')
  const [termsAndConditions, setTermsAndConditions] = useState(false)
  const [description, setDescription] = useState('')
  const [brandFetchSearchResults, setBrandFetchSearchResults] =
    useState<any[]>()

  const { handleSearch, searchResults } = useContext(SearchContext)
  const router = useRouter()
  const { getToken } = useAuth()

  const handleSlide = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setDiscountAmount(newValue)
    }
  }

  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    setTermsAndConditions(event.target?.checked)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const bearerToken = await window.Clerk.session.getToken({
        template: 'testing_template',
      })
      const supabaseToken = await window.Clerk.session.getToken({
        template: 'supabase',
      })

      if (user) {
        const formData = new FormData()
        formData.append('user_id', user.id)
        formData.append('terms_and_conditions', `${termsAndConditions}`) // TODO: This column is a text in supabase db, should be a boolean
        formData.append('shareable_url', shareableUrl)
        formData.append('discount_amount', `${discountAmount}`)
        formData.append('view_count', '0'), // I don't think we will need these 3 params for a while..
          formData.append('share_count', '0'),
          formData.append('message_count', '0'),
          formData.append('public', `${selectedOption}`) // DISCUSS: True if public, False if private
        formData.append('logo', 'No logo for now') // TODO: Get logos for discounts
        // Name and company are the same thing
        formData.append('Name', company)
        formData.append('company', company)

        formData.append('categories', `${categories}`)
        formData.append('description', description)
        //formData.append('email', emailAddress)

        const response = await fetch('/api/tempdiscounts', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            supabase_jwt: supabaseToken,
          },
          body: formData,
        })

        if (response.ok) {
          const discountData = await response.json()
          console.log('Discount added successfully:', discountData)
        } else {
          const errorData = await response.json()
          console.error('Error adding user:', errorData)
        }
      } else {
        console.error('Error user not found')
      }
    } catch (error) {
      console.error('Error adding discount:', error)
    }
  }

  const valueLabelFormat = (discount: number) => {
    return `${discount}%`
  }

  /*const handleOptionChange = (option: 'public' | 'private') => {
    setSelectedOption(option)
  }*/

  const togglePrivacy = () =>
    selectedOption === 'public'
      ? setSelectedOption('private')
      : setSelectedOption('public')

  const handleCategoryChange = (selectedCategories: any) => {
    setCategories(selectedCategories)
  }

  const handleDiscountInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setDiscountAmount(0)
    } else {
      setDiscountAmount(parseInt(event.target.value, 10))
    }
  }

  const isDisabled = !(
    termsAndConditions &&
    discountAmount !== 0 &&
    company !== ''
  )

  let debounceTimeout: ReturnType<typeof setTimeout> | null = null

  const queryCompany = async (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setCompany(query)

    // Clear any existing debounce timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }

    // Set a new debounce timeout
    debounceTimeout = setTimeout(async () => {
      // Call the handleSearch function
      await handleSearch(query, true)

      // Check if searchResults is empty after a delay
      if (company.length && searchResults.length === 0) {
        setTimeout(() => {
          // Make an API call to the BrandFetch API with the company field
          fetch(`https://api.brandfetch.io/v2/search/${query}`)
            .then((response) => response.json())
            .then((data) => {
              // Handle the response data from the BrandFetch API
              setBrandFetchSearchResults(data)
              console.log('BrandFetch API response:', data)
            })
            .catch((error) => {
              console.error('Error fetching from BrandFetch API:', error)
            })

          setShowCompaniesList(true)
        }, 500) // Adjust this delay as needed
      }
    }, 500) // Adjust this debounce timeout as needed
  }

  const addCompanyToSupabase = async (
    brandData: BrandFetchRetrieveBrandResponse
  ) => {
    const bearerToken = await window.Clerk.session.getToken({
      template: 'testing_template',
    })
    const supabaseToken = await window.Clerk.session.getToken({
      template: 'supabase',
    })

    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          supabase_jwt: supabaseToken,
        },
        body: JSON.stringify(brandData),
      })

      const data = await response.json()

      console.log({ data })

      return
    } catch (error) {
      console.error(error)
    }
  }

  const brandfetchApiKey =
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY
      : process.env.BRANDFETCH_API_KEY

  const addBrandFetchDetails = async (brandId: string) => {
    const response = await fetch(
      `
    https://api.brandfetch.io/v2/brands/${brandId}`,
      {
        headers: {
          Authorization: `Bearer ${brandfetchApiKey}`,
        },
      }
    )
    const brandData: BrandFetchRetrieveBrandResponse = await response.json()

    setCompany(brandData.name)
    // setCategories(brandData.company.industries[0].name) once we normalize our categories we can uncomment this--for now brandfetch uses categories that we don't have by default

    // Add our brandData to our Supabase after this is done. Can't do this just yet since we'll need to configure our tables for the schema we want.

    addCompanyToSupabase(brandData)

    setShowCompaniesList(false)
  }

  return (
    <div>
      <Box sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}>
        <Container disableGutters maxWidth="lg">
          <div>
            <Navbar />
          </div>
          <form
            id="discountForm"
            onSubmit={handleSubmit}
            className="formContainer"
          >
            <div className="firstBox">
              <div className="share">
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '32px',
                  }}
                >
                  Share My Benefits
                </Typography>
              </div>

              {/*<div className="line1">
                <div className="email">Email*</div>
                <div>
                  <input
                    className="inputEmail"
                    placeholder="Email@address.com"
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmailAddress(e.target.value)}
                    value={emailAddress}
                  />
                </div>
                </div>*/}

              <div className="line2">
                <div className="company">Company Name*</div>
                <div className="relative flex flex-col items-end">
                  <p className="absolute top-[-25px] cursor-pointer text-sm text-white">
                    <a
                      href="https://brandfetch.com"
                      rel="noreferrer"
                      target="_blank"
                    >
                      Powered by Brandfetch
                    </a>
                  </p>
                  <input
                    className="inputCompany"
                    placeholder="Company Name"
                    onChange={(e) => queryCompany(e)}
                    id="companyName"
                    name="companyName"
                    value={company}
                    // onBlur={() => {
                    //   setShowCompaniesList(false)
                    // }}
                  />

                  {company.length ? (
                    <div
                      className="absolute right-1 cursor-pointer opacity-60 hover:opacity-100"
                      onClick={() => {
                        setCompany('')
                        setShowCompaniesList(false)
                      }}
                    >
                      <CloseIcon fill="black" />
                    </div>
                  ) : null}

                  {/* Here is where we have different actions depending on if we're using brandfetch or our local DB.*/}
                  {showCompaniesList && searchResults.length ? (
                    // {showCompaniesList && searchResults.length ? (
                    <div className="absolute top-6 z-10 mt-2 flex min-h-10 w-full max-w-[364px] flex-col justify-self-end rounded bg-slate-500 py-2 pl-4 text-white">
                      {searchResults.map((result: FuzzySearchResponse) => (
                        <div
                          key={crypto.randomUUID()}
                          className="my-1 flex items-center gap-1"
                          onClick={() => {
                            setCompany(result.name)
                            setShowCompaniesList(false)
                          }}
                        >
                          <Image
                            src={result.logo ? result.logo : '/nologo.png'}
                            alt={`${result.name} logo`}
                            width={36}
                            height={36}
                          />

                          <p className="cursor-pointer">{result.name}</p>
                        </div>
                      ))}
                    </div>
                  ) : brandFetchSearchResults &&
                    showCompaniesList &&
                    brandFetchSearchResults.length ? (
                    <div className="absolute top-6 z-10 mt-2 flex min-h-10 w-full max-w-[364px] flex-col justify-self-end rounded bg-slate-500 py-2 pl-4 text-white">
                      {brandFetchSearchResults.map(
                        (result: BrandFetchSearchResponse) => (
                          // {searchResults.map((result) => (
                          <div
                            key={crypto.randomUUID()}
                            className="my-1 flex items-center gap-1"
                            onClick={() => {
                              // setCompany(result.name)
                              // setShowCompaniesList(false)
                              addBrandFetchDetails(result.brandId)
                            }}
                          >
                            <Image
                              src={result.icon ? result.icon : '/nologo.png'}
                              alt={`${result.name} logo`}
                              width={36}
                              height={36}
                            />

                            <p className="cursor-pointer">{result.name}</p>
                          </div>
                        )
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
              {/*<div className="line3">
                <div className="url">Company URL*</div>
                <div>
                  <input
                    className="inputUrl"
                    placeholder="/https:/abcdefgh.com"
                    onChange={(e) => setShareableUrl(e.target.value)}
                    id="companyName"
                    name="companyName"
                    value={shareableUrl}
                  />
                </div>
                </div>*/}
            </div>
            <div>
              <div className="secondBox">
                <div>
                  {/*<Typography
                    sx={{
                      color: '#F6FF82',
                      fontWeight: '600',
                      fontSize: '32px',
                    }}
                  >
                    Benefit Details
                  </Typography>*/}
                  <div>
                    <div>
                      <div>
                        <div className="discount1">
                          <div className="amount">Discount Amount*</div>
                          <ThemeProvider theme={theme}>
                            <div
                              className="slider"
                              style={{
                                width: '220px',
                                marginTop: '10px',
                              }}
                            >
                              {/* <Typography gutterBottom>
                        Slider Value: {discount}
                      </Typography> */}
                              <Slider
                                sx={{
                                  '& .MuiSlider-rail': {
                                    backgroundColor: 'white !important',
                                  },
                                }}
                                value={discountAmount}
                                onChange={handleSlide}
                                valueLabelDisplay="auto"
                                valueLabelFormat={valueLabelFormat}
                                aria-labelledby="continuous-slider"
                              />
                            </div>
                          </ThemeProvider>

                          <div className="percentage ml-3 flex h-8 w-[125px] items-center rounded bg-white px-4">
                            <input
                              // className="discountName" -- Removed this styling for now, feel free to re-enable after replicating this UI effect if desired
                              className="w-full rounded border-none bg-white outline-none"
                              value={discountAmount ? discountAmount : ''}
                              placeholder="1-100"
                              onChange={handleDiscountInputChange}
                            />
                            <PercentageIcon />
                          </div>
                        </div>
                      </div>
                      <div className="categories">
                        <div className="category">Category</div>
                        {/* <div className="flex justify-start"> */}
                        {/* <div className="selectCategory"> */}
                        <select
                          onChange={(e) =>
                            handleCategoryChange(
                              Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                              )
                            )
                          }
                          multiple={false}
                          value={categories}
                          required
                        >
                          <option value="All">All </option>
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
                    <div className="rule">
                      <div className="description">
                        Discount Rules <p>& Conditions</p>
                      </div>
                      <div>
                        {' '}
                        <textarea
                          className="inputDiscount"
                          placeholder=""
                          onChange={(e) => setDescription(e.target.value)}
                          id="description"
                          name="description"
                          value={description}
                        />
                      </div>
                    </div>
                    {/*<div className="share">
                      <label className="shareOn">Share on*</label>

                      <div
                        onClick={() => handleOptionChange('public')}
                        className={`public ${
                          selectedOption === 'public' ? 'selectClass' : ''
                        }`}
                      >
                        <span className="pic">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.9987 3.33301C10.7987 3.33301 3.33203 10.7997 3.33203 19.9997C3.33203 29.1997 10.7987 36.6663 19.9987 36.6663C29.1987 36.6663 36.6654 29.1997 36.6654 19.9997C36.6654 10.7997 29.1987 3.33301 19.9987 3.33301ZM18.332 33.2163C11.7487 32.3996 6.66536 26.7996 6.66536 19.9996C6.66536 18.9663 6.7987 17.9829 7.01536 17.0163L14.9987 24.9996V26.6663C14.9987 28.4996 16.4987 29.9996 18.332 29.9996V33.2163ZM26.6654 26.6661C28.1654 26.6661 29.3987 27.6327 29.832 28.9827C31.9987 26.6161 33.332 23.4661 33.332 19.9994C33.332 14.4161 29.882 9.63275 24.9987 7.64941V8.33275C24.9987 10.1661 23.4987 11.6661 21.6654 11.6661H18.332V14.9994C18.332 15.9161 17.582 16.6661 16.6654 16.6661H13.332V19.9994H23.332C24.2487 19.9994 24.9987 20.7494 24.9987 21.6661V26.6661H26.6654Z"
                              fill="white"
                            />
                          </svg>
                        </span>

                        <div className="publicLeft">
                          <span>Public</span>
                          <span>Lorem ipsum dolor sit amet consectetur</span>
                        </div>
                      </div>

                      <div
                        onClick={() => handleOptionChange('private')}
                        className={`private ${
                          selectedOption === 'private' ? 'selectPrivate' : ''
                        }`}
                      >
                        <span className="pic">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M28.3346 14.1667H30.0013C31.8346 14.1667 33.3346 15.6667 33.3346 17.5V34.1667C33.3346 36 31.8346 37.5 30.0013 37.5H10.0013C8.16797 37.5 6.66797 36 6.66797 34.1667V17.5C6.66797 15.6667 8.16797 14.1667 10.0013 14.1667H11.668V10.8333C11.668 6.23333 15.4013 2.5 20.0013 2.5C24.6013 2.5 28.3346 6.23333 28.3346 10.8333V14.1667ZM20.0013 5.83333C17.2346 5.83333 15.0013 8.06667 15.0013 10.8333V14.1667H25.0013V10.8333C25.0013 8.06667 22.768 5.83333 20.0013 5.83333ZM11.668 34.1667C10.7513 34.1667 10.0013 33.4167 10.0013 32.5V19.1667C10.0013 18.25 10.7513 17.5 11.668 17.5H28.3346C29.2513 17.5 30.0013 18.25 30.0013 19.1667V32.5C30.0013 33.4167 29.2513 34.1667 28.3346 34.1667H11.668ZM23.3346 25.8333C23.3346 27.6667 21.8346 29.1667 20.0013 29.1667C18.168 29.1667 16.668 27.6667 16.668 25.8333C16.668 24 18.168 22.5 20.0013 22.5C21.8346 22.5 23.3346 24 23.3346 25.8333Z"
                              fill="white"
                            />
                          </svg>
                        </span>

                        <div className="publicLeft">
                          <span>Private Group</span>
                          <span>Lorem ipsum dolor sit amet consectetur</span>
                        </div>
                      </div>
                      </div>*/}
                    <div
                      className="toggle mb-[60px] ml-[154px] mt-[25px] flex cursor-pointer select-none items-center"
                      onClick={() => togglePrivacy()}
                    >
                      <CustomSwitchAddBenefits
                        inputProps={{ 'aria-label': 'controlled Switch' }}
                      />
                      <p className="text-white">Keep private</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="submit">
            <div className="agree">
              <span>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={termsAndConditions}
                      onChange={handleChecked}
                      style={{ color: 'white' }} // You can customize the color here
                    />
                  }
                  label=""
                />
              </span>
              <span className="termAgree">I agree to the</span>{' '}
              <a className="terms">Terms & Privacy Policy</a>
            </div>
            <div className="submitButton flex">
              <div className="saveButton">
                <button
                  className={`save ${isDisabled && 'bg-[#ADB4D2] text-white'}`}
                  type="submit"
                  form="discountForm"
                  disabled={isDisabled}
                >
                  Save and Share
                </button>
              </div>
              <div className="cancelButton">
                <button className="cancel">Cancel</button>
              </div>
            </div>
          </div>
        </Container>
      </Box>
    </div>
  )
}
