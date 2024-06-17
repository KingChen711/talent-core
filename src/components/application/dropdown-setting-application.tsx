import { ApplicationStatus } from '@prisma/client'
import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

// Screening => Testing, Saved
// Testing => Interviewing, Saved
// Interviewing => Approved, Saved
// Approved => Reject
// Saved,Reject => Cannot change

type Props = {
  applicationId: string
  // applicationCode: string
  status: ApplicationStatus
}

function DropdownSettingApplication({ status, applicationId }: Props) {
  console.log(status)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <img alt='settings' src='/icons/actions/settings.svg' className='size-6 select-none object-cover' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='border-2'>
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Link to={`/applications/${applicationId}`} className='flex items-center gap-x-2'>
            <img alt='edit' src='/icons/side-bar/exam-active.svg' className='size-4 invert dark:invert-0' />
            View Detail
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownSettingApplication
