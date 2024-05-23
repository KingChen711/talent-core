import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {/* TODO:REMOVE DEVTOOLS IN PRODUCTION */}
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
})
