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

interface BrandFetchColor {
  hex: string
  type: 'dark' | 'light'
  brightness: number
}

interface BrandFetchIndustry {
  score: number
  id: string
  name: string
  emoji: string
  parent: {
    emoji: string
    id: string
    name: string
    slug: string
  } | null
  slug: string
}

interface BrandFetchCompany {
  employees: number | null
  foundedYear: null | number
  industries: BrandFetchIndustry[]
  kind: string
}

interface BrandFetchImage {
  src: string
  format: string
  size: number
  width: number
}

interface BrandFetchSocialMediaLinks {
  name: string
  url: string
}

interface BrandFetchLogo {
  theme: 'dark' | 'light'
  formats: {
    format: string
    size: number
    src: string
  }[]
  tags: string[]
  type: string
}
export interface BrandFetchRetrieveBrandResponse {
  claimed: boolean
  colors: BrandFetchColor[]
  company: BrandFetchCompany
  description: string
  domain: string
  id: string
  images: BrandFetchImage[]
  isNsfw: boolean
  links: BrandFetchSocialMediaLinks[]
  logos: BrandFetchLogo[]
  longDescription: string
  name: string
  qualityScore: number
}
