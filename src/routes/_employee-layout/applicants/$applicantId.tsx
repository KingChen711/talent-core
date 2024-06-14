import DialogScheduleTestExam from '@/components/applicant/dialog-schedule-test-exam'
import NoResult from '@/components/shared/no-result'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import useApplicant from '@/hooks/applicant/use-applicant'
import { toDate } from '@/lib/utils'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/applicants/$applicantId')({
  component: ApplicantDetailPage
})

function ApplicantDetailPage() {
  const router = useRouter()
  const { applicantId } = Route.useParams()
  const { data, isLoading } = useApplicant(applicantId)

  // TODO: Skeleton
  if (isLoading) {
    return <div>Skeleton</div>
  }

  if (!data) {
    return <NoResult title='Not found applicant' description='' />
  }

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='mb-5 text-2xl font-semibold'>Applicant Detail</div>
        <Button variant='secondary' onClick={() => router.history.back()}>
          <img className='size-5' src='/icons/actions/back.svg' />
          Back
        </Button>
      </div>

      <div className='flex flex-col'>
        <div className='flex items-center gap-x-4'>
          <Label>Email:</Label>
          <p>{data!.email}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>Fullname:</Label>
          <p>{data!.fullName}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>bornYear:</Label>
          <p>{data!.bornYear}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>Applied Date:</Label>
          <p>{toDate(data!.createdAt)}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>CV:</Label>
          <p>{data!.cv}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>Gender:</Label>
          <p>{data!.gender}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>phone:</Label>
          <p>{data!.phone}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>personalIntroduction:</Label>
          <p>{data!.personalIntroduction}</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>receiveJobDate:</Label>
          <p></p>
        </div>
        <div className='flex items-center gap-x-4'>
          <Label>Email:</Label>
          <p>{data!.jobDetail.job.name}</p>
        </div>
      </div>

      {data.status === 'Screening' && (
        <DialogScheduleTestExam applicantId={applicantId} jobCode={data.jobDetail.job.code} />
      )}
    </div>
  )
}

export default ApplicantDetailPage
