import { Link, createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_main-layout/')({
  component: HomePage
})

function HomePage() {
  return (
    <main className='h-full'>
      <div className='flex h-full flex-col items-center justify-center'>
        <div className='mb-6 max-w-lg text-pretty text-center text-3xl lg:text-5xl'>
          Join <span className='text-gradient font-bold'>Talent Core</span> – Your Future Starts Here
        </div>

        <p className='mb-8 max-w-lg text-pretty text-center text-sm text-muted-foreground lg:text-start lg:text-lg'>
          Discover Your Dream Career with Talent Core! Connect with top employers, unlock exclusive opportunities, and
          take the next step in your professional journey. No fees, just limitless potential.
        </p>

        <Button size='lg' className='text-base' asChild>
          <Link to='/opening-jobs'>View our opening jobs</Link>
        </Button>
      </div>
    </main>
  )
}

export default HomePage
