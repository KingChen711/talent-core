import { isBaseError } from '@/lib/utils'
import { TRequestChangeInterviewDate, requestChangeInterviewDate } from '@/lib/validation/wish.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { StatusCodes } from 'http-status-codes'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import useRequestChangeInterviewDate from '@/hooks/wish/use-request-change-interview-date'

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
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Textarea } from '../ui/textarea'
import { toast } from '../ui/use-toast'

type Props = { applicationId: string }

function DialogRequestChangeInterviewDate({ applicationId }: Props) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const { mutate, isPending } = useRequestChangeInterviewDate()

  const form = useForm<TRequestChangeInterviewDate>({
    resolver: zodResolver(requestChangeInterviewDate)
  })

  const onSubmit = async (values: TRequestChangeInterviewDate) => {
    const mutateOptions = {
      onSuccess: () => {
        toast({
          title: `Request change interview date successfully`,
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
            title: `Request change interview date failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })
          return
        }
        toast({
          title: `Request change interview date failure`,
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
        <Button className='flex-1'>Request change interview date</Button>
      </DialogTrigger>
      <DialogContent className='w-[500px] max-w-[96%]'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>Request change interview date</DialogTitle>
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
                  name='method'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormLabel>The method you wish</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className='flex flex-col space-y-1'
                        >
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value='Offline' />
                            </FormControl>
                            <FormLabel className='font-normal'>Offline</FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value='Online' />
                            </FormControl>
                            <FormLabel className='font-normal'>Online</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
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

export default DialogRequestChangeInterviewDate
