import { Link } from '@tanstack/react-router'

import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

type Props = {
  testExamId: string
  testExamCode: string
}

function DropdownSettingTestExam({ testExamId, testExamCode }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <img alt='settings' src='/icons/actions/settings.svg' className='size-6 select-none object-cover' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='border-2'>
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Link to={`/test-exams/${testExamId}/edit`} className='flex items-center gap-x-2'>
            <img alt='edit' src='/icons/actions/edit.svg' className='size-4 invert dark:invert-0' />
            Update
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Link to={`/test-exams/${testExamCode}/jobs`} className='flex items-center gap-x-2'>
            <img alt='edit' src='/icons/side-bar/suitcase-active.svg' className='size-4 invert dark:invert-0' />
            View jobs
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Link to={`/test-exams/${testExamCode}/add-jobs`} className='flex items-center gap-x-2'>
            <img alt='edit' src='/icons/side-bar/suitcase-active.svg' className='size-4 invert dark:invert-0' />
            Add jobs
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Link to={`/test-exams/${testExamId}/test-sessions`} className='flex items-center gap-x-2'>
            <img alt='edit' src='/icons/actions/view.svg' className='size-4 invert dark:invert-0' />
            View candidate results
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownSettingTestExam
