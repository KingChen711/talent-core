import { cn, isBaseError } from '@/lib/utils'
import { TScheduleInterviewSchema, scheduleInterviewSchema } from '@/lib/validation/application.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Method } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { StatusCodes } from 'http-status-codes'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import useEditInterviewSession from '@/hooks/application/use-edit-interview-session'
import useScheduleInterview from '@/hooks/application/use-schedule-interview'

import { Button } from '@/components/ui/button'
import { DateTimePicker } from '@/components/ui/date-time-picker'
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
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

type Props = {
  applicationId: string
  editMode?: boolean
  interviewDate?: Date
  location?: string
  method?: Method
}

function DialogScheduleInterview({ applicationId, editMode, interviewDate, location, method }: Props) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const { mutate: create, isPending: creating } = useScheduleInterview()
  const { mutate: edit, isPending: editing } = useEditInterviewSession()

  const isPending = useMemo(() => creating || editing, [creating, editing])

  const form = useForm<TScheduleInterviewSchema>({
    resolver: zodResolver(scheduleInterviewSchema),
    defaultValues: {
      interviewDate,
      location,
      method
    }
  })

  const onSubmit = async (values: TScheduleInterviewSchema) => {
    const mutateOptions = {
      onSuccess: () => {
        toast({
          title: `Schedule interview successfully`,
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
            title: `Schedule interview failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })
          return
        }
        toast({
          title: `Schedule interview failure`,
          description: error.response?.data.message,
          variant: 'danger'
        })
      }
    }

    if (editMode) {
      edit({ applicationId, data: values }, mutateOptions)
    } else {
      create({ applicationId, data: values }, mutateOptions)
    }
  }

  const handleOpenChange = (value: boolean) => {
    if (isPending) return
    setOpen(value)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={cn(editMode && 'flex-1')}>
          {editMode ? 'Edit Interview Session' : 'Schedule interview'}
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[500px] max-w-[96%]'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>Schedule Interview</DialogTitle>
          <DialogDescription asChild>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <FormField
                  control={form.control}
                  name='interviewDate'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-start'>
                      <FormLabel className='mb-1'>Interview date</FormLabel>
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
                      <FormLabel>Interview method</FormLabel>
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
                  name='location'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-start'>
                      <FormLabel>Guide for candidate to take interview location</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPending}
                          placeholder={
                            'Ex: Room Boston, Talent Core company \nEx: https://meet.google.com/tbx-ggqt-iei'
                          }
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
                    Schedule {isPending && <Loader2 className='ml-1 size-4 animate-spin' />}
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

export default DialogScheduleInterview
