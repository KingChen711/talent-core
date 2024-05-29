import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/test-exams/$testExamId/test-sessions')({
  component: TestExamCandidateResultsPage
})

function TestExamCandidateResultsPage() {
  return <div>TestExamCandidateResultsPage</div>
}

export default TestExamCandidateResultsPage
