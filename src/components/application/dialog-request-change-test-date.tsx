import { isBaseError } from '@/lib/utils'
import { TRequestChangeTestDate, requestChangeTestDate } from '@/lib/validation/application.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { StatusCodes } from 'http-status-codes'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import useRequestChangeTestDate from '@/hooks/wish/use-request-change-test-date'

import { Button } from '../ui/button'
import { DateTimePicker } from '../ui/date-time-picker'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { toast } from '../ui/use-toast'

type Props = { applicationId: string }

function DialogRequestChangeTestDate({ applicationId }: Props) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const { mutate, isPending } = useRequestChangeTestDate()

  const form = useForm<TRequestChangeTestDate>({
    resolver: zodResolver(requestChangeTestDate)
  })

  const onSubmit = async (values: TRequestChangeTestDate) => {
    const mutateOptions = {
      onSuccess: () => {
        toast({
          title: `Request change test date successfully`,
          variant: 'success'
        })
        queryClient.invalidateQueries({
          queryKey: ['applications', applicationId]
        })
        setOpen(false)
      },
      onError: (error: unknown) => {
        if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
          toast({
            title: `Request change test date failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })
          return
        }
        toast({
          title: `Request change test date failure`,
          description: error.response?.data.message,
          variant: 'danger'
        })
      }
    }

    mutate({ applicationId, data: values }, mutateOptions)
  }

  const handleOpenChange = (value: boolean) => {
    if (isPending) return
    setOpen(value)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className='flex-1'>Request change test date</Button>
      </DialogTrigger>
      <DialogContent className='w-[500px] max-w-[96%]'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>Request change test date</DialogTitle>
          <DialogDescription asChild>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <FormField
                  control={form.control}
                  name='wishDate'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-start'>
                      <FormLabel className='mb-1'>The day you wish</FormLabel>
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
                  name='reason'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-start'>
                      <FormLabel>Reason</FormLabel>
                      <FormControl>
                        <Textarea disabled={isPending} placeholder='Reason...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex justify-end gap-x-4'>
                  <DialogClose asChild>
                    <Button disabled={isPending} variant='secondary' className='float-right'>
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button disabled={isPending} type='submit' className='float-right'>
                    Submit {isPending && <Loader2 className='ml-1 size-4 animate-spin' />}
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

export default DialogRequestChangeTestDate
