import MobileNavbar from './mobile-nav'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Link } from '@tanstack/react-router'

import { ThemeToggle } from '../theme-toggle'
import { Button } from '../ui/button'

// TODO: Loading clerk
function Actions() {
  return (
    <div className='flex items-center gap-x-4'>
      <ClerkLoading>Loading clerk...</ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <Button asChild>
            <Link to='/sign-in'>Login</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </ClerkLoaded>
      <ThemeToggle />
      <MobileNavbar />
    </div>
  )
}

export default Actions
