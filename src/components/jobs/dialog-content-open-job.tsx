import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { TOpenJobSchema, openJobSchema } from '../../lib/validation/job.validation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'

type Props = {
  jobId: string
}

function DialogContentOpenJob({ jobId }: Props) {
  const form = useForm<TOpenJobSchema>({
    resolver: zodResolver(openJobSchema),
    defaultValues: {
      quantityInCurrentRecruitment: 1
    }
  })

  const onSubmit = async (values: TOpenJobSchema) => {
    console.log({ jobId })
    console.log(values)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Open Job In Current Recruitment Round</DialogTitle>
        <DialogDescription asChild>
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

              <div className='flex justify-end gap-x-4'>
                <DialogClose asChild>
                  <Button variant='secondary' className='float-right mt-4'>
                    Cancel
                  </Button>
                </DialogClose>

                <Button type='submit' className='float-right mt-4'>
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

export default DialogContentOpenJob
