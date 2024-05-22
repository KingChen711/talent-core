import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'

function NavBar() {
  return (
    <div>
      <ClerkLoading>Loading clerk...</ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <Button asChild className='bg-gradient'>
            <Link to='/sign-in'>Login</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </ClerkLoaded>
    </div>
  )
}

export default NavBar
