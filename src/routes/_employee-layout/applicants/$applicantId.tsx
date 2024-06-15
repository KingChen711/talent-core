import DialogApproveApplicant from '@/components/applicant/dialog-approve-applicant'
import DialogScheduleInterview from '@/components/applicant/dialog-schedule-interview'
import DialogScheduleTestExam from '@/components/applicant/dialog-schedule-test-exam'
import NoResult from '@/components/shared/no-result'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import useApplicant from '@/hooks/applicant/use-applicant'
import useCompleteInterview from '@/hooks/applicant/use-complete-interview'
import { isBaseError, toDate, toDateTime } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'

export const Route = createFileRoute('/_employee-layout/applicants/$applicantId')({
  component: ApplicantDetailPage
})

function ApplicantDetailPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { applicantId } = Route.useParams()
  const { data, isLoading } = useApplicant(applicantId)

  const { mutate: completeInterview, isPending: completingInterview } = useCompleteInterview()

  // TODO: Skeleton
  if (isLoading) {
    return <div>Skeleton</div>
  }

  if (!data) {
    return <NoResult title='Not found applicant' description='' />
  }

  const handleCompleteInterview = async () => {
    completeInterview(applicantId, {
      onSuccess: () => {
        toast({
          title: `Complete interview successfully`,
          variant: 'success'
        })
        queryClient.invalidateQueries({
          queryKey: ['applicants', applicantId]
        })
      },
      onError: (error) => {
        if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
          toast({
            title: `Complete interview failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })
          return
        }
        toast({
          title: `Complete interview failure`,
          description: error.response?.data.message,
          variant: 'danger'
        })
      }
    })
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
          <Label>Applied Job:</Label>
          <p>{data!.jobDetail.job.name}</p>
        </div>
      </div>

      {data.testSession && (
        <div className='mt-8'>
          Test Session:
          <div>point: {data.testSession.point || '_'} / 10</div>
          <div>status: {data.testSession.status}</div>
          <div>test date: {toDateTime(data.testSession.testDate)}</div>
        </div>
      )}

      {!data.testSession && data.status === 'Screening' && (
        <DialogScheduleTestExam applicantId={applicantId} jobCode={data.jobDetail.job.code} />
      )}

      {data.interviewSession && (
        <div className='mt-8'>
          Interview Session:
          <div>status: {data.interviewSession.status}</div>
          <div>interview date: {toDateTime(data.interviewSession.interviewDate)}</div>
          <div>location: {data.interviewSession.location}</div>
          {data.interviewSession.status === 'Processing' && (
            <Button onClick={handleCompleteInterview} disabled={completingInterview}>
              Completed the interview
            </Button>
          )}
        </div>
      )}

      {data.testSession?.status === 'Pass' && data.status === 'Testing' && (
        <DialogScheduleInterview applicantId={applicantId} />
      )}

      {data.status === 'Interviewing' && data.interviewSession?.status === 'Completed' && (
        <DialogApproveApplicant applicantId={applicantId} />
      )}
    </div>
  )
}

export default ApplicantDetailPage
