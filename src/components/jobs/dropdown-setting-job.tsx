import { isBaseError } from '@/lib/utils'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'

import DialogContentOpenJob from './dialog-content-open-job'

import { JobStatus } from '@/hooks/job/use-jobs'
import useCloseJob from '@/hooks/recruitment-drive/use-close-job'

import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { toast } from '../ui/use-toast'

type Props = {
  jobId: string
  jobCode: string
  status: JobStatus
}

function DropdownSettingJob({ jobId, jobCode, status }: Props) {
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
              View test exams
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' asChild>
            <Link to={`/jobs/${jobCode}/add-test-exams`} className='flex items-center gap-x-2'>
              <img alt='edit' src='/icons/side-bar/exam-active.svg' className='size-4 invert dark:invert-0' />
              Add test exams
            </Link>
          </DropdownMenuItem>
          {!status.includes('Open') ? (
            <DialogTrigger asChild>
              <DropdownMenuItem className='cursor-pointer' asChild>
                <div className='flex cursor-pointer items-center gap-x-2 rounded-sm px-2 py-[6px] text-sm leading-5 hover:bg-muted'>
                  <img
                    alt='edit'
                    src='/icons/side-bar/recruitment-active.svg'
                    className='size-4 invert dark:invert-0'
                  />
                  Open this job
                </div>
              </DropdownMenuItem>
            </DialogTrigger>
          ) : (
            <DropdownMenuItem className='cursor-pointer' asChild>
              <div onClick={handleCloseJob} className='flex items-center gap-x-2'>
                <img alt='edit' src='/icons/side-bar/recruitment-active.svg' className='size-4 invert dark:invert-0' />
                Close this job
              </div>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {!status.includes('Open') && <DialogContentOpenJob jobCode={jobCode} />}
    </Dialog>
  )
}

export default DropdownSettingJob
