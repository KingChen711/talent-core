import LeftSideBar from '@/components/left-side-bar'
import NavBar from '@/components/navbar'
import { useAuthContext } from '@/contexts/auth-provider'
import { Outlet, createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout')({
  component: EmployeeLayout
})

function EmployeeLayout() {
  const navigate = useNavigate()
  const { role, isLoadingAuth } = useAuthContext()

  if (isLoadingAuth) return null

  if (role !== 'Employee') {
    if (role === 'Guest') {
      return navigate({
        to: '/sign-in',
        search: {
          redirect: location.href
        }
      })
    } else {
      // Singed with Candidate Role
      // TODO: need to redirect to jobs page
      return navigate({ to: '/' })
    }
  }

  return (
    <main className='relative'>
      <NavBar />
      <div className='flex'>
        <LeftSideBar />
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-20 max-md:pb-14 sm:px-14'>
          <div className='mx-auto w-full max-w-5xl'>
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  )
}
