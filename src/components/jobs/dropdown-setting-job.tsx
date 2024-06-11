import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Link } from '@tanstack/react-router'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Dialog } from '../ui/dialog'
import DialogContentOpenJob from './dialog-content-open-job'
import useCloseJob from '@/hooks/recruitment-drive/use-close-job'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import { isBaseError } from '@/lib/utils'
import { StatusCodes } from 'http-status-codes'

type Props = {
  jobId: string
  jobCode: string
  isOpening: boolean
}

function DropdownSettingJob({ jobId, jobCode, isOpening }: Props) {
  const queryClient = useQueryClient()
  const { mutate } = useCloseJob()

  const handleCloseJob = () => {
    mutate(jobCode, {
      onSuccess: () => {
        toast({
          title: `Job has been closed successfully`,
          variant: 'success'
        })

        queryClient.invalidateQueries({
          queryKey: ['jobs']
        })
      },
      onError: (error) => {
        if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
          toast({
            title: `Job has been closed failure`,
            description: 'Some thing went wrong.',
            variant: 'danger'
          })

          return
        }

        toast({
          title: `Job has been closed failure`,
          description: error.response?.data.message,
          variant: 'danger'
        })
      }
    })
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon'>
            <img alt='settings' src='/icons/actions/settings.svg' className='size-6 select-none object-cover' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='border-2'>
          <DropdownMenuItem className='cursor-pointer' asChild>
            <Link to={`/jobs/${jobId}/edit`} className='flex items-center gap-x-2'>
              <img alt='edit' src='/icons/actions/edit.svg' className='size-4 invert dark:invert-0' />
              Update
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' asChild>
            <Link to={`/jobs/${jobCode}/test-exams`} className='flex items-center gap-x-2'>
              <img alt='edit' src='/icons/side-bar/exam-active.svg' className='size-4 invert dark:invert-0' />
              View Test Exams
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' asChild>
            <Link to={`/jobs/${jobCode}/add-test-exams`} className='flex items-center gap-x-2'>
              <img alt='edit' src='/icons/side-bar/exam-active.svg' className='size-4 invert dark:invert-0' />
              Add Test Exams
            </Link>
          </DropdownMenuItem>
          {!isOpening ? (
            <DialogTrigger asChild>
              <DropdownMenuItem className='cursor-pointer' asChild>
                <div className='flex cursor-pointer items-center gap-x-2 rounded-sm px-2 py-[6px] text-sm leading-5 hover:bg-muted'>
                  <img
                    alt='edit'
                    src='/icons/side-bar/recruitment-active.svg'
                    className='size-4 invert dark:invert-0'
                  />
                  Open This Job
                </div>
              </DropdownMenuItem>
            </DialogTrigger>
          ) : (
            <DropdownMenuItem className='cursor-pointer' asChild>
              <div onClick={handleCloseJob} className='flex items-center gap-x-2'>
                <img alt='edit' src='/icons/side-bar/recruitment-active.svg' className='size-4 invert dark:invert-0' />
                Close This Job
              </div>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {!isOpening && <DialogContentOpenJob jobCode={jobCode} />}
    </Dialog>
  )
}

export default DropdownSettingJob
