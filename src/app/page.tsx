'use client'

import * as React from 'react'

import BrandVerification from '@/features/trademark-similarity/brand-verification'

export default function DashboardPage() {
   return (
      <React.Suspense>
         <BrandVerification />
      </React.Suspense>
   )
}
