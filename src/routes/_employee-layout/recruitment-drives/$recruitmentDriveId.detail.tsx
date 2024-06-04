import NoResult from '@/components/shared/no-result'
import useRecruitmentDriveDetail from '@/hooks/recruitment-drive/use-recruitment-drive-detail'
import { NotFoundRoute, createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/recruitment-drives/$recruitmentDriveId/detail')({
  component: RecruitmentDriveDetailPage
})

function RecruitmentDriveDetailPage() {
  const { recruitmentDriveId } = Route.useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useRecruitmentDriveDetail(recruitmentDriveId)

  if (isLoading) return <div>Skeleton</div>

  if (!isLoading && !data) {
    return (
      <NoResult
        title='No recruitment drive found.'
        description=''
        link='/recruitment-drives'
        linkTitle='Back to list'
      />
    )
  }

  return <div>RecruitmentDriveDetailPage</div>
}

export default RecruitmentDriveDetailPage
