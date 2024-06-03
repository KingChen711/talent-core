import { CalendarIcon, Loader2 } from 'lucide-react'
import { StatusCodes } from 'http-status-codes'
import { cn, isAxiosError, toDate } from '@/lib/utils'
import { format } from 'date-fns'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import {
  TMutateRecruitmentDriveErrors,
  TMutationRecruitmentDriveSchema,
  mutationRecruitmentDriveSchema
} from '@/lib/validation/recruitment-drive.validation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '../ui/checkbox'
import useMutateRecruitmentDrive from '@/hooks/recruitment-drive/use-mutate-recruitment-drive'
import useRecruitmentDrive from '@/hooks/recruitment-drive/use-recruitment-drive'
import { useMemo } from 'react'

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
  console.log(type)

  const form = useForm<TMutationRecruitmentDriveSchema>({
    resolver: zodResolver(mutationRecruitmentDriveSchema),
    defaultValues: {
      code: '',
      name: '',
      startDate: undefined,
      endDate: undefined,
      description: '',
      isOpening: false
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
    form.setValue('isOpening', recruitmentDrive.isOpening)
  })

  const disabling = useMemo(() => isPending || isLoading, [isPending, isLoading])

  const onSubmit = async (values: TMutationRecruitmentDriveSchema) => {
    console.log(values)

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
            status: 'all'
          }
        })
      },
      onError: (error) => {
        if (
          !isAxiosError<{ errors: TMutateRecruitmentDriveErrors }>(error) ||
          error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR
        ) {
          toast({
            title: `Recruitment drive has been ${type === 'create' ? 'created' : 'updated'} failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })
          return
        }
        if (error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
          const fieldErrors = error.response?.data.errors
          const keys = Object.keys(fieldErrors) as (keyof TMutateRecruitmentDriveErrors)[]
          keys.forEach((key) => form.setError(key, { message: fieldErrors[key] }))
          form.setFocus(keys[0])
          return
        }
        toast({
          title: `Recruitment drive has been ${type === 'create' ? 'created' : 'updated'} failure`,
          description: error.message,
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

          <FormField
            control={form.control}
            name='isOpening'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <div className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={disabling} />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Open this recruitment drive</FormLabel>
                    <FormDescription>Please note that there is only one recruitment at a time.</FormDescription>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
