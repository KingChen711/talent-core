import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/test-exams/create')({
  component: CreateTestExamPage
})

function CreateTestExamPage() {
  return <div>CreateTestExamPage</div>
}

export default CreateTestExamPage
