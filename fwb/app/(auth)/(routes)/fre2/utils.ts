import UpdateUser from '@/components/hooks/updateUser'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export const handleDiscountSubmit = async (
  e: any,
  formData: any,
  bearerToken: string,
  supabaseToken: string
) => {
  e.preventDefault()

  try {
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
      return discountId
    } else {
      const errorData = await response.json()
      console.error('Error adding discount:', errorData)
    }
  } catch (error) {
    console.error('Error using discount API:', error)
  }
}

export const updateUser = async (router: AppRouterInstance) => {
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

export const insertToUserDiscountTable = async (
  discount_id: string,
  user_id: string,
  supabaseToken: string
) => {
  var myHeaders = new Headers()
  myHeaders.append('supabase_jwt', supabaseToken)

  const formData = new FormData()
  formData.append('discount_id', discount_id)
  formData.append('user_id', user_id)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
  }

  try {
    await fetch('/api/userToDiscount', requestOptions)
  } catch (error) {
    console.error(error)
  }
}

export const addDiscountToUser = async (
  discountId: string,
  bearerToken: string,
  supabaseToken: string
) => {
  try {
    await fetch('/api/discounts', {
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

export const handleCategoryChange = (
  selectedCategories: string[],
  allCategories: string[],
  setCategories: (categories: string[]) => void
) => {
  if (selectedCategories.includes('All')) {
    setCategories(allCategories)
  } else {
    setCategories(selectedCategories)
  }
}
