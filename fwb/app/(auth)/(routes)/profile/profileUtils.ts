import { TestDiscountData } from '@/app/types/types'
import { createClient } from '@/supabase.server'

export async function getUser(userId: string) {
  if (!userId) {
    throw new Error('UserId not found')
  }

  try {
    const supabase = await createClient()

    let { data: users, error } = await supabase
      .from('test_users')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      throw new Error(`HTTP error! ${error}`)
    }

    if (!users || users === null) {
      console.error('User not found')
    }

    if (users) {
      return users[0]
    }
    console.error('Error fetching data: ', error)
    throw error // This re-throws the error to be handled by the caller
  } catch (error) {
    console.error('Error fetching data: ', error)
    throw error
  }
}

export async function getUserDiscounts(userId: string) {
  const supabase = await createClient()

  if (!userId) {
    throw new Error('UserId not found')
  }

  let { data: discountIds, error } = await supabase
    .from('UserToDiscounts')
    .select('discount_id')
    .eq('user_id', userId)

  if (error) {
    console.error(error)
    throw new Error('Could not retrieve discountIds')
  }

  if (!discountIds || discountIds === null) {
    console.error('User not found')
  }

  if (discountIds) {
    const discountIdArray = discountIds.map((discount) => discount.discount_id)

    const { data: discounts, error: discountsError } = await supabase
      .from('test_discounts')
      .select('*')
      .in('id', discountIdArray)

    if (discountsError) {
      throw new Error('Failed to fetch discounts')
    }

    return discounts as TestDiscountData[]
  }

  try {
  } catch (error) {
    console.error('Error fetching data: ', error)
    throw error
  }
}
