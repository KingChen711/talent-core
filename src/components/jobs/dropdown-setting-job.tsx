import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Link } from '@tanstack/react-router'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Dialog } from '../ui/dialog'
import DialogContentOpenJob from './dialog-content-open-job'

type Props = {
  jobId: string
}

function DropdownSettingJob({ jobId }: Props) {
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
              <img alt='edit' src='/icons/actions/edit.svg' className='size-4' />
              Update
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' asChild>
            <Link to={`/jobs/${jobId}/add-test-exams`} className='flex items-center gap-x-2'>
              <img alt='edit' src='/icons/side-bar/exam-active.svg' className='size-4' />
              Add Test Exam
            </Link>
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem className='cursor-pointer' asChild>
              <div className='flex cursor-pointer items-center gap-x-2 rounded-sm px-2 py-[6px] text-sm leading-5 hover:bg-muted'>
                <img alt='edit' src='/icons/recruitment.svg' className='size-4' />
                Open This Job
              </div>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContentOpenJob jobId={jobId} />
    </Dialog>
  )
}

export default DropdownSettingJob
