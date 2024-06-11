import ApplicationForm from '@/components/forms/application.form'
import { Button } from '@/components/ui/button'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_employee-layout/recruitment-drives/$recruitmentDriveCode/jobs/$jobCode/add-candidate'
)({
  component: RecruitmentDriveAddCandidatePage
})

function RecruitmentDriveAddCandidatePage() {
  const router = useRouter()
  const { recruitmentDriveCode, jobCode } = Route.useParams()

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='mb-5 text-2xl font-semibold'>Add candidate to {jobCode}</div>
        <Button variant='secondary' onClick={() => router.history.back()}>
          Cancel
        </Button>
      </div>

      <ApplicationForm jobCode={jobCode} recruitmentDriveCode={recruitmentDriveCode} />
    </div>
  )
}

export default RecruitmentDriveAddCandidatePage
