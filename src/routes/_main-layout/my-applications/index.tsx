import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main-layout/my-applications/')({
  component: MyApplications
})

function MyApplications() {
  return <div>MyApplications</div>
}

export default MyApplications
