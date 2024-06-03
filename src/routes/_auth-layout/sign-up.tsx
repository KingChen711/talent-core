import { SignUp } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth-layout/sign-up')({
  component: SingUp
})

function SingUp() {
  return <SignUp fallbackRedirectUrl='/' signInUrl='/sign-in' />
}

export default SingUp
