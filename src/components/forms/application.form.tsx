import { Gender, User } from '@prisma/client'
import SearchCandidateForm from './search-candidate-profile-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useState } from 'react'
import { TCreateApplicationSchema, createApplicationSchema } from '@/lib/validation/application.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { isBaseError } from '@/lib/utils'
import useCreateApplication from '@/hooks/application/use-create-application'
import { Loader2 } from 'lucide-react'
import { toast } from '../ui/use-toast'
import { useNavigate } from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'

type Props = {
  jobCode: string
  recruitmentDriveCode: string
}

function ApplicationForm({ jobCode, recruitmentDriveCode }: Props) {
  const navigate = useNavigate()

  const [hasSearched, setHasSearched] = useState(false)

  const { mutate, isPending } = useCreateApplication()

  const form = useForm<TCreateApplicationSchema>({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: {
      createCandidate: true,
      phone: '',
      fullName: '',
      bornYear: undefined,
      gender: 'Male'
    }
  })

  const disabling = !form.getValues('createCandidate') || isPending

  const handleSearchedCandidateData = (email: string, data: User | null) => {
    setHasSearched(true)
    form.setValue('candidateEmail', email)

    if (!data) {
      form.setValue('createCandidate', true)
    }
  }

  const onSubmit = async (values: TCreateApplicationSchema) => {
    mutate(
      { jobCode, recruitmentDriveCode, data: values },
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
    <>
      <SearchCandidateForm
        hasSearched={hasSearched}
        setHasSearched={setHasSearched}
        handleSearchedCandidateData={handleSearchedCandidateData}
        isPending={isPending}
      />
      {hasSearched && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 space-y-8'>
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center'>Full Name</FormLabel>
                  <FormControl>
                    <Input disabled={disabling} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex gap-x-8'>
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center'>Phone</FormLabel>
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
                    <FormLabel className='flex items-center'>Born Year</FormLabel>
                    <FormControl>
                      <Input disabled={disabling} type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Gender</FormLabel>
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

            <Button type='submit' className='float-right'>
              Submit {disabling && <Loader2 className='ml-1 size-4 animate-spin' />}
            </Button>
          </form>
        </Form>
      )}
    </>
  )
}

export default ApplicationForm
