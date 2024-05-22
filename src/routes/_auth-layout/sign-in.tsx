import { SignIn } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth-layout/sign-in')({
  component: SingIn
})

function SingIn() {
  return <SignIn forceRedirectUrl='/' signUpUrl='/sign-up' />
}

export default SingIn
