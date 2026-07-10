'use client'

import { useState } from 'react'
import StatsStrip from './StatsStrip'
import PortfolioHero from './PortfolioHero'
import PortfolioWork from './PortfolioWork'

const FILTERS = ['All', 'Web', 'Mobile', 'SaaS', 'E-Com', 'Branding'] as const
export type Filter = typeof FILTERS[number]

export { FILTERS }

export default function PortfolioPageClient() {
  const [active, setActive] = useState<Filter>('All')
  return (
    <>
      <PortfolioHero filters={FILTERS} active={active} onFilterChange={setActive} />
      <StatsStrip />
      <PortfolioWork active={active} />
    </>
  )
}
