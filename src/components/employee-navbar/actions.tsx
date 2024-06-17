import MobileNavbar from './mobile-nav'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Link } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'

import { ThemeToggle } from '../theme-toggle'
import { Button } from '../ui/button'

function Actions() {
  return (
    <div className='flex items-center gap-x-2'>
      <ClerkLoading>
        <Loader2 className='size-4 animate-spin' />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <Button asChild>
            <Link to='/sign-in'>Login</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Button variant='ghost' className='text-gradient px-2 text-base font-bold' asChild>
            <Link to='/'>Career Site</Link>
          </Button>

          <UserButton />
        </SignedIn>
      </ClerkLoaded>
      <ThemeToggle />
      <MobileNavbar />
    </div>
  )
}

export default Actions
