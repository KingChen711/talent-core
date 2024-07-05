import { Link } from '@tanstack/react-router'

import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

type Props = {
  recruitmentDriveId: string
  recruitmentDriveCode: string
  showAddJobs: boolean
  showUpdate: boolean
}

function DropdownSettingRecruitmentDrive({ recruitmentDriveId, recruitmentDriveCode, showAddJobs, showUpdate }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <img alt='settings' src='/icons/actions/settings.svg' className='size-6 select-none object-cover' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='border-2'>
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Link to={`/recruitment-drives/${recruitmentDriveCode}/detail`} className='flex items-center gap-x-2'>
            <img alt='edit' src='/icons/actions/view.svg' className='size-4 invert dark:invert-0' />
            View detail
          </Link>
        </DropdownMenuItem>
        {showUpdate && (
          <DropdownMenuItem className='cursor-pointer' asChild>
            <Link to={`/recruitment-drives/${recruitmentDriveId}/edit`} className='flex items-center gap-x-2'>
              <img alt='edit' src='/icons/actions/edit.svg' className='size-4 invert dark:invert-0' />
              Update
            </Link>
          </DropdownMenuItem>
        )}
        {showAddJobs && (
          <DropdownMenuItem className='cursor-pointer' asChild>
            <Link to={`/recruitment-drives/${recruitmentDriveCode}/add-jobs`} className='flex items-center gap-x-2'>
              <img alt='edit' src='/icons/side-bar/suitcase-active.svg' className='size-4 invert dark:invert-0' />
              Add jobs
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownSettingRecruitmentDrive
