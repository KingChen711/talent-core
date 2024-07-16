import { isBaseError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { StatusCodes } from 'http-status-codes'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import useToBeEmployee from '@/hooks/user/use-to-be-employee'

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
  userId: string
}

function DialogToBeEmployee({ userId }: Props) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useToBeEmployee()

  const handleDeleteJob = async () => {
    mutate(userId, {
      onSuccess: () => {
        toast({
          title: 'Account has successfully become Employee successfully',
          variant: 'success'
        })
        queryClient.invalidateQueries({ queryKey: ['users'] })
        setOpen(false)
      },
      onError: (error) => {
        if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
          toast({
            title: `Account has successfully become Employee failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })
          return
        }
        toast({
          title: `Account has successfully become Employee failure`,
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
        <div className='flex w-full justify-end'>
          <Button variant='default' size='sm' className='ml-auto'>
            To Be Employee
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className='w-[350px]'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>
            Are you sure to make this account to be employee account?
          </DialogTitle>
          <DialogDescription asChild>
            <div className='flex items-center justify-center gap-x-5'>
              <Button disabled={isPending} className='w-[100px]' onClick={handleDeleteJob}>
                <p>Sure</p> {isPending && <Loader2 className='ml-1 size-4 animate-spin' />}
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

export default DialogToBeEmployee
