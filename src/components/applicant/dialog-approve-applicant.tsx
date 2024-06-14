import { StatusCodes } from 'http-status-codes'
import { isBaseError } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useApproveApplicant from '@/hooks/applicant/use-approve-applicant'
import { useQueryClient } from '@tanstack/react-query'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { TApproveApplicantSchema, approveApplicantSchema } from '@/lib/validation/applicant.validation'
import { DateTimePicker } from '@/components/ui/date-time-picker'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Textarea } from '../ui/textarea'

type Props = {
  applicantId: string
}

function DialogApproveApplicant({ applicantId }: Props) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const { mutate, isPending } = useApproveApplicant()

  const form = useForm<TApproveApplicantSchema>({
    resolver: zodResolver(approveApplicantSchema)
  })

  const onSubmit = async (values: TApproveApplicantSchema) => {
    mutate(
      { applicantId, data: values },
      {
        onSuccess: () => {
          toast({
            title: `Approve applicant successfully`,
            variant: 'success'
          })
          queryClient.invalidateQueries({
            queryKey: ['applicants', applicantId]
          })
          setOpen(false)
        },
        onError: (error) => {
          if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
            toast({
              title: `Approve applicant failure`,
              description: 'Some thing went wrong.',
              variant: 'danger'
            })
            return
          }
          toast({
            title: `Approve applicant failure`,
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
        <Button>Approve applicant</Button>
      </DialogTrigger>
      <DialogContent className='w-[500px] max-w-[96%]'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>Approve applicant</DialogTitle>
          <DialogDescription asChild>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='receiveJobDate'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-start'>
                      <FormLabel className='mb-1'>Receive job date</FormLabel>
                      <DateTimePicker
                        isDisabled={isPending}
                        jsDate={field.value}
                        onJsDateChange={field.onChange}
                        granularity='minute'
                        hourCycle={24}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='guide'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-start'>
                      <FormLabel>Guide for candidate to receive job</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPending}
                          placeholder='Example: Room Boston, Talent Core company...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex justify-end gap-x-4'>
                  <DialogClose asChild>
                    <Button disabled={isPending} variant='secondary' className='float-right mt-4'>
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button disabled={isPending} type='submit' className='float-right mt-4'>
                    Approve {isPending && <Loader2 className='ml-1 size-4 animate-spin' />}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DialogApproveApplicant
