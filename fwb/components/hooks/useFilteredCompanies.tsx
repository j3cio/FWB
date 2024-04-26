import { useEffect, useRef, useState } from 'react'
import { FilterOptions, SortOptionsEnum } from '../ui/explore/constants'
import { CompanyAndDiscounts } from '@/app/types/types'

const useFilteredCompanies = (
  activeOptions: FilterOptions,
  companies: CompanyAndDiscounts[],
  initialCompanies: CompanyAndDiscounts[]
) => {
  const [filteredCompanies, setFilteredCompanies] = useState(companies)

  // TODO: fetchCompanies AUDIT. CHECK HOW WE'RE GETTING OUR DISCOUINTS INFO AND ADD ONTO IT
  const filterByCategory = (companies: CompanyAndDiscounts[]) => {
    if (activeOptions.categories.length) {
      return companies.filter(
        (company) =>
          activeOptions.categories.some((category) =>
            company.includes(category)
          ) // change to company.categories.includes after i change the way our data looks. Im thinking it should look something like this:
        // ==========================================================
        /* interface Company {
            companyId: string;
            companyName: string;
            categories: string[]        
      }


       */
      )
    }
    return companies
  }

  // Possibly rename this to show that instead of filtering out, we're allowing highlighted group to be added.
  const filterByGroup = (companies: CompanyAndDiscounts[]) => {
    if (activeOptions.privateGroups.length) {
      return companies.filter(
        (company) =>
          activeOptions.privateGroups.some((group) => company.includes(group)) // we actually won't check our company directly here--we should check on our user object to see what privateGroups our user belongs to. I'm thinking something like this:
        // ====================================================
        /*
        user.privateGroups: ["companyIdOne", "companyIdTwo", ...]

        if one of our privateGroups are chosen, we want to include any discounts tghat match the rest of our criteria from that privateGroup. So we'd want to query the private group, get the discounts, then add them to our companies list. 
      */
      )
    }
    return companies
  }

  const sortCompanies = (companies: CompanyAndDiscounts[]) => {
    switch (activeOptions.sort) {
      case SortOptionsEnum.MostPopular:
        return companies.sort((a, b) => b.views - a.views)

      case SortOptionsEnum.MostRecent:
        return companies.sort(
          (a, b) =>
            new Date(b.discounts_updated_at).getTime() -
            new Date(a.discounts_updated_at).getTime()
        )

      case SortOptionsEnum.HighestToLowest:
        return companies.sort(
          (a, b) => b.greatest_discount - a.greatest_discount
        )

      case SortOptionsEnum.LowestToHighest:
        return companies.sort(
          (a, b) => a.greatest_discount - b.greatest_discount
        )

      default:
        return companies.sort((a, b) => a.name.localeCompare(b.name))
    }
  }

  let filtered: CompanyAndDiscounts[] = []
  //   // let filtered = filterByCategory(companies)
  //   // filtered = filterByGroup(filtered)
  //   // filtered = sortCompanies(filtered)
  filtered = sortCompanies(companies)

  return filtered
}

export default useFilteredCompanies
