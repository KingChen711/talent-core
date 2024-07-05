import { Outlet, createRootRoute } from '@tanstack/react-router'

import { Analytics } from '@/components/dashboard/analytics'
import { Toaster } from '@/components/ui/toaster'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      <Analytics />
    </>
  )
})
