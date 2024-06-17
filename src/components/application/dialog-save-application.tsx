import { isBaseError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { StatusCodes } from 'http-status-codes'
import { Loader2 } from 'lucide-react'

import useSaveApplication from '@/hooks/application/use-save-application'

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

type Props = { applicationId: string }

function DialogSaveApplication({ applicationId }: Props) {
  const queryClient = useQueryClient()

  const { mutate: saveApplication, isPending: savingApplication } = useSaveApplication()

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='bg-gradient flex items-center justify-center rounded-md p-px'>
          <Button variant='outline' className='group w-full bg-card hover:bg-card'>
            <p className='group-hover:text-gradient ml-1 font-bold'>Save This Application</p>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className='w-[500px] max-w-[96%]'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>Are you sure to save this application?</DialogTitle>
          <DialogDescription asChild>
            <div className='flex items-center justify-center gap-x-5'>
              <Button disabled={savingApplication} className='w-[100px]' onClick={handleSaveApplication}>
                <p>Continue</p> {savingApplication && <Loader2 className='ml-1 size-4 animate-spin' />}
              </Button>
              <DialogClose asChild>
                <Button disabled={savingApplication} className='w-[100px]' variant='secondary'>
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

export default DialogSaveApplication
