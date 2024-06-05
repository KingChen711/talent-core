import { Button } from '@/components/ui/button'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_employee-layout/recruitment-drives/$recruitmentDriveCode/jobs/$jobCode/add-candidate'
)({
  component: RecruitmentDriveAddCandidatePage
})

function RecruitmentDriveAddCandidatePage() {
  const { recruitmentDriveCode, jobCode } = Route.useParams()

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='mb-5 text-2xl font-semibold'>Add candidate to {jobCode}</div>
        <Button variant='secondary' asChild>
          <Link to={`/recruitment-drives/${recruitmentDriveCode}/detail`}>Cancel</Link>
        </Button>
      </div>
    </div>
  )
}

export default RecruitmentDriveAddCandidatePage
