import { cn, isBaseError } from '@/lib/utils'
import { TApproveApplicationSchema, approveApplicationSchema } from '@/lib/validation/application.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { StatusCodes } from 'http-status-codes'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import useApproveApplication from '@/hooks/application/use-approve-application'
import useEditReceiveJobSession from '@/hooks/application/use-edit-receive-job-sesstion'

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

type Props = {
  applicationId: string
  editMode?: boolean
  location?: string
  receiveJobDate?: Date
}

function DialogApproveApplication({ applicationId, editMode = false, location, receiveJobDate }: Props) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const { mutate: create, isPending: creating } = useApproveApplication()
  const { mutate: edit, isPending: editing } = useEditReceiveJobSession()

  const isPending = useMemo(() => creating || editing, [creating, editing])

  const form = useForm<TApproveApplicationSchema>({
    resolver: zodResolver(approveApplicationSchema),
    defaultValues: {
      location,
      receiveJobDate
    }
  })

  const onSubmit = async (values: TApproveApplicationSchema) => {
    const mutateOptions = {
      onSuccess: () => {
        toast({
          title: `Approve application successfully`,
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
            title: `Approve application failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })
          return
        }
        toast({
          title: `Approve application failure`,
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
        <Button className={cn(editMode && 'w-full')}>
          {editMode ? 'Edit Receive Job Session' : 'Approve application'}
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[500px] max-w-[96%]'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>Approve application</DialogTitle>
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
                  name='location'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-start'>
                      <FormLabel>Guide for candidate to take location receive job</FormLabel>
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

export default DialogApproveApplication
