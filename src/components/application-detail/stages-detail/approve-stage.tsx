import { toDate, toDateTime } from '@/lib/utils'
import { ApplicationStatus, InterviewStatus, ReceiveJobSession, ReceiveJobWish } from '@prisma/client'

import DialogRequestChangeReceiveJobDate from '@/components/wish/dialog-request-change-receive-job-date'

import DialogApproveApplication from '../../application/dialog-approve-application'
import DialogSaveApplication from '../../application/dialog-save-application'

type Props = {
  status: ApplicationStatus
  applicationId: string
  receiveJobSession: (ReceiveJobSession & { receiveJobWish: ReceiveJobWish | null }) | null
  interviewSessionStatus: InterviewStatus | undefined
  isCandidateView: boolean
}

function ApproveStage({ status, applicationId, receiveJobSession, interviewSessionStatus, isCandidateView }: Props) {
  if (status === 'Saved') return null

  return (
    <div className='z-10 flex items-center gap-x-2'>
      <div className='flex items-center gap-x-2'>
        {['Screening', 'Testing', 'Interviewing'].includes(status) ? (
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-border'>4</div>
        ) : (
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-success'>
            <img alt='progress' src='/icons/check.svg' className='size-5' />
          </div>
        )}

        <div className='flex w-28 shrink-0 flex-col gap-y-1'>
          <div className='line-clamp-1 flex flex-col font-bold leading-none'>Approve</div>
          {receiveJobSession?.receiveJobDate && (
            <div className='line-clamp-1 text-xs leading-none text-muted-foreground'>
              {toDate(receiveJobSession.receiveJobDate)}
            </div>
          )}
        </div>
      </div>

      {!isCandidateView && status === 'Interviewing' && interviewSessionStatus === 'Completed' && (
        <div className='flex gap-x-4'>
          <DialogApproveApplication applicationId={applicationId} />
          <DialogSaveApplication applicationId={applicationId} />
        </div>
      )}

      {receiveJobSession?.receiveJobDate && (
        <div className='grid w-full grid-cols-12 gap-x-4 rounded-lg bg-border p-4 text-sm'>
          <div className='col-span-6'>
            <div className='col-span-6 space-y-2'>
              <p className='font-bold'>
                Location: <span className='font-normal'>{receiveJobSession.location}</span>
              </p>
            </div>
          </div>

          <div className='col-span-6 space-y-2'>
            <p className='font-bold'>
              Receive Job Date: <span className='font-normal'>{toDateTime(receiveJobSession.receiveJobDate)}</span>
            </p>
          </div>

          {!isCandidateView && !receiveJobSession.isConfirmed && (
            <div className='col-span-12 mt-4'>
              <DialogApproveApplication
                applicationId={applicationId}
                editMode
                location={receiveJobSession.location}
                receiveJobDate={new Date(receiveJobSession.receiveJobDate)}
              />
            </div>
          )}

          {isCandidateView && !receiveJobSession.isConfirmed && !receiveJobSession.receiveJobWish && (
            <div className='col-span-12 mt-4 flex flex-wrap gap-4'>
              <DialogRequestChangeReceiveJobDate applicationId={applicationId} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ApproveStage
