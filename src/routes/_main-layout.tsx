import { Outlet, createFileRoute } from '@tanstack/react-router'

import NavBar from '@/components/navbar'

export const Route = createFileRoute('/_main-layout')({
  component: MainLayout
})

function MainLayout() {
  return (
    <main className='relative'>
      <NavBar />
      <div className='flex'>
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-20 max-md:pb-14 sm:px-14'>
          <div className='mx-auto w-full max-w-5xl'>
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  )
}

export default MainLayout
