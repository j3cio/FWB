'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

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
import { Group, UserData } from '@/app/types/types'
import { updateDiscount } from '@/app/api-wrappers/discounts'


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

async function getUserData(userId:string, bearerToken:string, supabaseToken:string) {

  var myHeaders = new Headers()
  myHeaders.append('supabase_jwt', supabaseToken)
  myHeaders.append('Authorization', `Bearer ${bearerToken}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`,
      requestOptions
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return result // This returns the result object
  } catch (error) {
    console.error('Error fetching data: ', error)
    throw error // This re-throws the error to be handled by the caller
  }
}

async function getGroupData(groupId: string, bearerToken:string, supabaseToken:string) {

  if (groupId) {
    var myHeaders = new Headers()
    myHeaders.append('supabase_jwt', supabaseToken)
    myHeaders.append('Authorization', `Bearer ${bearerToken}`)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/groups?group_id=${groupId}`, // add to .env
        requestOptions
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      return result // This returns the result object
    } catch (error) {
      console.error('Error fetching data: ', error)
      throw error // This re-throws the error to be handled by the caller
    }
  } else {
    return {
      success: false,
      data: [
        {
          id: '',
          name: 'No group id',
          discounts: [],
          admins: ['123'],
          public: false,
          users: [],
        },
      ],
    }
  }
}

export default function Intakeform() {
  const { user } = useUser()
  const [discountAmount, setDiscountAmount] = useState<number>(0)
  const [emailAddress, setEmailAddress] = useState('')
  const [company, setCompany] = useState('')
  const [shareableUrl, setShareableUrl] = useState('')
  const [selectedOption, setSelectedOption] = useState<'public' | 'private'>(
    'public'
  )
  const [categories, setCategories] = useState([])
  const [termsAndConditions, setTermsAndConditions] = useState(false)
  const [description, setDescription] = useState('')

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
        formData.append('name', company)
        formData.append('company', company)

        formData.append('categories', `{${categories.join(',')}}`)
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
          const discountObject  = discountData.data[0]
          console.log(discountObject)

          // add new discount to my account
          const patchResponse = await fetch('/api/tempdiscounts', {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              supabase_jwt: supabaseToken,
            },
            body: JSON.stringify(discountObject),
          })

          if (patchResponse.ok) {
            console.log('User discounts updated successfully');

            // get my groups 
            // add new discount to each group
            const userData: UserData = await getUserData(user.id, bearerToken, supabaseToken)
            console.log('userData', userData)
            const groupData: Group[] = await Promise.all(
              userData.users[0].user_groups.map(async (group_id) => {
                // Simulate async operation
                const singleGroupData = await getGroupData(group_id, bearerToken, supabaseToken)
                console.log('ADDBENEFIT SINGLE', singleGroupData)
                

                const groupDataBody = singleGroupData.data[0]
                const discountId = discountData.data[0].id;

                const requestBody = {
                  ...groupDataBody,
                  discountId: discountId // Add discountId as a separate field
                };

                const groupPatchResponse = await fetch('/api/groupdiscount', {
                  method: 'PATCH',
                  headers: {
                    Authorization: `Bearer ${bearerToken}`,
                    supabase_jwt: supabaseToken,
                  },
                  body: JSON.stringify(requestBody)
                });
                
                if (groupPatchResponse.ok) {
                  // Handle success if needed
                  console.log(`Group ${singleGroupData.data[0].id} successfully updated`);
                  return singleGroupData
                
                } else {
                  // Handle error if needed
                  console.error(`Failed to update group ${singleGroupData.data[0].id}`);
                }
              })
            )
            console.log('pushing to profile page');
            router.push('/profile');
          } else {
            const errorData = await patchResponse.json();
            console.error('Error updating user discounts:', errorData);
          }
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

  const isDisabled = !(termsAndConditions && discountAmount !== 0 && company !== '');

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
                <div>
                  <input
                    className="inputCompany"
                    placeholder="Company Name"
                    onChange={(e) => setCompany(e.target.value)}
                    id="companyName"
                    name="companyName"
                    value={company}
                  />
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

                          <div className="percentage flex bg-white h-8 ml-3 items-center rounded px-4 w-[125px]">
                            <input
                              // className="discountName" -- Removed this styling for now, feel free to re-enable after replicating this UI effect if desired
                              className="w-full rounded border-none bg-white outline-none"
                              value={
                                discountAmount ? discountAmount : ''
                              }
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
                      className="toggle flex items-center cursor-pointer select-none mt-[25px] ml-[154px] mb-[60px]"
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
              <a className="terms" href='https://www.makefwb.com/terms-of-service'>Terms & Privacy Policy</a>
            </div>
            <div className="submitButton flex">
              <div className='saveButton'>
              <button className={`save ${isDisabled && 'bg-[#ADB4D2] text-white'}`} type="submit" form="discountForm" disabled={isDisabled}>
                  Save and Share
                </button>
              </div>
              <div className='cancelButton'>
                <button className="cancel">Cancel</button>
              </div>
            </div>
          </div>
        </Container>
      </Box>
    </div>
  )
}
