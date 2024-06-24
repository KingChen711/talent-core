import { Outlet, createRootRoute } from '@tanstack/react-router'

import { Toaster } from '@/components/ui/toaster'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  )
})
