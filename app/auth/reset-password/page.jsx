
import { Suspense } from 'react'
import ResetPassWordContent from './ResetPasswordContent'

export default function Page() {
  <Suspense fallback={<div className="text-center text-pink-500">Loading...</div>}>
    <ResetPassWordContent />
  </Suspense>
}