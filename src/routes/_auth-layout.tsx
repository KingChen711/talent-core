import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth-layout')({
  component: AuthLayout
})

function AuthLayout() {
  return (
    <div>
      <div>AuthLayout</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
