import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/recruitment-drives/$recruitmentDriveId/detail')({
  component: RecruitmentDriveDetailPage
})

function RecruitmentDriveDetailPage() {
  return <div>RecruitmentDriveDetailPage</div>
}

export default RecruitmentDriveDetailPage
