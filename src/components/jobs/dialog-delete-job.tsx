import { isBaseError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { StatusCodes } from 'http-status-codes'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import useDeleteJob from '../../hooks/job/use-delete-job'

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

type Props = {
  jobId: string
}

function DialogDeleteJob({ jobId }: Props) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useDeleteJob()

  const handleDeleteJob = async () => {
    mutate(jobId, {
      onSuccess: () => {
        toast({
          title: 'Job has been deleted successfully',
          variant: 'success'
        })
        queryClient.invalidateQueries({ queryKey: ['jobs'] })
        setOpen(false)
      },
      onError: (error) => {
        if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
          toast({
            title: `Job has been delete failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })

          return
        }

        toast({
          title: `Job has been delete failure`,
          description: error.response?.data.message,
          variant: 'danger'
        })
      }
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value || isPending)
      }}
    >
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <img alt='delete' src='/icons/actions/delete.svg' className='size-6 object-cover' />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[350px]'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>Are you sure to delete this job?</DialogTitle>
          <DialogDescription asChild>
            <div className='flex items-center justify-center gap-x-5'>
              <Button disabled={isPending} className='w-[100px]' onClick={handleDeleteJob}>
                <p>Delete</p> {isPending && <Loader2 className='ml-1 size-4 animate-spin' />}
              </Button>
              <DialogClose asChild>
                <Button disabled={isPending} className='w-[100px]' variant='secondary'>
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

export default DialogDeleteJob
