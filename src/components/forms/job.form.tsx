import { cn, getContrastYIQ, getRandomHexColor, isBaseError, isFormError } from '@/lib/utils'
import { TMutateJobErrors, TMutationJobSchema, mutationJobSchema } from '@/lib/validation/job.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Checkbox } from '../ui/checkbox'
import { HexColorPicker } from 'react-colorful'
import { Button } from '../ui/button'
import { defaultJobIcon, jobsPageSize } from '@/constants'
import useJob from '@/hooks/job/use-job'
import useMutateJob from '@/hooks/job/use-mutate-job'
import { toast } from '../ui/use-toast'
import { StatusCodes } from 'http-status-codes'
import { Loader2 } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

type Props = {
  type: 'create' | 'update'
  jobId?: string
} & (
  | {
      type: 'create'
    }
  | {
      type: 'update'
      jobId: string
    }
)

function JobForm({ type, jobId }: Props) {
  const navigate = useNavigate()

  const [file, setFile] = useState<File | null>(null)

  const form = useForm<TMutationJobSchema>({
    resolver: zodResolver(mutationJobSchema),
    defaultValues: {
      code: '',
      name: '',
      description: '',
      color: type === 'create' ? getRandomHexColor() : undefined,
      icon: type === 'create' ? defaultJobIcon : undefined,
      openInCurrentRecruitment: false,
      quantityInCurrentRecruitment: 1
    }
  })

  const { mutate, isPending } = useMutateJob(type)

  // Get updated job
  const { isLoading } = useJob(jobId, (job) => {
    form.setValue('code', job.code)
    form.setValue('name', job.name)
    form.setValue('description', job.description || '')
    form.setValue('color', job.color)
    form.setValue('icon', job.icon)
    form.setValue('openInCurrentRecruitment', job.isOpening)
  })

  const disabling = useMemo(() => isPending || isLoading, [isPending, isLoading])

  const onSubmit = async (values: TMutationJobSchema) => {
    const formData = new FormData()

    formData.append('code', values.code)
    formData.append('name', values.name)
    formData.append('description', values.description || '')
    formData.append('color', values.color)
    formData.append('image', file as any)

    if (type === 'create') {
      formData.append('openInCurrentRecruitment', JSON.stringify(values.openInCurrentRecruitment))
      formData.append('quantityInCurrentRecruitment', JSON.stringify(values.quantityInCurrentRecruitment))
    } else {
      formData.append('id', jobId)
    }

    mutate(formData, {
      onSuccess: () => {
        toast({
          title: `Job has been ${type === 'create' ? 'created' : 'updated'} successfully`,
          variant: 'success'
        })

        return navigate({
          to: '/jobs',
          search: {
            pageNumber: 1,
            pageSize: jobsPageSize,
            search: '',
            status: 'All',
            sort: '-createdAt'
          }
        })
      },
      onError: (error) => {
        if (isFormError<TMutateJobErrors>(error) && error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
          const fieldErrors = error.response?.data.errors
          const keys = Object.keys(fieldErrors) as (keyof TMutateJobErrors)[]
          keys.forEach((key) => form.setError(key, { message: fieldErrors[key] }))
          form.setFocus(keys[0])

          return
        }

        if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
          toast({
            title: `Job has been ${type === 'create' ? 'created' : 'updated'} failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })

          return
        }

        toast({
          title: `Job has been ${type === 'create' ? 'created' : 'updated'} failure`,
          description: error.response?.data.message,
          variant: 'danger'
        })
      }
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault()

    const fileReader = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFile(file)

      if (!file.type.includes('image')) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ''
        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
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
                Job Name<span className='text-gradient text-2xl font-bold leading-none'>*</span>
              </FormLabel>
              <FormControl>
                <Input disabled={disabling} placeholder='Job Name...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {type === 'create' && (
          <FormField
            control={form.control}
            name='openInCurrentRecruitment'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <Accordion value={String(field.value)} type='single' collapsible>
                      <AccordionItem value='true' className='cursor-default'>
                        <AccordionTrigger showChevronDown={false} className='cursor-default'>
                          <div className='flex items-center gap-x-4'>
                            <Checkbox
                              disabled={disabling}
                              id='openInCurrentRecruitment'
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className='size-6'
                            />
                            <FormLabel
                              htmlFor='openInCurrentRecruitment'
                              className='flex items-center gap-x-4 no-underline'
                            >
                              Add this job to current recruitment drive
                            </FormLabel>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className='px-1'>
                          <FormField
                            control={form.control}
                            name='quantityInCurrentRecruitment'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className='text-base'>Number of candidates needed</FormLabel>
                                <FormControl>
                                  <div className='flex flex-col gap-y-4'>
                                    <Input
                                      {...field}
                                      disabled={disabling}
                                      value={field.value}
                                      onChange={(e) => field.onChange(e.target.value)}
                                      type='number'
                                      placeholder='Number of candidates needed...'
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </>
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <div className='flex gap-x-20'>
          <FormField
            control={form.control}
            name='color'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color (HEX)</FormLabel>
                <FormControl>
                  <div className='flex flex-col gap-y-4'>
                    <Input
                      style={{
                        backgroundColor: field.value || 'transparent',
                        color: field.value ? getContrastYIQ(field.value) : 'white'
                      }}
                      placeholder='Color...'
                      {...field}
                      className='w-[200px] font-semibold'
                      disabled={disabling}
                    />
                    <HexColorPicker
                      className={cn(disabling && 'pointer-events-none opacity-80')}
                      color={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='icon'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Icon
                  {field.value ? (
                    <div
                      className={cn(
                        'group relative mt-2 flex size-64 items-center justify-center rounded-md border-2',
                        disabling && 'pointer-events-none opacity-80'
                      )}
                    >
                      <img
                        src={field.value}
                        alt='imageUrl'
                        className='size-60 rounded-md object-contain group-hover:opacity-55'
                      />

                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          field.onChange('')
                        }}
                        variant='ghost'
                        size='icon'
                        className='absolute right-2 top-2 hidden group-hover:inline-flex'
                      >
                        <img alt='delete' src='/icons/actions/delete.svg' className='size-6 object-cover' />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        'mt-2 flex size-64 cursor-pointer flex-col items-center justify-center gap-y-2 rounded-md border-[3px] border-dashed',
                        disabling && 'pointer-events-none opacity-80'
                      )}
                    >
                      <img alt='upload' src='/icons/actions/upload.svg' className='size-12' />
                      <p>Upload Icon</p>
                    </div>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={disabling}
                    type='file'
                    accept='image/*'
                    placeholder='Add profile photo'
                    className='hidden'
                    onChange={(e) => handleImageChange(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit' className='float-right' disabled={disabling}>
          {type === 'create' ? 'Submit' : 'Save'} {disabling && <Loader2 className='ml-1 size-4 animate-spin' />}
        </Button>
      </form>
    </Form>
  )
}

export default JobForm
