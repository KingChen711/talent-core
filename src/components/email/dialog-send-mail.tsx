import { editorPlugin } from '@/constants'
import { useTheme } from '@/contexts/theme-provider'
import { isBaseError } from '@/lib/utils'
import { TSendMailSchema, sendMailSchema } from '@/lib/validation/email.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tinymce/tinymce-react'
import { StatusCodes } from 'http-status-codes'
import { Loader2, MailIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import useSendMail from '@/hooks/email/use-send-mail'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'

import { Input } from '../ui/input'

type Props = {
  candidateEmail: string
}

function DialogSendMail({ candidateEmail }: Props) {
  const { actualTheme } = useTheme()

  const [open, setOpen] = useState(false)

  const { mutate, isPending } = useSendMail()

  const form = useForm<TSendMailSchema>({
    resolver: zodResolver(sendMailSchema),
    defaultValues: {
      to: candidateEmail
    }
  })

  const handleOpenChange = (value: boolean) => {
    if (isPending) return
    setOpen(value)
  }

  const onSubmit = async (values: TSendMailSchema) => {
    mutate(values, {
      onSuccess: () => {
        toast({
          title: 'Send mail successfully',
          variant: 'success'
        })

        setOpen(false)
      },
      onError: (error) => {
        if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
          toast({
            title: 'Send mail failure',
            description: 'Some thing went wrong.',
            variant: 'danger'
          })

          return
        }

        toast({
          title: 'Send mail failure',
          description: error.response?.data.message,
          variant: 'danger'
        })
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className='mt-3 flex w-full flex-col gap-y-2'>
          <div className='bg-gradient mt-2 flex items-center justify-center rounded-lg p-px'>
            <Button variant='outline' className='group w-full bg-card hover:bg-card'>
              <MailIcon className='size-5 group-hover:text-[#6e38e0]' />
              <p className='group-hover:text-gradient ml-1 font-bold'>Send Email</p>
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='max-h-[85%] w-[600px] max-w-[96%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>Send mail to candidate</DialogTitle>
          <DialogDescription asChild>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='to'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center'>
                        To<span className='text-gradient text-2xl font-bold leading-none'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='subject'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center'>
                        Subject<span className='text-gradient text-2xl font-bold leading-none'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='html'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center'>
                        Content<span className='text-gradient text-2xl font-bold leading-none'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Editor
                          disabled={isPending}
                          apiKey={import.meta.env.VITE_TINY_EDITOR_API_KEY}
                          init={{
                            ...editorPlugin,
                            skin: actualTheme === 'dark' ? 'oxide-dark' : undefined,
                            content_css: 'dark',
                            height: 280
                          }}
                          onEditorChange={field.onChange}
                          value={field.value}
                        />
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
                    Approve {isPending && <Loader2 className='ml-1 size-4 animate-spin' />}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DialogSendMail
