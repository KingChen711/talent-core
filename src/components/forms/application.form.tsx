import { Gender } from '@prisma/client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import {
  TCreateApplicationErrors,
  TCreateApplicationSchema,
  createApplicationSchema
} from '@/lib/validation/application.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button, buttonVariants } from '../ui/button'
import { useForm } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { cn, isBaseError, isFormError } from '@/lib/utils'
import useCreateApplication from '@/hooks/application/use-create-application'
import { Loader2 } from 'lucide-react'
import { toast } from '../ui/use-toast'
import { useNavigate } from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'
import { useState } from 'react'
import { Textarea } from '../ui/textarea'

export type InitialApplicationFormStates = {
  email: string
  fullName: string
  phone: string | undefined
  gender: 'Male' | 'Female' | 'Other' | undefined
  bornYear: number | undefined
}

type Props = {
  jobCode: string
  recruitmentDriveCode: string
  initialStates: InitialApplicationFormStates
}

function ApplicationForm({ jobCode, recruitmentDriveCode, initialStates }: Props) {
  const navigate = useNavigate()

  const [file, setFile] = useState<File | null>(null)

  const { mutate, isPending } = useCreateApplication()

  const form = useForm<TCreateApplicationSchema>({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: initialStates
  })

  const disabling = isPending

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault()

    const fileReader = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (
        ![
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ].includes(file.type)
      ) {
        toast({
          title: 'CV must be a pdf, doc, or docx file',
          variant: 'danger'
        })
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          variant: 'danger'
        })
        return
      }

      setFile(file)

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ''
        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }

  const onSubmit = async (values: TCreateApplicationSchema) => {
    const formData = new FormData()

    formData.append('email', values.email)
    formData.append('fullName', values.fullName)
    formData.append('phone', values.phone)
    formData.append('gender', values.gender)
    formData.append('bornYear', JSON.stringify(values.bornYear))
    formData.append('personalIntroduction', values.personalIntroduction || '')
    formData.append('cv', file as any)

    mutate(
      { jobCode, recruitmentDriveCode, formData },
      {
        onSuccess: () => {
          toast({
            title: 'Candidate has been added successfully',
            variant: 'success'
          })

          return navigate({
            to: `/recruitment-drives/${recruitmentDriveCode}/detail`
          })
        },
        onError: (error) => {
          if (
            isFormError<TCreateApplicationErrors>(error) &&
            error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY
          ) {
            const fieldErrors = error.response?.data.errors
            const keys = Object.keys(fieldErrors) as (keyof TCreateApplicationErrors)[]
            keys.forEach((key) => form.setError(key, { message: fieldErrors[key] }))
            form.setFocus(keys[0])

            return
          }

          if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
            toast({
              title: 'Candidate has been added failure',
              description: 'Some thing went wrong.',
              variant: 'danger'
            })

            return
          }

          toast({
            title: 'Candidate has been added failure',
            description: error.response?.data.message,
            variant: 'danger'
          })
        }
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 space-y-8'>
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center'>
                Full Name<span className='text-gradient text-2xl font-bold leading-none'>*</span>
              </FormLabel>
              <FormControl>
                <Input disabled={disabling} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center'>
                Phone<span className='text-gradient text-2xl font-bold leading-none'>*</span>
              </FormLabel>
              <FormControl>
                <Input disabled={disabling} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bornYear'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center'>
                Born Year<span className='text-gradient text-2xl font-bold leading-none'>*</span>
              </FormLabel>
              <FormControl>
                <Input disabled={disabling} type='number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>
                Gender<span className='text-gradient text-2xl font-bold leading-none'>*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  disabled={disabling}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={Gender.Male} />
                    </FormControl>
                    <FormLabel className='font-normal'>Male</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={Gender.Female} />
                    </FormControl>
                    <FormLabel className='font-normal'>Female</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={Gender.Other} />
                    </FormControl>
                    <FormLabel className='font-normal'>Other</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='cv'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                CV<span className='text-gradient text-2xl font-bold leading-none'>*</span>{' '}
                <span className='font-normal'>(supports *.doc, *.docx, *.pdf, and &lt; 5MB formats)</span>
                <div
                  className={cn('flex items-center gap-x-4 mt-2 w-fit', disabling && 'pointer-events-none opacity-80')}
                >
                  <div className={cn(buttonVariants({ size: 'sm', variant: 'secondary' }))}>Choose File</div>
                  {field.value ? <p>{file?.name}</p> : <p>No file chosen</p>}
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={disabling}
                  type='file'
                  accept='pdf/*'
                  placeholder='Add your CV'
                  className='hidden'
                  onChange={(e) => handleCvChange(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='personalIntroduction'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal Introduction</FormLabel>
              <FormControl>
                <Textarea disabled={disabling} placeholder='Personal introduction...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={disabling} type='submit' className='float-right'>
          Submit {disabling && <Loader2 className='ml-1 size-4 animate-spin' />}
        </Button>
      </form>
    </Form>
  )
}

export default ApplicationForm
