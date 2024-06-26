export interface GroupData {
  sucess: boolean
  data: Group[]
}
export interface Group {
  id: string
  name: string
  discounts: string[]
  admins: string[]
  public: boolean
  users: string[]
  description: string
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
  blocked_users: string[]
  company: string
  id: string
  created_at: string
  user_id: string
  username: string
  email: string[]
  user_discounts: string[]
  user_groups: string[]
  user_messages: string[]
  verified: false
  reported_users: string[]
  profile_picture_url: string
  hasCompletedFRE: boolean[]
}

export interface LoadingSkeletonProps {
  type: 'ProductCard' | 'TitleAndButtons' | 'NavBar' | 'ProductFilters'
  quantity?: number
}
