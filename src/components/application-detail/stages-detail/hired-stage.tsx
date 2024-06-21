import { isBaseError } from '@/lib/utils'
import { ApplicationStatus, ReceiveJobSession } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { StatusCodes } from 'http-status-codes'

import useConfirmHired from '@/hooks/application/use-confirm-hired'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

import DialogRejectApplication from '../../application/dialog-reject-application'

type Props = {
  jobName: string
  status: ApplicationStatus
  applicationId: string
  receiveJobSession: ReceiveJobSession | null
  isCandidateView: boolean
}

function HiredStage({ status, applicationId, receiveJobSession, isCandidateView }: Props) {
  const queryClient = useQueryClient()
  const { mutate: confirmHired, isPending: confirmingHired } = useConfirmHired()

  const handleConfirmHired = async () => {
    confirmHired(applicationId, {
      onSuccess: () => {
        toast({
          title: `Confirm hired successfully`,
          variant: 'success'
        })
        queryClient.invalidateQueries({
          queryKey: ['applications', applicationId]
        })
      },
      onError: (error) => {
        if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
          toast({
            title: `Confirm hired failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })
          return
        }
        toast({
          title: `Confirm hired failure`,
          description: error.response?.data.message,
          variant: 'danger'
        })
      }
    })
  }

  if (status === 'Saved') return null
  if (status === 'Reject') return null

  return (
    <div className='z-10 flex items-center gap-x-2'>
      <div className='flex items-center gap-x-2'>
        {['Screening', 'Testing', 'Interviewing'].includes(status) ? (
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-border'>5</div>
        ) : status === 'Approve' && !receiveJobSession?.isConfirmed ? (
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-warning'>
            <img alt='progress' src='/icons/hourglass.svg' className='size-5' />
          </div>
        ) : (
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-success'>
            <img alt='progress' src='/icons/check.svg' className='size-5' />
          </div>
        )}

        <div className='flex w-28 shrink-0 flex-col gap-y-1'>
          <div className='line-clamp-1 flex flex-col font-bold leading-none'>Hired</div>
        </div>
      </div>

      {receiveJobSession?.receiveJobDate && (
        <div className='w-full rounded-lg'>
          {!receiveJobSession.isConfirmed && (
            <div className='flex gap-x-4'>
              {!isCandidateView && (
                <Button onClick={handleConfirmHired} disabled={confirmingHired}>
                  Confirm Hired
                </Button>
              )}
              <DialogRejectApplication
                isCandidateView={isCandidateView}
                disable={confirmingHired}
                applicationId={applicationId}
              />
            </div>
          )}
        </div>
      )}

      {/* <p className='font-medium'>{`The candidate has been confirmed to be hired for the ${jobName} position.`}</p> */}
    </div>
  )
}

export default HiredStage
