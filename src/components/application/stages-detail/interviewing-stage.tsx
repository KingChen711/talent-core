import { isBaseError, toDate, toDateTime } from '@/lib/utils'
import { ApplicationStatus, InterviewSession, TestSessionStatus } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { StatusCodes } from 'http-status-codes'

import useCompleteInterview from '@/hooks/application/use-complete-interview'

import InterviewSessionBadge from '@/components/shared/interview-session-badge'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

import DialogScheduleInterview from '../dialog-schedule-interview'

type Props = {
  status: ApplicationStatus
  applicationId: string
  testSessionStatus: TestSessionStatus | undefined
  interviewSession: InterviewSession | null
}

function InterviewingStage({ status, applicationId, testSessionStatus, interviewSession }: Props) {
  const queryClient = useQueryClient()

  const { mutate: completeInterview, isPending: completingInterview } = useCompleteInterview()

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

  return (
    <div className='z-10 flex items-center gap-x-2'>
      <div className='flex items-center gap-x-2'>
        {['Screening', 'Testing'].includes(status) ? (
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-border'>3</div>
        ) : status === 'Interviewing' ? (
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-warning'>
            <img alt='progress' src='/icons/hourglass.svg' className='size-5' />
          </div>
        ) : (
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-success'>
            <img alt='progress' src='/icons/check.svg' className='size-5' />
          </div>
        )}

        <div className='flex w-28 shrink-0 flex-col gap-y-1'>
          <div className='line-clamp-1 flex flex-col font-bold leading-none'>Interviewing</div>
          {interviewSession?.interviewDate && (
            <div className='line-clamp-1 text-xs leading-none text-muted-foreground'>
              {toDate(interviewSession.interviewDate)}
            </div>
          )}
        </div>
      </div>

      {testSessionStatus === 'Pass' && status === 'Testing' && (
        <DialogScheduleInterview applicationId={applicationId} />
      )}

      {interviewSession?.interviewDate && (
        <div className='grid w-full grid-cols-12 gap-x-4 rounded-lg bg-border p-4 text-sm'>
          <div className='col-span-6'>
            <div className='col-span-6 space-y-2'>
              <p className='font-bold'>
                Location: <span className='font-normal'>{interviewSession.location}</span>
              </p>
              <div className='flex items-center gap-x-2'>
                <p className='font-bold'>Method: </p>
                <span className='font-normal'>{interviewSession.method}</span>
              </div>
            </div>
          </div>

          <div className='col-span-6 space-y-2'>
            <p className='font-bold'>
              Interview Date: <span className='font-normal'>{toDateTime(interviewSession.interviewDate)}</span>
            </p>
            <div className='flex items-center gap-x-2'>
              <p className='font-bold'>Status: </p>
              <InterviewSessionBadge status={interviewSession.status} />
            </div>
          </div>

          {interviewSession.status === 'Processing' && (
            <div className='col-span-12 mt-4'>
              <Button className='w-full' onClick={handleCompleteInterview} disabled={completingInterview}>
                Completed the interview
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default InterviewingStage
