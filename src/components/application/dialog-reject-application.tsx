import { isBaseError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { StatusCodes } from 'http-status-codes'
import { Loader2 } from 'lucide-react'

import useRejectApplication from '@/hooks/application/use-reject-application'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { toast } from '../ui/use-toast'

type Props = { applicationId: string; disable?: boolean; isCandidateView: boolean }

function DialogRejectApplication({ applicationId, disable, isCandidateView }: Props) {
  const queryClient = useQueryClient()
  const { mutate: rejectApplication, isPending: rejectingApplication } = useRejectApplication()

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='bg-gradient flex items-center justify-center rounded-md p-px'>
          <Button disabled={disable} variant='outline' className='group w-full bg-card hover:bg-card'>
            <p className='group-hover:text-gradient font-bold'>
              {isCandidateView ? 'Reject this job' : 'Reject This Application'}
            </p>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className='w-[500px] max-w-[96%]'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>
            Are you sure to {isCandidateView ? 'reject this job' : 'reject this application'}?
          </DialogTitle>
          <DialogDescription asChild>
            <div className='flex items-center justify-center gap-x-5'>
              <Button disabled={rejectingApplication} className='w-[100px]' onClick={handleRejectApplication}>
                <p>Continue</p> {rejectingApplication && <Loader2 className='ml-1 size-4 animate-spin' />}
              </Button>
              <DialogClose asChild>
                <Button disabled={rejectingApplication} className='w-[100px]' variant='secondary'>
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DialogRejectApplication
