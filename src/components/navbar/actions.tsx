import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Button } from '../ui/button'
import { Link } from '@tanstack/react-router'
import MobileNavbar from './mobile-nav'

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
      <MobileNavbar />
    </div>
  )
}

export default Actions
