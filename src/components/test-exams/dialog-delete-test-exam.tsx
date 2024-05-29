import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import useDeleteTestExam from '../../hooks/test-exam/use-delete-test-exam'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from '../ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

type Props = {
  testExamId: string
}

function DialogDeleteTestExam({ testExamId }: Props) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useDeleteTestExam()

  const handleDeleteTestExam = async () => {
    mutate(testExamId, {
      onSuccess: () => {
        toast({
          title: 'Test Exam has been deleted successfully',
          variant: 'success'
        })
        queryClient.invalidateQueries({ queryKey: ['test-exams'] })
        setOpen(false)
      }
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value || isPending)
      }}
    >
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <img alt='delete' src='/icons/actions/delete.svg' className='size-6 object-cover' />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[350px]'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>Are you sure to delete this Test Exam?</DialogTitle>
          <DialogDescription asChild>
            <div className='flex items-center justify-center gap-x-5'>
              <Button disabled={isPending} className='w-[100px]' onClick={handleDeleteTestExam}>
                <p>Delete</p> {isPending && <Loader2 className='ml-1 size-4 animate-spin' />}
              </Button>
              <DialogClose asChild>
                <Button disabled={isPending} className='w-[100px]' variant='secondary'>
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DialogDeleteTestExam
