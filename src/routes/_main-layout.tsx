import { cn } from '@/lib/utils'
import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'

import MainNavBar from '@/components/main-navbar'

export const Route = createFileRoute('/_main-layout')({
  component: MainLayout
})

function MainLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <main className='relative'>
      <MainNavBar isHome />
      <div className={cn('flex relative bg-cover bg-center bg-no-repeat', isHome && 'bg-[url("/images/banner5.jpg")]')}>
        <div className='absolute inset-0 z-10 bg-background/85' />
        <section className='z-20 flex min-h-screen flex-1 flex-col px-6 pb-6 pt-20 max-md:pb-14 sm:px-14'>
          <div className='mx-auto size-full max-w-6xl'>
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  )
}

export default MainLayout
