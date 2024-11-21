
import { Suspense } from 'react'
import ViewScheulesContent from './ViewSchedulesContent'

export default function Page() {
  <Suspense fallback={<div className="text-center text-pink-500">Loading...</div>}>
    <ViewScheulesContent />
  </Suspense>
}