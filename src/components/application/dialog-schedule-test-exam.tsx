import { cn, isBaseError } from '@/lib/utils'
import { TScheduleTestExamSchema, scheduleTestExamSchema } from '@/lib/validation/application.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { StatusCodes } from 'http-status-codes'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import useEditTestSession from '@/hooks/application/use-edit-test-session'
import useScheduleTestExam from '@/hooks/application/use-schedule-test-exam'
import useJobTestExams from '@/hooks/job/use-job-test-exams'

import { Badge } from '@/components/ui/badge'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'

type Props = {
  applicationId: string
  jobCode: string
  editMode?: boolean
  testDate?: Date
  testExamCode?: string
}

function DialogScheduleTestExam({ applicationId, jobCode, editMode = false, testDate, testExamCode }: Props) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const { data: testExams, isLoading: isLoadingTestExams } = useJobTestExams(jobCode)

  const { mutate: create, isPending: creating } = useScheduleTestExam()
  const { mutate: edit, isPending: editing } = useEditTestSession()

  const isPending = useMemo(() => creating || editing, [creating, editing])

  const form = useForm<TScheduleTestExamSchema>({
    resolver: zodResolver(scheduleTestExamSchema),
    defaultValues: {
      testDate,
      testExamCode
    }
  })

  const onSubmit = async (values: TScheduleTestExamSchema) => {
    const mutateOptions = {
      onSuccess: () => {
        toast({
          title: `Schedule test exam successfully`,
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
            title: `Schedule test exam failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })
          return
        }
        toast({
          title: `Schedule test exam failure`,
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
        <Button className={cn('w-44', editMode && 'w-full')}>
          {editMode ? 'Edit Test Session' : 'Schedule Testing'}
        </Button>
      </DialogTrigger>
      <DialogContent className='w-96'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>Schedule Testing</DialogTitle>
          <DialogDescription asChild>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='testDate'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-start'>
                      <FormLabel>Test date</FormLabel>
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
                  name='testExamCode'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-start border-red-500'>
                      <FormLabel>Test exam (select one)</FormLabel>

                      {isLoadingTestExams ? (
                        <div className='max-h-[45dvh] w-full space-y-4 overflow-y-auto'>
                          {Array(3)
                            .fill(null)
                            .map((_, i) => {
                              return <Skeleton className='h-44 w-full' key={i} />
                            })}
                        </div>
                      ) : (
                        <FormControl>
                          <RadioGroup
                            disabled={isPending}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className='flex w-full flex-col space-y-1'
                          >
                            <div className='max-h-[45dvh] w-full space-y-4 overflow-y-auto'>
                              {testExams?.map((test, i) => {
                                return (
                                  <FormItem key={i} className='flex w-full items-center space-x-3 space-y-0'>
                                    <label className='w-full font-normal'>
                                      <>
                                        <FormControl>
                                          <RadioGroupItem disabled={isPending} className='hidden' value={test.code} />
                                        </FormControl>
                                        <div
                                          className={cn(
                                            'flex h-44 w-full items-center justify-center rounded-xl p-[2px]',
                                            field.value === test.code ? 'bg-gradient' : 'bg-transparent'
                                          )}
                                        >
                                          <TestExamCard
                                            code={test.code}
                                            name={test.name}
                                            conditionPoint={test.conditionPoint}
                                            duration={test.duration}
                                            description={test.description}
                                            countQuestions={test.countQuestions}
                                          />
                                        </div>
                                      </>
                                    </label>
                                  </FormItem>
                                )
                              })}
                            </div>
                          </RadioGroup>
                        </FormControl>
                      )}

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

export default DialogScheduleTestExam

type TestExamCardProps = {
  name: string
  code: string
  conditionPoint: number
  duration: number
  description: string | null
  countQuestions: number
}
function TestExamCard({ code, conditionPoint, description, duration, name, countQuestions }: TestExamCardProps) {
  return (
    <div className='size-full cursor-pointer rounded-lg bg-card p-4'>
      <div className='flex flex-col gap-y-1'>
        <h4 className='line-clamp-1 text-lg font-bold'>{name}</h4>
        <p className='line-clamp-1 text-xs text-muted-foreground'>
          {code} (required: {conditionPoint} points)
        </p>
      </div>

      <div className='z-10 mt-3 flex gap-x-2'>
        <Badge className='pointer-events-none w-fit bg-[#d1d1d1] py-1 text-sm font-normal text-card-foreground dark:bg-[#282828] dark:text-white'>
          {countQuestions} questions
        </Badge>
        <Badge className='pointer-events-none w-fit bg-[#d1d1d1] py-1 text-sm font-normal text-card-foreground dark:bg-[#282828] dark:text-white'>
          {duration} minutes
        </Badge>
      </div>

      <p className='mt-2 line-clamp-2 max-w-[90%] px-1 text-sm'>{description}</p>
    </div>
  )
}
