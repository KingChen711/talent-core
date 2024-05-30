import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/jobs/$jobId/test-exams')({
  component: JobAddTestExamsPage
})

function JobAddTestExamsPage() {
  return <div>JobAddTestExamsPage</div>
}

export default JobAddTestExamsPage
