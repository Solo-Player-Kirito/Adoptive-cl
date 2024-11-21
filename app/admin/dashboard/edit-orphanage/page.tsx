import { Suspense } from "react";
import EditOrphanageContent from './EditOrphanageContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditOrphanageContent />
    </Suspense>
  )
}