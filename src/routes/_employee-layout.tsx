import LeftSideBar from '@/components/left-side-bar'
import NavBar from '@/components/navbar'
import { useAuthContext } from '@/contexts/auth-provider'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout')({
  component: EmployeeLayout
})

function EmployeeLayout() {
  const { role } = useAuthContext()

  if (role !== 'Employee') {
    if (role === 'Guest') {
      throw redirect({ to: '/sign-in' })
    }

    // Singed with Candidate Role
    // TODO: need to redirect to jobs page
    throw redirect({ to: '/' })
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
