import useSearchCandidateProfile from '@/hooks/user/use-search-candidate-profile'
import { isBaseError } from '@/lib/utils'
import { TSearchCandidateEmailSchema, searchCandidateEmailSchema } from '@/lib/validation/application.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { useForm } from 'react-hook-form'
import { toast } from '../ui/use-toast'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type SearchCandidateFormProps = {
  hasSearched: boolean
  isPending: boolean
  setHasSearched: React.Dispatch<React.SetStateAction<boolean>>
  handleSearchedCandidateData: (email: string, candidate: User | null) => void
}

function SearchCandidateForm({
  hasSearched,
  isPending,
  setHasSearched,
  handleSearchedCandidateData
}: SearchCandidateFormProps) {
  const form = useForm<TSearchCandidateEmailSchema>({
    resolver: zodResolver(searchCandidateEmailSchema),
    defaultValues: {
      email: ''
    }
  })

  const { mutate, isPending: searching } = useSearchCandidateProfile()

  const disabling = isPending || searching

  const onSubmit = async (values: TSearchCandidateEmailSchema) => {
    if (hasSearched) {
      return setHasSearched(false)
    }

    mutate(values.email, {
      onSuccess: () => {},
      onError: (error) => {
        if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
          return toast({
            title: 'Cannot search candidate',
            description: 'Something went wrong',
            variant: 'danger'
          })
        }

        if (error.response?.status === StatusCodes.NOT_FOUND) {
          toast({
            title: `This email is not exist in system`,
            description: "Let's complete all candidate information to create an application",
            variant: 'warning'
          })

          return handleSearchedCandidateData(form.getValues('email'), null)
        }

        return toast({
          title: 'Cannot search candidate',
          description: error.response?.data.message,
          variant: 'danger'
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel className='flex items-center'>Candidate Email</FormLabel>
              <FormControl>
                <div className='flex items-center gap-x-4'>
                  <Input disabled={hasSearched || disabling} {...field} />
                  <Button disabled={disabling} type='submit'>
                    {hasSearched ? 'Change' : 'Search'}
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Try entering the candidate&apos;s email and searching to see if they already exist in the system.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default SearchCandidateForm
