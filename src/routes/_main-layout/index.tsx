import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_main-layout/')({
  component: HomePage
})

function HomePage() {
  return (
    <main className='grid min-h-[calc(100vh-104px)] grid-cols-12'>
      <div className='col-span-12 flex flex-col items-center justify-center lg:col-span-6 lg:items-start'>
        <div className='mb-6 max-w-lg text-pretty text-center text-3xl lg:text-start lg:text-5xl'>
          Join <span className='text-gradient font-bold'>Talent Core</span> – Your Future Starts Here
        </div>

        <p className='mb-8 max-w-lg text-pretty text-center text-sm text-muted-foreground lg:text-start lg:text-lg'>
          Discover Your Dream Career with Talent Core! Connect with top employers, unlock exclusive opportunities, and
          take the next step in your professional journey. No fees, just limitless potential.
        </p>

        <Button size='lg' className='text-base'>
          View our opening jobs
        </Button>
      </div>

      <div className='col-span-12 flex items-center justify-center p-6 lg:col-span-6'>
        <div className='relative flex aspect-square w-full items-center justify-center'>
          <img src='/images/banner.png' className='size-[95%]' alt='banner' />
        </div>
      </div>
    </main>
  )
}

export default HomePage
