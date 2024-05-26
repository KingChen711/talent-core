import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/jobs/$jobId/edit')({
  component: EditJobPage
})

function EditJobPage() {
  return <div>EditJobPage</div>
}

export default EditJobPage
