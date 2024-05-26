import { useAuth } from '@clerk/clerk-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { TOpenJobSchema, openJobSchema } from '@/lib/validation/job'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'

type Props = {
  jobId: string
}

function OpenJobForm({ jobId }: Props) {
  const { getToken } = useAuth()
  console.log(jobId, getToken)

  const form = useForm<TOpenJobSchema>({
    resolver: zodResolver(openJobSchema),
    defaultValues: {
      quantityInCurrentRecruitment: 1
    }
  })

  const onSubmit = async (values: TOpenJobSchema) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mt-4'>
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
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    type='number'
                    className='text-base'
                    placeholder='Number of candidates needed...'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='float-right mt-4'>
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default OpenJobForm
