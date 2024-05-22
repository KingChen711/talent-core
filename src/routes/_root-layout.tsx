import NavBar from '@/components/navbar'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_root-layout')({
  component: RootLayout
})

function RootLayout() {
  return (
    <main className='relative'>
      <NavBar />
      <div className='flex'>
        {/* <Suspense fallback={<SideBarSkeleton />}>
            <SideBar />
          </Suspense> */}
        <section className='flex-1 pt-20'>
          <Outlet />
        </section>
      </div>
    </main>
  )
}
