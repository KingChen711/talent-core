import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth-layout/sign-in')({
  component: SingIn
})

function SingIn() {
  return <div>SingIn</div>
}

export default SingIn
