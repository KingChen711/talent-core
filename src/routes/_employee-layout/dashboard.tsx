import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/dashboard')({
  component: DashboardPage
})

function DashboardPage() {
  return (
    <div className='p-2'>
      <h3 className='text-gradient font-bold'>Dashboard</h3>
    </div>
  )
}
