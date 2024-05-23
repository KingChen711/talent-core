import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthContextType } from '@/contexts/auth-provider'

interface RouterContext {
  authData: AuthContextType
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      {/* TODO:REMOVE DEVTOOLS IN PRODUCTION */}
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
})
