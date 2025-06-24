'use client'

import { LoaderCircle } from '@/components/animate-ui/icons/loader-circle'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'

export default function Loading() {
  return (
    <div className="flex items-center justify-center  ">
      <AnimateIcon animate>
        <div>
          <LoaderCircle size={100} color="primary" />
        </div>
      </AnimateIcon>
    </div>
  )
}
