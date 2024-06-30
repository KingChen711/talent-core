import { useAuthContext } from '@/contexts/auth-provider'
import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'

import EmployeeNavBar from '@/components/employee-navbar'
import LeftSideBar from '@/components/left-side-bar'
import LogoLoading from '@/components/logo-loading'

export const Route = createFileRoute('/_employee-layout')({
  component: EmployeeLayout
})

function EmployeeLayout() {
  const navigate = useNavigate()
  const { role, isLoadingAuth } = useAuthContext()

  if (isLoadingAuth)
    return (
      <div className='flex h-screen items-center justify-center'>
        <LogoLoading />
      </div>
    )

  if (role !== 'Employee') {
    if (role === 'Guest') {
      return navigate({
        to: '/sign-in',
        search: {
          redirect_url: location.href
        }
      })
    } else {
      return navigate({ to: '/opening-jobs' })
    }
  }

  return (
    <main className='relative'>
      <EmployeeNavBar />
      <div className='flex'>
        <LeftSideBar />
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-8'>
          <div className='mx-auto w-full max-w-7xl'>
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  )
}
