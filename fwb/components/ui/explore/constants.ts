import { Dispatch, SetStateAction } from 'react'

export enum SortOptionsEnum {
  // MostPopular = 'Most Popular',
  MostRecent = 'Most Recent',
  HighestToLowest = 'Highest to Lowest Discounts',
  LowestToHighest = 'Lowest to Highest Discounts',
}
export const sortOptions = [
  // SortOptionsEnum.MostPopular,
  SortOptionsEnum.MostRecent,
  SortOptionsEnum.HighestToLowest,
  SortOptionsEnum.LowestToHighest,
]

// Temporary hardcoded, this should get pulled from our current user
export const groupLists = ['All', 'Group 1', 'Group 2']

export const filterCategories = [
  'All',
  'Sports',
  'Fashion',
  'Electronic',
  'Health',
  'Home & Kitchen',
  'Computer & Accessories',
  'Beauty & Skincare',
  'Books',
  'Hobbies',
]

export interface FilterOptions {
  sort: string
  privateGroups: string[]
  categories: string[]
}

export interface FilterState {
  activeOptions: FilterOptions
  setActiveOptions: Dispatch<SetStateAction<FilterOptions>>
}
