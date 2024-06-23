// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { Toaster } from '@/components/ui/toaster'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      {/* TODO: View preview test exam in create/update test exam */}
      {/* TODO:REMOVE DEVTOOLS IN PRODUCTION */}
      <TanStackRouterDevtools />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  )
})
