import { ClerkLoaded, ClerkLoading } from '@clerk/clerk-react'
import { Outlet, createFileRoute } from '@tanstack/react-router'

import LogoLoading from '@/components/logo-loading'

export const Route = createFileRoute('/_auth-layout')({
  component: AuthLayout
})

function AuthLayout() {
  return (
    <div className='flex min-h-screen items-center justify-center py-8'>
      <ClerkLoading>
        <LogoLoading />
      </ClerkLoading>
      <ClerkLoaded>
        <div className='flex flex-col items-center gap-y-6'>
          <LogoLoading loading={false} />
          <Outlet />
        </div>
      </ClerkLoaded>
    </div>
  )
}
