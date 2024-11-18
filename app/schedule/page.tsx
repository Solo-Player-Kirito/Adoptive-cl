'use client'

import { Suspense } from 'react'
import OrphanageBookingContent from './OrphanageBookingContent'

export default function OrphanageBookingPage() {
  return (
    <Suspense fallback={<div className="text-center text-pink-500">Loading...</div>}>
      <OrphanageBookingContent />
    </Suspense>
  )
}
