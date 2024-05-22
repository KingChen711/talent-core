import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth-layout')({
  component: AuthLayout
})

function AuthLayout() {
  return (
    <div className='flex min-h-screen items-center justify-center py-8'>
      <Outlet />
    </div>
  )
}
