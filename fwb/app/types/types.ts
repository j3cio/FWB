export interface GroupData {
  sucess: boolean
  data: Group[]
}
export interface Group {
  id: string
  name: string
  discounts: string[]
  admins: string
  public: boolean
  users: string[]
  description: string
  filePath: string
}
export interface DiscountData {
  created_at: string
  user_id: string
  terms_and_conditions: string
  shareable_url: string
  discount_amount: number
  view_count: number
  share_count: number
  message_count: number
  public: true
  id: string
  logo: string
  name: string
}

export interface UserData {
  success: boolean
  users: User[]
}
;[]

export interface User {
  id: string
  created_at: string
  user_id: string
  username: string
  email: string[]
  company: string
  verified: false
  profile_picture_url: string
  hasCompletedFRE: boolean[]
  //blocked_users: string[]
  //user_discounts: string[]
  //user_groups: string[]
  //user_messages: string[]
  //reported_users: string[]
}

export interface LoadingSkeletonProps {
  type:
    | 'ProductCard'
    | 'TitleAndButtons'
    | 'NavBar'
    | 'ProductFilters'
    | 'GroupCard'
  quantity?: number
}

export type CompanyAndDiscounts = {
  id: number
  name: string
  categories: string[]
  description: string
  logo: string
  url: string
  discounts_updated_at: string
  greatest_discount: number
  discounts: string[]
  views: number
}

export type DetailData = {
  company: CompanyAndDiscounts
  discounts: DiscountDataDetail[]
}

export interface DiscountDataDetail {
  created_at: string
  user_id: string
  terms_and_conditions: string
  shareable_url: string
  discount_amount: number
  view_count: number
  share_count: number
  message_count: number
  public: true
  id: string
  logo: string
  name: string
  user_image: string
  user_username: string
}

export interface UserToDiscounts {
  id: number
  created_at: string
  userId: string
  discountId: string
}
