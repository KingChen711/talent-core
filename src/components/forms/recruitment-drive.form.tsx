import { cn, isBaseError, isFormError, toDate } from '@/lib/utils'
import {
  TMutateRecruitmentDriveErrors,
  TMutationRecruitmentDriveSchema,
  mutationRecruitmentDriveSchema
} from '@/lib/validation/recruitment-drive.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { format } from 'date-fns'
import { StatusCodes } from 'http-status-codes'
import { AlertTriangle, CalendarIcon, Loader2 } from 'lucide-react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import useMutateRecruitmentDrive from '@/hooks/recruitment-drive/use-mutate-recruitment-drive'
import useRecruitmentDrive from '@/hooks/recruitment-drive/use-recruitment-drive'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

type Props = {
  type: 'create' | 'update'
  recruitmentDriveId?: string
} & (
  | {
      type: 'create'
    }
  | {
      type: 'update'
      recruitmentDriveId: string
    }
)

function RecruitmentDriveForm({ type, recruitmentDriveId }: Props) {
  const navigate = useNavigate()

  const form = useForm<TMutationRecruitmentDriveSchema>({
    resolver: zodResolver(mutationRecruitmentDriveSchema),
    defaultValues: {
      code: '',
      name: '',
      startDate: undefined,
      endDate: undefined,
      description: ''
    }
  })

  const { mutate, isPending } = useMutateRecruitmentDrive(type)

  // Get updated Recruitment Drive
  const { isLoading } = useRecruitmentDrive(recruitmentDriveId, (recruitmentDrive) => {
    form.setValue('code', recruitmentDrive.code)
    form.setValue('name', recruitmentDrive.name)
    form.setValue('description', recruitmentDrive.description || '')
    form.setValue('startDate', new Date(recruitmentDrive.startDate))
    form.setValue('endDate', new Date(recruitmentDrive.endDate))
    form.setValue('status', recruitmentDrive.status)
  })

  const disabling = useMemo(() => isPending || isLoading, [isPending, isLoading])

  const onSubmit = async (values: TMutationRecruitmentDriveSchema) => {
    if (type === 'update') {
      values.id = recruitmentDriveId
    }

    mutate(values, {
      onSuccess: () => {
        toast({
          title: `Recruitment drive has been ${type === 'create' ? 'created' : 'updated'} successfully`,
          variant: 'success'
        })

        return navigate({
          to: '/recruitment-drives',
          search: {
            pageNumber: 1,
            pageSize: 5,
            search: '',
            sort: '-createdAt',
            status: 'All'
          }
        })
      },
      onError: (error) => {
        if (
          isFormError<TMutateRecruitmentDriveErrors>(error) &&
          error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY
        ) {
          const fieldErrors = error.response?.data.errors
          const keys = Object.keys(fieldErrors) as (keyof TMutateRecruitmentDriveErrors)[]
          keys.forEach((key) => form.setError(key, { message: fieldErrors[key] }))
          form.setFocus(keys[0])

          return
        }

        if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
          toast({
            title: `Recruitment drive has been ${type === 'create' ? 'created' : 'updated'} failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })

          return
        }

        toast({
          title: `Recruitment drive has been ${type === 'create' ? 'created' : 'updated'} failure`,
          description: error.response?.data.message,
          variant: 'danger'
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center'>
                Code<span className='text-gradient text-2xl font-bold leading-none'>*</span>
              </FormLabel>
              <FormControl>
                <Input disabled={disabling} placeholder='Code...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center'>
                Name<span className='text-gradient text-2xl font-bold leading-none'>*</span>
              </FormLabel>
              <FormControl>
                <Input disabled={disabling} placeholder='Name...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-wrap gap-x-16 gap-y-8'>
          <FormField
            control={form.control}
            name='startDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>
                  Start date<span className='text-gradient text-2xl font-bold leading-none'>*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
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
                      disabled={disabling}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='endDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>
                  End date<span className='text-gradient text-2xl font-bold leading-none'>*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
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
                      disabled={disabling}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {type === 'update' && (
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <div className='flex items-end gap-x-8'>
                <FormItem className='space-y-3'>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue='Upcoming'
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem checked={field.value === 'Upcoming'} value='Upcoming' />
                        </FormControl>
                        <FormLabel className='cursor-pointer font-normal'>Upcoming</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem checked={field.value === 'Open'} value='Open' />
                        </FormControl>
                        <FormLabel className='cursor-pointer font-normal'>Open</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem checked={field.value === 'Closed'} value='Closed' />
                        </FormControl>
                        <FormLabel className='cursor-pointer font-normal'>Closed</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                {field.value === 'Closed' && (
                  <Alert className='h-fit w-[450px] border-warning'>
                    <AlertTriangle className='size-4 stroke-warning' />
                    <AlertTitle className='font-semibold text-warning'>Warning</AlertTitle>
                    <AlertDescription className='text-warning'>
                      If you update the status of a recruitment drive to{' '}
                      <span className='text-base font-bold text-danger '>Closed</span>, you will no longer be able to
                      update the status.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          />
        )}

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea disabled={disabling} placeholder='Description...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='float-right' disabled={disabling}>
          {type === 'create' ? 'Submit' : 'Save'} {disabling && <Loader2 className='ml-1 size-4 animate-spin' />}
        </Button>
      </form>
    </Form>
  )
}

export default RecruitmentDriveForm
