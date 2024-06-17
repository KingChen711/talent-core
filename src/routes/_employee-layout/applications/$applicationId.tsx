import { cn, isBaseError, toDate, toDateTime } from '@/lib/utils'
import { ApplicationStatus } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'
import { MailIcon } from 'lucide-react'

import useApplication from '@/hooks/application/use-application'
import useCompleteInterview from '@/hooks/application/use-complete-interview'
import useRejectApplication from '@/hooks/application/use-reject-application'
import useSaveApplication from '@/hooks/application/use-save-application'

import DialogApproveApplication from '@/components/application/dialog-approve-application'
import DialogScheduleInterview from '@/components/application/dialog-schedule-interview'
import DialogScheduleTestExam from '@/components/application/dialog-schedule-test-exam'
import StagesDetail from '@/components/application/stages-detail'
import ApplicationBadge from '@/components/shared/application-badge'
import NoResult from '@/components/shared/no-result'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'

export const Route = createFileRoute('/_employee-layout/applications/$applicationId')({
  component: ApplicationDetailPage
})

function ApplicationDetailPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { applicationId } = Route.useParams()
  const { data, isLoading } = useApplication(applicationId)

  const { mutate: completeInterview, isPending: completingInterview } = useCompleteInterview()
  const { mutate: saveApplication, isPending: savingApplication } = useSaveApplication()
  const { mutate: rejectApplication, isPending: rejectingApplication } = useRejectApplication()

  // TODO: Skeleton
  if (isLoading) {
    return <div>Skeleton</div>
  }

  if (!data) {
    return <NoResult title='Not found application' description='' />
  }

  const handleCompleteInterview = async () => {
    completeInterview(applicationId, {
      onSuccess: () => {
        toast({
          title: `Complete interview successfully`,
          variant: 'success'
        })
        queryClient.invalidateQueries({
          queryKey: ['applications', applicationId]
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

  const handleSaveApplication = async () => {
    saveApplication(applicationId, {
      onSuccess: () => {
        toast({
          title: `Save application successfully`,
          variant: 'success'
        })
        queryClient.invalidateQueries({
          queryKey: ['applications', applicationId]
        })
      },
      onError: (error) => {
        if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
          toast({
            title: `Save application failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })
          return
        }
        toast({
          title: `Save application failure`,
          description: error.response?.data.message,
          variant: 'danger'
        })
      }
    })
  }

  const handleRejectApplication = async () => {
    rejectApplication(applicationId, {
      onSuccess: () => {
        toast({
          title: `Reject application successfully`,
          variant: 'success'
        })
        queryClient.invalidateQueries({
          queryKey: ['applications', applicationId]
        })
      },
      onError: (error) => {
        if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
          toast({
            title: `Reject application failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })
          return
        }
        toast({
          title: `Reject application failure`,
          description: error.response?.data.message,
          variant: 'danger'
        })
      }
    })
  }

  const applicationStatus: ApplicationStatus = data.status

  return (
    <div className='flex flex-col'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-2xl font-semibold'>Application Detail</div>
        <Button variant='secondary' onClick={() => router.history.back()}>
          <img className='size-5' src='/icons/actions/back.svg' />
          Back
        </Button>
      </div>

      <div className='grid grid-cols-12 gap-x-4'>
        <div className='col-span-9 grid grid-cols-12 gap-4'>
          <div className='col-span-4 flex flex-col items-center justify-center rounded-lg bg-card p-6'>
            <img alt='avatar' src={data.candidate.user.avatar} className='mb-6 size-24 rounded-full' />
            <div className='line-clamp-1 text-lg font-bold'>{data.fullName}</div>
            <div className='line-clamp-1 text-sm text-muted-foreground'>{data.email}</div>
            <div className='mt-4 flex w-full flex-col gap-y-2'>
              <div className='bg-gradient mt-2 flex items-center justify-center rounded-lg p-px'>
                <Button variant='outline' className='group w-full bg-card hover:bg-card'>
                  <MailIcon className='size-5 group-hover:text-[#6e38e0]' />
                  <p className='group-hover:text-gradient ml-1 font-bold'>Send Email</p>
                </Button>
              </div>
            </div>
          </div>
          <div className='col-span-8 grid grid-cols-12 gap-2 rounded-lg bg-card p-6'>
            <div className='col-span-4 flex flex-col gap-y-1'>
              <div className='line-clamp-1 font-bold text-muted-foreground'>Gender</div>
              <div className='line-clamp-1'>{data.gender}</div>
            </div>
            <div className='col-span-4 flex flex-col gap-y-1'>
              <div className='line-clamp-1 font-bold text-muted-foreground'>Born Year</div>
              <div className='line-clamp-1'>{data.bornYear}</div>
            </div>
            <div className='col-span-4 flex flex-col gap-y-1'>
              <div className='line-clamp-1 font-bold text-muted-foreground'>Phone</div>
              <div className='line-clamp-1'>{data.phone}</div>
            </div>
            <div className='col-span-4 flex flex-col gap-y-1'>
              <div className='line-clamp-1 font-bold text-muted-foreground'>Applied Job</div>
              <div className='line-clamp-1'>{data.jobDetail.job.name}</div>
            </div>
            <div className='col-span-4 flex flex-col gap-y-1'>
              <div className='line-clamp-1 font-bold text-muted-foreground'>Applied Date</div>
              <div className='line-clamp-1'>{toDate(data.createdAt)}</div>
            </div>
            <div className='col-span-4 flex flex-col gap-y-1'>
              <div className='line-clamp-1 font-bold text-muted-foreground'>Status</div>
              <div className='line-clamp-1'>
                <ApplicationBadge status={data.status} />
              </div>
            </div>
            <div className='col-span-12 flex flex-col gap-y-1'>
              <div className='line-clamp-1 font-bold text-muted-foreground'>Personal Introductions</div>
              <div className='line-clamp-5'>{data.personalIntroduction}</div>
            </div>
          </div>

          <div className='col-span-12 rounded-lg bg-card p-6'>
            <h3 className='mb-5 text-xl font-semibold'>Stages detail</h3>

            <StagesDetail application={data} />
          </div>
        </div>

        <div className='col-span-3 bg-card'></div>
      </div>

      {!data.testSession && data.status === 'Screening' && (
        <DialogScheduleTestExam applicationId={applicationId} jobCode={data.jobDetail.job.code} />
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

      {data.status === 'Interviewing' && data.interviewSession?.status === 'Completed' && (
        <DialogApproveApplication applicationId={applicationId} />
      )}

      {(data.status === 'Screening' ||
        (data.status === 'Interviewing' && data?.interviewSession?.status === 'Completed')) && (
        <Button onClick={handleSaveApplication} disabled={savingApplication}>
          Save this application
        </Button>
      )}

      {data.status === 'Approve' && (
        <Button onClick={handleRejectApplication} disabled={rejectingApplication}>
          Reject this application
        </Button>
      )}
    </div>
  )
}

export default ApplicationDetailPage
