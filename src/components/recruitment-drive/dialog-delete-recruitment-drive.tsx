import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import useDeleteRecruitmentDrive from '../../hooks/recruitment-drive/use-delete-recruitment-drive'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from '../ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { isBaseError } from '@/lib/utils'
import { StatusCodes } from 'http-status-codes'

type Props = {
  recruitmentDriveId: string
}

function DialogDeleteRecruitmentDrive({ recruitmentDriveId }: Props) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useDeleteRecruitmentDrive()

  const handleDeleteRecruitmentDrive = async () => {
    mutate(recruitmentDriveId, {
      onSuccess: () => {
        toast({
          title: 'RecruitmentDrive has been deleted successfully',
          variant: 'success'
        })
        queryClient.invalidateQueries({ queryKey: ['recruitment-drives'] })
        setOpen(false)
      },
      onError: (error) => {
        if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
          toast({
            title: `Recruitment drive has been delete failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })

          return
        }

        toast({
          title: `Recruitment drive has been delete failure`,
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
      <DialogContent className='w-[450px]'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>Are you sure to delete this recruitment drive?</DialogTitle>
          <DialogDescription asChild>
            <div className='flex items-center justify-center gap-x-5'>
              <Button disabled={isPending} className='w-[100px]' onClick={handleDeleteRecruitmentDrive}>
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

export default DialogDeleteRecruitmentDrive
