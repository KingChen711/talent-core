import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/test-exams/$testExamId/edit')({
  component: EditTestExamPage
})

function EditTestExamPage() {
  return <div>EditTestExamPage</div>
}

export default EditTestExamPage
