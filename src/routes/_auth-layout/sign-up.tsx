import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth-layout/sign-up')({
  component: SingUp
})

function SingUp() {
  return <div>SingUp</div>
}

export default SingUp
