import { isBaseError, toDateTime } from '@/lib/utils'
import { InterviewSessionWish } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { StatusCodes } from 'http-status-codes'

import useUpdateWish from '@/hooks/wish/use-update-wish'

import { toast } from '@/components/ui/use-toast'

import WishBadge from '../../shared/wish-bade'
import { Button } from '../../ui/button'

type Props = {
  isCandidateView: boolean
  applicationId: string
  interviewSessionWish: InterviewSessionWish
}

function WishChangeInterviewDate({ applicationId, isCandidateView, interviewSessionWish }: Props) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useUpdateWish()

  const handleUpdateWish = (isApprove: boolean) => {
    mutate(
      {
        applicationId,
        data: {
          isApprove,
          type: 'InterviewSessionWish'
        }
      },
      {
        onSuccess: () => {
          toast({
            title: `${isApprove ? 'Approve' : 'Reject'} request change interview date successfully`,
            variant: 'success'
          })
          queryClient.invalidateQueries({
            queryKey: ['applications', applicationId]
          })
        },
        onError: (error: unknown) => {
          if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
            toast({
              title: `${isApprove ? 'Approve' : 'Reject'} request change interview date failure`,
              description: 'Some thing went wrong.',
              variant: 'danger'
            })
            return
          }
          toast({
            title: `${isApprove ? 'Approve' : 'Reject'} request change interview date failure`,
            description: error.response?.data.message,
            variant: 'danger'
          })
        }
      }
    )
  }

  return (
    <div className='flex w-full flex-col gap-y-3 rounded-lg bg-border p-3'>
      <div className='font-bold'>Request Change Interview Date</div>
      <div className='flex flex-col gap-y-1 text-sm font-bold'>
        <p>Wish Date:</p>
        <p className='font-normal'>{toDateTime(interviewSessionWish.wishTime)}</p>
      </div>
      <div className='flex flex-col gap-y-1 text-sm font-bold'>
        <p>Wish method:</p>
        <p className='font-normal'>{interviewSessionWish.method}</p>
      </div>
      <div className='flex flex-col gap-y-1 text-sm font-bold'>
        <p>Reason:</p>
        <p className='font-normal'>{interviewSessionWish.content}</p>
      </div>
      <div className='flex flex-wrap gap-1 text-sm font-bold'>
        <p>Status:</p>
        <WishBadge status={interviewSessionWish.status} />
      </div>

      {!isCandidateView && interviewSessionWish.status === 'Processing' && (
        <div className='mt-1 flex flex-wrap gap-x-2'>
          <Button onClick={() => handleUpdateWish(true)} disabled={isPending} className='flex-1' size='sm'>
            Approve
          </Button>
          <div className='bg-gradient flex flex-1 items-center justify-center rounded-md p-px'>
            <Button
              onClick={() => handleUpdateWish(false)}
              disabled={isPending}
              variant='secondary'
              className='group w-full rounded-md bg-card hover:bg-card'
              size='sm'
            >
              <p className='group-hover:text-gradient'>Reject</p>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WishChangeInterviewDate
