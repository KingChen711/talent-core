import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/test-exams/$testExamId/add-jobs')({
  component: TestExamAddJobPage
})

function TestExamAddJobPage() {
  return <div>TestExamAddJobPage</div>
}

export default TestExamAddJobPage
