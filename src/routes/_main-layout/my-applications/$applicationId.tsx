import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main-layout/my-applications/$applicationId')({
  component: MyApplicationDetail
})

function MyApplicationDetail() {
  const { applicationId } = Route.useParams()
  return <div>MyApplicationDetail: {applicationId}</div>
}

export default MyApplicationDetail
