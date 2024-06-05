import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { TOpenJobErrors, TOpenJobSchema, openJobSchema } from '../../lib/validation/job.validation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import useOpenJob from '@/hooks/recruitment-drive/use-open-job'
import { toast } from '../ui/use-toast'
import { useNavigate } from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'
import { isBaseError, isFormError } from '@/lib/utils'

type Props = {
  jobCode: string
}

function DialogContentOpenJob({ jobCode }: Props) {
  const navigate = useNavigate()

  const form = useForm<TOpenJobSchema>({
    resolver: zodResolver(openJobSchema),
    defaultValues: {
      jobCode,
      quantity: 1
    }
  })

  const { mutate, isPending } = useOpenJob()

  const onSubmit = async (values: TOpenJobSchema) => {
    mutate(values, {
      onSuccess: (data) => {
        toast({
          title: `Job has been open successfully`,
          variant: 'success'
        })

        return navigate({
          to: `/recruitment-drives/${data.recruitmentDriveCode}/detail`
        })
      },
      onError: (error) => {
        if (isFormError<TOpenJobErrors>(error) && error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
          const fieldErrors = error.response?.data.errors
          const keys = Object.keys(fieldErrors) as (keyof TOpenJobErrors)[]
          keys.forEach((key) => form.setError(key, { message: fieldErrors[key] }))
          form.setFocus(keys[0])

          return
        }

        if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
          toast({
            title: `Job has been open failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })

          return
        }

        toast({
          title: `Job has been open failure`,
          description: error.response?.data.message,
          variant: 'danger'
        })
      }
    })
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Open Job In Current Recruitment Drive</DialogTitle>
        <DialogDescription asChild>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='mt-4'>
              <FormField
                control={form.control}
                name='quantity'
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
                          disabled={isPending}
                        />
                      </div>
                    </FormControl>
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
