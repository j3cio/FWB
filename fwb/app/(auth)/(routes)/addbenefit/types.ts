export interface FuzzySearchResponse {
  created_at: string
  description: string
  discounts: string[]
  discounts_updated_at: string
  greatest_discount: number
  id: string
  logo: string | null
  name: string
  public: boolean
  url: string | null
  view_count: number
  views: number
}

export interface BrandFetchSearchResponse {
  brandId: string
  domain: string
  icon: string
  name: string
}
