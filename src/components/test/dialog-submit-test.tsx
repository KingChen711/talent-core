import { UseMutateFunction } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import { SubmitTestType } from '../../hooks/test/use-submit-test'

import { isBaseError } from '../../lib/utils'
import { TAnswersSchema } from '../../lib/validation/test-exam.validation'
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
  mutate: UseMutateFunction<AxiosResponse<any, any>, Error, SubmitTestType, unknown>
  isPending: boolean
  answers: TAnswersSchema | null
  applicationId: string
}

function DialogSubmitTest({ mutate, answers, applicationId, isPending }: Props) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleSubmitTest = async () => {
    if (!answers) return
    mutate(
      { applicationId, data: { answers } },
      {
        onSuccess: () => {
          toast({
            title: `Submit test success`,
            variant: 'success'
          })
          return navigate({
            to: `/my-applications/${applicationId}`
          })
        },
        onError: (error) => {
          if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
            toast({
              title: `Submit test failure`,
              description: 'Some thing went wrong.',
              variant: 'danger'
            })
            return
          }
          toast({
            title: `Submit test failure`,
            description: error.response?.data.message,
            variant: 'danger'
          })
        }
      }
    )
  }

  const handleOpenChange = (value: boolean) => {
    if (isPending) return
    setOpen(value)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button disabled={isPending} className='mx-auto mb-6 mt-8 w-fit'>
          Submit and Finish
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[500px] max-w-[96%]'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>Are you sure to submit test?</DialogTitle>
          <DialogDescription asChild>
            <div className='flex items-center justify-center gap-x-5'>
              <Button className='w-[100px]' onClick={handleSubmitTest}>
                <p>Submit</p> {isPending && <Loader2 className='ml-1 size-4 animate-spin' />}
              </Button>
              <DialogClose asChild>
                <Button onClick={() => setOpen(false)} disabled={isPending} className='w-[100px]' variant='secondary'>
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

export default DialogSubmitTest
