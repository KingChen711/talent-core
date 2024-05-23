import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Button } from '../ui/button'
import { Link } from '@tanstack/react-router'

function Actions() {
  return (
    <div>
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
    </div>
  )
}

export default Actions
