import { toDate } from '@/lib/utils'
import { ApplicationStatus, InterviewSession, TestSessionStatus } from '@prisma/client'

import DialogScheduleInterview from '../dialog-schedule-interview'

type Props = {
  status: ApplicationStatus
  applicationId: string
  testSessionStatus: TestSessionStatus | undefined
}

function ApproveStage({ status, applicationId, testSessionStatus }: Props) {
  return (
    <div className='z-10 flex items-center gap-x-2'>
      <div className='flex items-center gap-x-2'>
        {['Screening', 'Testing', 'Interviewing'].includes(status) ? (
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-border'>4</div>
        ) : status === 'Approve' ? (
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-warning'>
            <img alt='progress' src='/icons/hourglass.svg' className='size-5' />
          </div>
        ) : (
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-success'>
            <img alt='progress' src='/icons/check.svg' className='size-5' />
          </div>
        )}

        <div className='flex w-28 shrink-0 flex-col gap-y-1'>
          <div className='line-clamp-1 flex flex-col font-bold leading-none'>Approve</div>
        </div>
      </div>
    </div>
  )
}

export default ApproveStage
