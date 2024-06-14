import React from 'react'
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'
import { cn, isBaseError, toDate } from '@/lib/utils'
import { StatusCodes } from 'http-status-codes'
import { TScheduleTestExamSchema, scheduleTestExamSchema } from '@/lib/validation/applicant.validation'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import useJobTestExams from '@/hooks/job/use-job-test-exams'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Skeleton } from '../ui/skeleton'
import { ScrollArea } from '../ui/scroll-area'
import { Badge } from '../ui/badge'

type Props = {
  jobCode: string
}

function DialogContentScheduleTestExam({ jobCode }: Props) {
  const navigate = useNavigate()

  const { data: testExams, isLoading: isLoadingTestExams } = useJobTestExams(jobCode)

  const form = useForm<TScheduleTestExamSchema>({
    resolver: zodResolver(scheduleTestExamSchema)
  })

  const onSubmit = async (values: TScheduleTestExamSchema) => {
    // mutate(values, {
    //   onSuccess: (data) => {
    //     toast({
    //       title: `Job has been open successfully`,
    //       variant: 'success'
    //     })
    //     return navigate({
    //       to: `/recruitment-drives/${data.recruitmentDriveCode}/detail`
    //     })
    //   },
    //   onError: (error) => {
    //     // if (isFormError<TScheduleTestExamErrors>(error) && error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
    //     //   const fieldErrors = error.response?.data.errors
    //     //   const keys = Object.keys(fieldErrors) as (keyof TScheduleTestExamErrors)[]
    //     //   keys.forEach((key) => form.setError(key, { message: fieldErrors[key] }))
    //     //   form.setFocus(keys[0])
    //     //   return
    //     // }
    //     if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
    //       toast({
    //         title: `Job has been open failure`,
    //         description: 'Some thing went wrong.',
    //         variant: 'danger'
    //       })
    //       return
    //     }
    //     toast({
    //       title: `Job has been open failure`,
    //       description: error.response?.data.message,
    //       variant: 'danger'
    //     })
    //   }
    // })
  }

  return (
    <DialogContent className='w-96'>
      <DialogHeader>
        <DialogTitle className='mb-4'>Schedule Test Exam</DialogTitle>
        <DialogDescription asChild>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='testDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-start'>
                    <FormLabel>Test date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? toDate(field.value) : <span>Pick a date</span>}
                            <CalendarIcon className='ml-auto size-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          //   disabled={disabling}
                        />
                      </PopoverContent>
                    </Popover>
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

                    {/* <div className='max-h-[50dvh] w-full overflow-y-auto space-y-4'>
                     
                        {Array(3)
                          .fill(null)
                          .map((_, i) => {
                            return <Skeleton className='h-44 w-full' key={i} />
                          })}
                     
                    </div> */}

                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex w-full flex-col space-y-1'
                      >
                        <div className='max-h-[50dvh] w-full space-y-4 overflow-y-auto'>
                          {testExams?.map((test, i) => {
                            return (
                              <FormItem key={i} className='flex w-full items-center space-x-3 space-y-0'>
                                <label className='w-full font-normal'>
                                  <>
                                    <FormControl>
                                      <RadioGroupItem className='hidden' value={test.code} />
                                    </FormControl>
                                    <div className='h-44 w-full rounded-lg bg-card p-4'>
                                      <div className='flex flex-col gap-y-1'>
                                        <h4 className='line-clamp-1 text-lg font-bold'>{test.name}</h4>
                                        <p className='line-clamp-1 text-xs text-muted'>
                                          {test.code} (required: {test.conditionPoint} points)
                                        </p>
                                      </div>

                                      <div className='z-10 mt-4 flex gap-x-2'>
                                        <Badge className='pointer-events-none w-fit bg-[#d1d1d1] py-1 text-sm font-normal text-card-foreground dark:bg-[#282828] dark:text-white'>
                                          {6} questions
                                        </Badge>
                                        <Badge className='pointer-events-none w-fit bg-[#d1d1d1] py-1 text-sm font-normal text-card-foreground dark:bg-[#282828] dark:text-white'>
                                          {test.duration} minutes
                                        </Badge>
                                      </div>

                                      <p className='mt-2 line-clamp-2 max-w-[90%] px-1 text-sm'>
                                        {test.description} {test.description} {test.description} {test.description}
                                      </p>
                                    </div>
                                  </>
                                </label>
                              </FormItem>
                            )
                          })}
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-end gap-x-4'>
                <DialogClose asChild>
                  <Button
                    //   disabled={isPending}
                    variant='secondary'
                    className='float-right mt-4'
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  // disabled={isPending}
                  type='submit'
                  className='float-right mt-4'
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  )
}

export default DialogContentScheduleTestExam
